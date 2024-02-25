/*
  Warnings:

  - You are about to drop the column `date` on the `certificate` table. All the data in the column will be lost.
  - You are about to drop the column `school` on the `certificate` table. All the data in the column will be lost.
  - Added the required column `college` to the `Certificate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Certificate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enddate` to the `Certificate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rank` to the `Certificate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startdate` to the `Certificate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `certificate` DROP COLUMN `date`,
    DROP COLUMN `school`,
    ADD COLUMN `college` VARCHAR(191) NOT NULL,
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `enddate` DATETIME(3) NOT NULL,
    ADD COLUMN `rank` INTEGER NOT NULL,
    ADD COLUMN `startdate` DATETIME(3) NOT NULL;
