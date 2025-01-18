-- CreateEnum
CREATE TYPE "Faculty" AS ENUM ('AOK', 'FOK', 'GYTK', 'ETK', 'EKK', 'PAK');

-- CreateEnum
CREATE TYPE "Letter" AS ENUM ('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'EKK', 'K', 'L', 'M', 'N', 'R', 'S', 'T', 'U', 'FOK1', 'FOK2', 'GYOK1', 'GYOK2', 'GYOK3', 'PAK', 'International');

-- CreateEnum
CREATE TYPE "LanguageCertificateLevel" AS ENUM ('A1', 'A2', 'B1', 'B2', 'C1', 'C2');

-- CreateTable
CREATE TABLE "Application" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "nickname" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "zipCode" INTEGER NOT NULL,
    "city" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "idNumber" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "birthPlace" TEXT NOT NULL,
    "motherName" TEXT NOT NULL,
    "university" TEXT NOT NULL,
    "faculty" "Faculty",
    "startYear" INTEGER NOT NULL,
    "academicYear" INTEGER NOT NULL,
    "letter" "Letter",
    "drivingLicence" BOOLEAN NOT NULL,
    "likesDriving" BOOLEAN NOT NULL,
    "languages" TEXT[],
    "availableAtWeekend1" BOOLEAN NOT NULL,
    "availableAtWeekend2" BOOLEAN NOT NULL,
    "diet" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InternationalTraining" (
    "id" SERIAL NOT NULL,
    "motivation" TEXT NOT NULL,
    "applicationId" INTEGER NOT NULL,

    CONSTRAINT "InternationalTraining_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LanguageCertificate" (
    "id" SERIAL NOT NULL,
    "language" TEXT NOT NULL,
    "level" "LanguageCertificateLevel" NOT NULL,
    "internationalTrainingId" INTEGER NOT NULL,

    CONSTRAINT "LanguageCertificate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Application_email_key" ON "Application"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Application_phone_key" ON "Application"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "InternationalTraining_applicationId_key" ON "InternationalTraining"("applicationId");

-- AddForeignKey
ALTER TABLE "InternationalTraining" ADD CONSTRAINT "InternationalTraining_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LanguageCertificate" ADD CONSTRAINT "LanguageCertificate_internationalTrainingId_fkey" FOREIGN KEY ("internationalTrainingId") REFERENCES "InternationalTraining"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
