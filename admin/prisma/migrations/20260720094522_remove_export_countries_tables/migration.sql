/*
  Warnings:

  - You are about to drop the `machineryexportcountry` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `machineryexportcountry` DROP FOREIGN KEY `MachineryExportCountry_exportCountryId_fkey`;

-- DropForeignKey
ALTER TABLE `machineryexportcountry` DROP FOREIGN KEY `MachineryExportCountry_machineryId_fkey`;

-- DropTable
DROP TABLE `machineryexportcountry`;
