-- AlterTable
ALTER TABLE `transaccion` MODIFY `tipo` VARCHAR(191) NOT NULL DEFAULT 'Pago',
    MODIFY `estado` VARCHAR(191) NOT NULL DEFAULT 'Pendiente';
