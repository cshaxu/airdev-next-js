/* "@airdev/next": "managed" */

import { CommonFunctionConfig } from '@/airdev/common/types/config';
import { logError, normalizeError } from '@/common/utils/logging';

export const commonFunctionConfig: CommonFunctionConfig = {
  logError,
  normalizeError,
};
