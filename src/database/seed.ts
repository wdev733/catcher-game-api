import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
// eslint-disable-next-line @typescript-eslint/no-empty-function
async function main(): Promise<void> {}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
