/*
  Warnings:

  - Added the required column `sector` to the `Machinery` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `machinery` ADD COLUMN `sector` VARCHAR(191) NOT NULL;
