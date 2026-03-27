/* "@airdev/next": "managed" */

import {
  PackageNextauthAccount,
  PackageNextauthVerificationToken,
  PackageSystemRequestCache,
  PackageUser,
} from '@/airdev/backend/types/data';
import { BackendFunctionConfig } from '@/airdev/common/types/config';
import { Context } from '@/airdev/framework/context';
import { NextauthAccountEntity } from '@/backend/entities/nextauth-account';
import { SystemRequestCacheEntity } from '@/backend/entities/system-request-cache';
import { adapter } from '@/backend/lib/nextauth';
import NextauthAccountService from '@/backend/services/data/nextauth-account';
import NextauthVerificationTokenService from '@/backend/services/data/nextauth-verification-token';
import SystemRequestCacheService from '@/backend/services/data/system-request-cache';
import UserService from '@/backend/services/data/user';
import { pick } from 'lodash-es';
import { Account } from 'next-auth';

// type adapters

const buildPackageNextauthAccountFromEntitySafe = (
  one: NextauthAccountEntity | null
): PackageNextauthAccount | null =>
  one === null
    ? null
    : pick(one, [
        'id',
        'userId',
        'type',
        'provider',
        'providerAccountId',
        'refresh_token',
        'access_token',
        'expires_at',
        'token_type',
        'scope',
        'id_token',
        'session_state',
      ]);

const buildPackageSystemRequestCacheFromEntitySafe = (
  one: SystemRequestCacheEntity | null
): PackageSystemRequestCache | null =>
  one === null
    ? null
    : pick(one, ['id', 'createdAt', 'completedAt', 'request', 'response']);

const buildPackageUserFromEntitySafe = (one: any): PackageUser | null =>
  one === null
    ? null
    : {
        ...pick(one, [
          'id',
          'name',
          'email',
          'emailVerified',
          'imageUrl',
          'createdAt',
        ]),
        isAdmin: one.getIsAdmin(),
      };

const buildPackageNextauthVerificationTokenFromEntitySafe = (
  one: any
): PackageNextauthVerificationToken | null =>
  one === null ? null : pick(one, ['identifier', 'expires']);

// function adapters

const updateOneNextauthAccountSafe = (
  key: { provider: string; providerAccountId: string },
  data: Account,
  context: Context
): Promise<PackageNextauthAccount | null> =>
  NextauthAccountService.updateOneSafe(key, data, context).then(
    buildPackageNextauthAccountFromEntitySafe
  );

const deleteOneNextauthVerificationTokenSafe = (
  key: { email: string; code: string },
  context: Context
): Promise<PackageNextauthVerificationToken | null> =>
  NextauthVerificationTokenService.deleteOneSafe(key, context).then(
    buildPackageNextauthVerificationTokenFromEntitySafe
  );

const getOneSystemRequestCache = (
  body: any,
  context: Context
): Promise<PackageSystemRequestCache> =>
  SystemRequestCacheService.getOne(body, context)
    .then(buildPackageSystemRequestCacheFromEntitySafe)
    .then((one) => one!);

const createOneSystemRequestCacheSafe = (
  body: any,
  context: Context
): Promise<PackageSystemRequestCache | null> =>
  SystemRequestCacheService.createOneSafe(body, context).then(
    buildPackageSystemRequestCacheFromEntitySafe
  );

const updateOneSystemRequestCacheSafe = (
  id: string,
  response: any,
  context: Context
): Promise<PackageSystemRequestCache | null> =>
  SystemRequestCacheService.updateOneSafe(id, response, context).then(
    buildPackageSystemRequestCacheFromEntitySafe
  );

const getOneUserSafe = (
  id: string,
  context: Context
): Promise<PackageUser | null> =>
  UserService.getOneSafe({ id }, context).then(buildPackageUserFromEntitySafe);

const getOneUserByEmailSafe = (
  email: string,
  context: Context
): Promise<PackageUser | null> =>
  UserService.getOneByEmailSafe(email, context).then(
    buildPackageUserFromEntitySafe
  );

const getOrCreateOneUser = (
  email: string,
  context: Context
): Promise<PackageUser> =>
  UserService.getOrCreateOne(email, context)
    .then(buildPackageUserFromEntitySafe)
    .then((one) => one!);

const updateOneUser = (
  id: string,
  data: Record<string, any>,
  context: Context
): Promise<PackageUser> =>
  UserService.updateOneInternal(id, data, context)
    .then(buildPackageUserFromEntitySafe)
    .then((one) => one!);

export const backendFunctionConfig: BackendFunctionConfig = {
  auth: { adapter },
  nextauthAccount: {
    updateOneSafe: updateOneNextauthAccountSafe,
  },
  nextauthVerificationToken: {
    deleteOneSafe: deleteOneNextauthVerificationTokenSafe,
  },
  systemRequestCache: {
    getOne: getOneSystemRequestCache,
    createOneSafe: createOneSystemRequestCacheSafe,
    updateOneSafe: updateOneSystemRequestCacheSafe,
  },
  user: {
    getOneSafe: getOneUserSafe,
    getOneByEmailSafe: getOneUserByEmailSafe,
    getOrCreateOne: getOrCreateOneUser,
    updateOne: updateOneUser,
  },
};
