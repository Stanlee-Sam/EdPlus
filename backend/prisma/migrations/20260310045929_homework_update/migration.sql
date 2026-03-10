-- AlterTable
ALTER TABLE "Homework" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "status" "HomeworkStatus" NOT NULL DEFAULT 'incomplete';
