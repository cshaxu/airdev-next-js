import { defineConfig } from 'prisma/config';
import { privateConfig } from './src/config/private';

export default defineConfig({
  schema: './prisma/schema.prisma',
  migrations: {
    path: './prisma/migrations',
    seed: 'ts-node --compiler-options {"module":"CommonJS"} prisma/seed.ts',
  },
  datasource: { url: privateConfig.database.url },
});
