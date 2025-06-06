import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');
  await prisma.allocation.deleteMany();
  await prisma.asset.deleteMany();

  await prisma.asset.create({ data: { name: 'Ação Direta', currentValue: 150.75 } });
  await prisma.asset.create({ data: { name: 'Fundo Brasil', currentValue: 1200.00 } });
  await prisma.asset.create({ data: { name: 'Tesouro Direto', currentValue: 99.50 } });
  await prisma.asset.create({ data: { name: 'CriptoMoeda BTC', currentValue: 350000.00 } });
  await prisma.asset.create({ data: { name: 'Vale Ações', currentValue: 250.20 } });
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });