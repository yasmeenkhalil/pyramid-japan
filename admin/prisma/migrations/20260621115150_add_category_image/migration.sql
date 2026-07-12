/*
  Warnings:

  - You are about to drop the column `image` on the `Category` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "image",
ADD COLUMN     "imageUrl" TEXT;

-- CreateTable
CREATE TABLE "MachineryImage" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "machineryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MachineryImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MachineryImage" ADD CONSTRAINT "MachineryImage_machineryId_fkey" FOREIGN KEY ("machineryId") REFERENCES "Machinery"("id") ON DELETE CASCADE ON UPDATE CASCADE;
