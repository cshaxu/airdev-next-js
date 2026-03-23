import { NextauthAccountEntity } from '@/backend/entities/nextauth-account';
import { NextauthSessionEntity } from '@/backend/entities/nextauth-session';
import { SystemRequestCacheEntity } from '@/backend/entities/system-request-cache';
import { UserEntity } from '@/backend/entities/user';
import NextauthVerificationTokenService from '@/backend/services/data/nextauth-verification-token';
import SystemRequestCacheService from '@/backend/services/data/system-request-cache';
import UserService from '@/backend/services/data/user';
import { purify } from '@airent/api';
import type { DatabaseAdapter } from './types';

const defaultDatabaseAdapter: DatabaseAdapter = {
  getOneUserSafe: (params, context) => UserService.getOneSafe(params, context),
  createOneUser: async (body, context) => {
    const user = await UserService.findOrCreateOne(body.email, context);
    const updates = purify({
      ...(body.name !== undefined && { name: body.name }),
      ...(body.emailVerified !== undefined && {
        emailVerified: body.emailVerified,
      }),
      ...(body.imageUrl !== undefined && { imageUrl: body.imageUrl }),
      ...(body.isAdmin !== undefined && { isAdmin: body.isAdmin }),
      updatedAt: context.time,
    });
    if (Object.keys(updates).length > 1) {
      user.fromModel(updates);
      await user.save();
    }
    return user;
  },
  updateOneUser: async (one, body, context) => {
    const user = await UserEntity.findUnique({ where: { id: one.id } }, context);
    if (user === null) {
      throw new Error(`User not found: ${one.id}`);
    }
    user.fromModel(
      purify({
        ...(body.email !== undefined && { email: body.email }),
        ...(body.emailVerified !== undefined && {
          emailVerified: body.emailVerified,
        }),
        ...(body.imageUrl !== undefined && { imageUrl: body.imageUrl }),
        ...(body.isAdmin !== undefined && { isAdmin: body.isAdmin }),
        ...(body.name !== undefined && { name: body.name }),
        updatedAt: context.time,
      })
    );
    return await user.save();
  },
  getOneNextauthAccountSafe: (params, context) =>
    NextauthAccountEntity.findUnique(
      {
        where: {
          provider: params.provider,
          providerAccountId: params.providerAccountId,
        },
      },
      context
    ) as Promise<any>,
  updateOneNextauthAccount: async (one, body, context) => {
    const account = await NextauthAccountEntity.findUnique(
      { where: { id: one.id } },
      context
    );
    if (account === null) {
      throw new Error(`Nextauth account not found: ${one.id}`);
    }
    account.fromModel(body);
    return (await account.save()) as any;
  },
  createOneNextauthSession: async (body, context) =>
    NextauthSessionEntity.create(
      { data: { id: crypto.randomUUID(), ...body } },
      context
    ) as Promise<any>,
  deleteOneNextauthVerificationTokenSafe: (params, context) =>
    NextauthVerificationTokenService.deleteOneSafe(params, context) as Promise<any>,
  getOneRequestCache: (body, context) =>
    SystemRequestCacheService.getOne(body, context) as Promise<any>,
  createOneRequestCacheSafe: (body, context) =>
    SystemRequestCacheService.createOneSafe(body, context) as Promise<any>,
  updateOneRequestCacheSafe: async (requestCache, response, context) => {
    const one = await SystemRequestCacheEntity.findUnique(
      { where: { id: requestCache.id } },
      context
    );
    if (one === null) {
      return;
    }
    await SystemRequestCacheService.updateOneSafe(one, response, context);
  },
};

export let databaseAdapter: DatabaseAdapter = defaultDatabaseAdapter;

export function setDatabaseAdapter(adapter: DatabaseAdapter): void {
  databaseAdapter = adapter;
}
