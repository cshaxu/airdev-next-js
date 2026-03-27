import { NextauthSessionEntity } from '@/backend/entities/nextauth-session';
import { Context } from '@airdev/next/framework/context';

const deleteManyByUser = (userId: string, _context: Context) =>
  NextauthSessionEntity.deleteMany({ where: { userId } }).then((r) => r.count);

const NextauthSessionService = { deleteManyByUser };

export default NextauthSessionService;
