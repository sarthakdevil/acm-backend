-- CreateTable
CREATE TABLE `User` (
    `Sno` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('USER', 'ADMIN') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_password_key`(`password`),
    PRIMARY KEY (`Sno`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `blog` (
    `Sno` INTEGER NOT NULL AUTO_INCREMENT,
    `Title` VARCHAR(200) NOT NULL,
    `Author` VARCHAR(50) NOT NULL,
    `Content` VARCHAR(191) NOT NULL,
    `Category` VARCHAR(50) NOT NULL,
    `Event` VARCHAR(100) NOT NULL,
    `Image` VARCHAR(191) NOT NULL,
    `Date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`Sno`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
