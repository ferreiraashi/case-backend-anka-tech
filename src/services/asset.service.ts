import { prisma } from '../lib/prismaClient';

export const findAssets = async () => {
  const assetsFromDb = await prisma.asset.findMany();

  const assets = assetsFromDb.map(asset => ({
    ...asset,
    currentValue: asset.currentValue.toNumber(),
  }));

  return assets;
};