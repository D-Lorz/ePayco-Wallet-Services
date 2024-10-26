-- AlterTable
ALTER TABLE `sesiontransaccion` ADD COLUMN `transaccionId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `SesionTransaccion` ADD CONSTRAINT `SesionTransaccion_transaccionId_fkey` FOREIGN KEY (`transaccionId`) REFERENCES `Transaccion`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaccion` ADD CONSTRAINT `Transaccion_documento_fkey` FOREIGN KEY (`documento`) REFERENCES `Usuario`(`documento`) ON DELETE RESTRICT ON UPDATE CASCADE;
