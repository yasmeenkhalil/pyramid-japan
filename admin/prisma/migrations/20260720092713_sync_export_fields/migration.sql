/*
  Warnings:

  - A unique constraint covering the columns `[countryCode]` on the table `ExportCountry` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `exportcountry` ADD COLUMN `countryCode` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `ExportCountry_countryCode_key` ON `ExportCountry`(`countryCode`);
