import prisma from '../src/backend/lib/prisma';
import { APP_EMAIL, APP_NAME } from '../src/common/config';

// For instructions, see
// https://www.prisma.io/docs/guides/migrate/seed-database#how-to-seed-your-database-in-prisma
async function main() {
  const systemUser = await prisma.user.upsert({
    where: { id: 'system' },
    create: {
      id: 'system',
      name: APP_NAME,
      email: APP_EMAIL,
    },
    update: { email: APP_EMAIL },
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
