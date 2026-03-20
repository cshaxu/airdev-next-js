import { NextauthSessionEntity } from '@/backend/entities/nextauth-session';
import { Context } from '@/framework/context';

const deleteManyByUser = (userId: string, _rc: Context) =>
  NextauthSessionEntity.deleteMany({ where: { userId } }).then((r) => r.count);

const NextauthSessionService = { deleteManyByUser };

export default NextauthSessionService;
