/*
  Warnings:

  - You are about to drop the column `name` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Machinery` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Machinery` table. All the data in the column will be lost.
  - Added the required column `nameAr` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameEn` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameJa` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titleAr` to the `Machinery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titleEn` to the `Machinery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titleJa` to the `Machinery` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "name",
ADD COLUMN     "nameAr" TEXT NOT NULL,
ADD COLUMN     "nameEn" TEXT NOT NULL,
ADD COLUMN     "nameJa" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Machinery" DROP COLUMN "description",
DROP COLUMN "title",
ADD COLUMN     "descriptionAr" TEXT,
ADD COLUMN     "descriptionEn" TEXT,
ADD COLUMN     "descriptionJa" TEXT,
ADD COLUMN     "titleAr" TEXT NOT NULL,
ADD COLUMN     "titleEn" TEXT NOT NULL,
ADD COLUMN     "titleJa" TEXT NOT NULL;
