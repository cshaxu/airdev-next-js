import { defineConfig } from 'prisma/config';
import { privateAppConfig } from './src/config/private-app';

export default defineConfig({
  schema: './prisma/schema.prisma',
  migrations: {
    path: './prisma/migrations',
    seed: 'ts-node --compiler-options {"module":"CommonJS"} prisma/seed.ts',
  },
  datasource: { url: privateAppConfig.database.url },
});
