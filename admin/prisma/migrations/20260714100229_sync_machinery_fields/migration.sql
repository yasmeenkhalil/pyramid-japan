/*
  Warnings:

  - Added the required column `location` to the `Machinery` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `machinery` ADD COLUMN `avgPrice` DOUBLE NULL,
    ADD COLUMN `location` VARCHAR(191) NOT NULL,
    ADD COLUMN `maxPrice` DOUBLE NULL,
    ADD COLUMN `minPrice` DOUBLE NULL;
