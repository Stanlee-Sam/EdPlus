/*
  Warnings:

  - A unique constraint covering the columns `[teacherId,classId,subjectId]` on the table `TeacherClassSubject` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `method` on the `Payment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CASH', 'MPESA', 'BANK');

-- AlterTable
ALTER TABLE "Notification" ALTER COLUMN "isRead" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "method",
ADD COLUMN     "method" "PaymentMethod" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "TeacherClassSubject_teacherId_classId_subjectId_key" ON "TeacherClassSubject"("teacherId", "classId", "subjectId");
