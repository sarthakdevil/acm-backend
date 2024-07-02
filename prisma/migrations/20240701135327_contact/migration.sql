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
    `Isverified` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`Sno`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Certificate` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uniqueid` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `college` VARCHAR(191) NOT NULL,
    `startdate` DATETIME(3) NOT NULL,
    `enddate` DATETIME(3) NOT NULL,
    `position` INTEGER NOT NULL,
    `course` VARCHAR(191) NOT NULL,
    `enrollment` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Certificate_uniqueid_key`(`uniqueid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Member` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `image` VARCHAR(191) NULL,
    `Name` VARCHAR(191) NOT NULL,
    `linkedin` VARCHAR(191) NULL,
    `github` VARCHAR(191) NULL,
    `Instagram` VARCHAR(191) NULL,
    `year` VARCHAR(191) NOT NULL,
    `designation` VARCHAR(191) NOT NULL,
    `added_on` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Contact` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Contact_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Office_bearer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `designation` VARCHAR(191) NOT NULL,
    `linkedin` VARCHAR(191) NULL,
    `category` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VisitorCount` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `count` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Announcement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `image` VARCHAR(191) NULL,
    `link` VARCHAR(100) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
