import { defineConfig } from 'prisma/config';
import { DATABASE_URL } from './src/backend/config';

export default defineConfig({
  schema: './prisma/schema.prisma',
  migrations: {
    path: './prisma/migrations',
    seed: 'ts-node --compiler-options {"module":"CommonJS"} prisma/seed.ts',
  },
  datasource: { url: DATABASE_URL },
});
