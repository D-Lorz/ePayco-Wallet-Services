/*
  Warnings:

  - Added the required column `referencia` to the `SesionTransaccion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `sesiontransaccion` ADD COLUMN `referencia` VARCHAR(191) NOT NULL;
