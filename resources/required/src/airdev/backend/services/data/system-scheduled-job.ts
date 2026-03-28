/* "@airdev/next": "managed" */

import { logError, normalizeError } from '@/airdev/common/utils/logging';
import { Context } from '@/airdev/framework/context';
import { SystemScheduledJobEntity } from '@/backend/entities/system-scheduled-job';
import {
  SystemScheduledJobExecution,
  SystemScheduledJobResult,
  SystemScheduledJobStatus,
} from '@/common/types/data/system-scheduled-job';
import { SCHEDULED_JOB_EXECUTOR_MAP } from '@/generated/scheduler';
import { buildInvalidErrorMessage, logInfo } from '@airent/api';
import { Prisma } from '@prisma/client';
import createHttpError from 'http-errors';

async function createOne(
  type: string,
  data: any,
  runsAt: Date,
  context: Context
): Promise<SystemScheduledJobEntity> {
  const pickedOne = await pickOne(type, data, runsAt, context);
  if (pickedOne !== null) {
    return pickedOne;
  }
  return await SystemScheduledJobEntity.create(
    { data: { type, data, runsAt } },
    context
  );
}

async function executeOne(
  one: SystemScheduledJobEntity,
  context: Context
): Promise<SystemScheduledJobEntity> {
  const { type, data } = one;
  const startsAt = new Date();
  if (one.runsAt.getTime() > startsAt.getTime() || one.completedAt !== null) {
    return one;
  }

  const pickedOne = await pickOne(one.type, one.data, one.runsAt, context);
  const response =
    pickedOne === null || one.id === pickedOne.id
      ? await executeOneInternal(type, data, context)
      : {
          status: SystemScheduledJobStatus.SKIPPED,
          peerId: pickedOne.id,
          result: `job skipped - see SystemScheduledJob.peerId`,
        };

  if (response.status === SystemScheduledJobStatus.PURGED) {
    return await one.delete();
  }

  const endsAt = new Date();
  const execution: SystemScheduledJobExecution = {
    startsAt,
    endsAt,
    ...response,
  };
  const executions = [...one.executions, execution];
  const prismaData: Prisma.SystemScheduledJobUncheckedUpdateInput = {
    ...([
      SystemScheduledJobStatus.COMPLETED,
      SystemScheduledJobStatus.SKIPPED,
    ].includes(execution.status) && { completedAt: endsAt }),
    ...(execution.status === SystemScheduledJobStatus.RESCHEDULED && {
      runsAt: execution.nextRunsAt ?? endsAt,
    }),
    executions,
  };
  one.fromModel(prismaData as any);
  return await one.save();
}

async function rescheduleOne(
  one: SystemScheduledJobEntity,
  runsAt: Date,
  _context: Context
): Promise<SystemScheduledJobEntity> {
  if (one.completedAt === null) {
    one.runsAt = runsAt;
    return await one.save();
  } else {
    throw createHttpError.UnprocessableEntity('job already completed');
  }
}

async function pickOne(
  type: string,
  data: any,
  runsAt: Date,
  context: Context
): Promise<SystemScheduledJobEntity | null> {
  const dataString = JSON.stringify(data);
  const many = await SystemScheduledJobEntity.findMany(
    { where: { type, runsAt, completedAt: null } },
    context
  );
  const pickedOne = many
    .filter((o) => JSON.stringify(o.data) === dataString)
    .sort((a, b) => a.id.localeCompare(b.id))
    .at(0);
  return pickedOne ?? null;
}

async function executeOneInternal(
  type: string,
  data: any,
  context: Context
): Promise<SystemScheduledJobResult> {
  try {
    logInfo({ type, data });
    const executor = SCHEDULED_JOB_EXECUTOR_MAP.get(type);
    if (executor === undefined) {
      throw createHttpError.UnprocessableEntity(
        buildInvalidErrorMessage(
          'type',
          Array.from(SCHEDULED_JOB_EXECUTOR_MAP.keys()).join(','),
          type
        )
      );
    }
    return await executor(data, context);
  } catch (error) {
    logError(error, { type, data });
    const result = { ...normalizeError(error), original: undefined };
    return { status: SystemScheduledJobStatus.FAILED, result };
  }
}

const SystemScheduledJobService = { createOne, executeOne, rescheduleOne };

export default SystemScheduledJobService;
