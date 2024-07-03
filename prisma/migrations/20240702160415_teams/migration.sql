-- CreateTable
CREATE TABLE `TeamUpdate` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `photoUrl` VARCHAR(191) NOT NULL,
    `position` VARCHAR(191) NOT NULL,
    `socialLink` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OfficeBearer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `photoUrl` VARCHAR(191) NOT NULL,
    `position` VARCHAR(191) NOT NULL,
    `socialLink` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
