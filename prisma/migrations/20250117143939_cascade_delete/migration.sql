-- DropForeignKey
ALTER TABLE "InternationalTraining" DROP CONSTRAINT "InternationalTraining_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "LanguageCertificate" DROP CONSTRAINT "LanguageCertificate_internationalTrainingId_fkey";

-- AddForeignKey
ALTER TABLE "InternationalTraining" ADD CONSTRAINT "InternationalTraining_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LanguageCertificate" ADD CONSTRAINT "LanguageCertificate_internationalTrainingId_fkey" FOREIGN KEY ("internationalTrainingId") REFERENCES "InternationalTraining"("id") ON DELETE CASCADE ON UPDATE CASCADE;
