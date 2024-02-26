-- CreateTable
CREATE TABLE `Certificate` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uniqueid` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `school` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `course` VARCHAR(191) NOT NULL,
    `enrollment` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Certificate_uniqueid_key`(`uniqueid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
