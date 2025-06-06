-- DropForeignKey
ALTER TABLE `Allocation` DROP FOREIGN KEY `Allocation_clientId_fkey`;

-- DropIndex
DROP INDEX `Allocation_clientId_fkey` ON `Allocation`;

-- AddForeignKey
ALTER TABLE `Allocation` ADD CONSTRAINT `Allocation_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
