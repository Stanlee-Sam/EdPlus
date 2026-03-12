-- Drop old FK and unique index
ALTER TABLE "Result" DROP CONSTRAINT IF EXISTS "Result_teachersClassSubjectId_fkey";
DROP INDEX IF EXISTS "Result_studentId_termId_teachersClassSubjectId_key";

-- Rename column
ALTER TABLE "Result" RENAME COLUMN "teachersClassSubjectId" TO "teacherClassSubjectId";

-- Add new FK and unique index
ALTER TABLE "Result" ADD CONSTRAINT "Result_teacherClassSubjectId_fkey"
FOREIGN KEY ("teacherClassSubjectId") REFERENCES "TeacherClassSubject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

CREATE UNIQUE INDEX "Result_studentId_termId_teacherClassSubjectId_key"
ON "Result"("studentId", "termId", "teacherClassSubjectId");
