-- CreateTable
CREATE TABLE `SesionTransaccion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idSesion` VARCHAR(191) NOT NULL,
    `documento` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `monto` DOUBLE NOT NULL,
    `creadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `expiraEn` DATETIME(3) NOT NULL,

    UNIQUE INDEX `SesionTransaccion_idSesion_key`(`idSesion`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transaccion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `documento` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `monto` DOUBLE NOT NULL,
    `estado` VARCHAR(191) NOT NULL,
    `creadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
