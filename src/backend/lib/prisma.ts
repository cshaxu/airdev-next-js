import { DATABASE_URL } from '@/backend/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import createHttpError from 'http-errors';

declare global {
  var prisma: PrismaClient | undefined;
}

const connectionString = DATABASE_URL;

if (!connectionString) {
  throw createHttpError.InternalServerError('Missing DATABASE_URL');
}

const adapter = new PrismaPg({ connectionString });
const prisma = global.prisma || new PrismaClient({ adapter });

// if (IS_SERVICE_LOCAL) {
global.prisma = prisma;
// }

export default prisma;
