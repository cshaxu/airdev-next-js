/* "@airdev/next": "managed" */

import { batchExecuteByPageParam } from '@/airdev/backend/utils/data';
import { Context } from '@/airdev/framework/context';
import { SystemScheduledJobEntity } from '@/backend/entities/system-scheduled-job';
import SystemScheduledJobService from '@/backend/services/data/system-scheduled-job';
import { CommonResponse } from '@airent/api';
import { Prisma } from '@prisma/client';

export const maxDuration = 60;

export const schedule = '0 0 * * *';

export async function executor(context: Context): Promise<CommonResponse> {
  const where = { runsAt: { lte: context.time }, completedAt: null };
  const loader = (pageParam: string | undefined, take: number) =>
    SystemScheduledJobEntity.findMany(
      {
        where: { ...where, ...(pageParam && { id: { gt: pageParam } }) },
        orderBy: { id: Prisma.SortOrder.asc },
        take,
      },
      context
    );
  const batchExecutor = async (many: SystemScheduledJobEntity[]) => {
    const promises = many.map((one) =>
      SystemScheduledJobService.executeOne(one, context)
    );
    return await Promise.all(promises);
  };
  const results = await batchExecuteByPageParam(
    loader,
    batchExecutor,
    (one) => one.id,
    100
  );
  const successCount = results.filter((one) => one.completedAt !== null).length;
  const failCount = results.filter((one) => one.completedAt === null).length;
  return { code: 200, result: { successCount, failCount } };
}
