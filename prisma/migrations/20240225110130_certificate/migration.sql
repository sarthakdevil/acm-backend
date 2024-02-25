/*
  Warnings:

  - You are about to drop the column `rank` on the `certificate` table. All the data in the column will be lost.
  - Added the required column `position` to the `Certificate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `certificate` DROP COLUMN `rank`,
    ADD COLUMN `position` INTEGER NOT NULL;
