/*
  Warnings:

  - You are about to drop the column `motherName` on the `Application` table. All the data in the column will be lost.
  - Added the required column `mothersName` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `university` on the `Application` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `diet` to the `Application` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "University" AS ENUM ('SE', 'BME', 'ELTE', 'PPKE', 'BCE', 'OTHER');

-- CreateEnum
CREATE TYPE "Diet" AS ENUM ('Normal', 'Vegetarian', 'Vegan', 'LactoseFree', 'GlutenFree', 'Other');

-- AlterTable
ALTER TABLE "Application" DROP COLUMN "motherName",
ADD COLUMN     "customDiet" TEXT,
ADD COLUMN     "mothersName" TEXT NOT NULL,
ADD COLUMN     "otherUniversity" TEXT,
DROP COLUMN "university",
ADD COLUMN     "university" "University" NOT NULL,
ALTER COLUMN "likesDriving" DROP NOT NULL,
DROP COLUMN "diet",
ADD COLUMN     "diet" "Diet" NOT NULL;
