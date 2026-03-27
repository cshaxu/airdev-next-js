/* "@airdev/next": "managed" */

import { Context } from '@/airdev/framework/context';
import { NextauthSessionEntity } from '@/backend/entities/nextauth-session';

const deleteManyByUser = (userId: string, _context: Context) =>
  NextauthSessionEntity.deleteMany({ where: { userId } }).then((r) => r.count);

const NextauthSessionService = { deleteManyByUser };

export default NextauthSessionService;
