import { DB_DELAY_SECONDS } from '@/backend/config';
import { mockContext } from '@/backend/lib/framework';
import { Context } from '@/framework/context';
import { logError, normalizeError } from '@/framework/logging';
import { CommonResponse, logInfo } from '@airent/api';
import { Inngest } from 'inngest';
import * as SlackSdk from './slack';

type InngestEvent = { name: string; data: any };

export const inngest = new Inngest({ id: 'memorix' });

export async function enqueue(type: string, data: any): Promise<boolean> {
  const event: InngestEvent = { name: type, data };
  try {
    logInfo({ type, data });
    await inngest.send(event);
    return true;
  } catch (error) {
    logError(error, { type, data });
    return false;
  }
}

type InngestOptions = { delaySeconds?: number; runAt?: Date };

async function onFailure(params: any): Promise<void> {
  const text = `[INNGEST] failed: ${JSON.stringify(params)}`;
  await SlackSdk.sendMessage(SlackSdk.SupportedChannel.DEV, text);
}

export const createFunction = (
  event: string,
  executor: (params: any, context: Context) => Promise<CommonResponse>,
  options: InngestOptions = { delaySeconds: DB_DELAY_SECONDS }
) =>
  inngest.createFunction(
    { id: `${event}-handler`, retries: 1, onFailure, triggers: [{ event }] },
    async ({ event, step }) => {
      const fn = async () => {
        try {
          const rc = await mockContext();
          return await executor(event.data, rc);
        } catch (error) {
          const normalizedError = normalizeError(error);
          logError(normalizedError, { event });
          return { code: normalizedError.status, error: normalizedError };
        }
      };
      if (options.runAt !== undefined) {
        await step.sleepUntil('wait-for-timestamp', options.runAt);
        await step.run('run-executor', fn);
      } else if (options.delaySeconds !== undefined) {
        await step.sleep('wait-for-delay', options.delaySeconds * 1000);
        await step.run('run-executor', fn);
      } else {
        await fn();
      }
    }
  );
