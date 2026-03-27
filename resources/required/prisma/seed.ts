/* "@airdev/next": "managed" */

import prisma from '../src/backend/lib/prisma';
import { publicConfig } from '../src/config/json/public';

// For instructions, see
// https://www.prisma.io/docs/guides/migrate/seed-database#how-to-seed-your-database-in-prisma
async function main() {
  const systemUser = await prisma.user.upsert({
    where: { id: 'system' },
    create: {
      id: 'system',
      name: publicConfig.app.name,
      email: publicConfig.app.email,
    },
    update: { email: publicConfig.app.email },
  });
  console.log({ systemUser });
}

main()
  .then(prisma.$disconnect)
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
