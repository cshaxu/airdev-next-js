import type { DatabaseAdapter, DatabaseUser } from '@airdev/next/adapter/backend/data';

const bootstrapUser: DatabaseUser = {
  id: 'user_1',
  email: 'account@example.com',
  emailVerified: null,
  imageUrl: null,
  isAdmin: true,
  name: 'Airdev User',
  createdAt: new Date(0),
  updatedAt: new Date(0),
};

export const bootstrapDatabaseAdapter: DatabaseAdapter = {
  async createOneUser(body, _context) {
    return {
      ...bootstrapUser,
      email: body.email,
      emailVerified: body.emailVerified ?? bootstrapUser.emailVerified,
      imageUrl: body.imageUrl ?? bootstrapUser.imageUrl,
      isAdmin: body.isAdmin ?? bootstrapUser.isAdmin,
      name: body.name ?? body.email,
    };
  },
  async getOneUserSafe(param, _context) {
    if (param.id === bootstrapUser.email) {
      return null;
    }
    return bootstrapUser;
  },
  async updateOneUser(one, body, _context) {
    return {
      ...one,
      email: body.email ?? one.email,
      emailVerified: body.emailVerified ?? one.emailVerified,
      imageUrl: body.imageUrl ?? one.imageUrl,
      isAdmin: body.isAdmin ?? one.isAdmin,
      name: body.name ?? one.name,
      updatedAt: new Date(0),
    };
  },
  async createOneNextauthSession(body, _context) {
    return { id: 'session_1', ...body };
  },
  async getOneNextauthAccountSafe(_params, _context) {
    return null;
  },
  async updateOneNextauthAccount(one, body, _context) {
    return { ...one, ...body };
  },
  async deleteOneNextauthVerificationTokenSafe(param, _context) {
    return { expires: new Date(0), identifier: param.email, token: param.code };
  },
  async getOneRequestCache(_body, _context) {
    return {
      id: 'request_cache_1',
      createdAt: new Date(0),
      completedAt: new Date(0),
      request: null,
      response: null,
    };
  },
  async createOneRequestCacheSafe(body, context) {
    return {
      id: 'request_cache_1',
      createdAt: context.time,
      completedAt: null,
      request: body,
      response: null,
    };
  },
  async updateOneRequestCacheSafe(_requestCache, _response, _context) {
    return;
  },
};
