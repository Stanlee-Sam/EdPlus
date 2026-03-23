import { z } from "zod";
import type { Request, Response } from "express";
import { PrismaPg } from "@prisma/adapter-pg";
import * as prismaPkg from "../generated/prisma/client.js";

const PrismaClient = (prismaPkg as any).PrismaClient ?? (prismaPkg as any).default?.PrismaClient;
const Grade = (prismaPkg as any).Grade ?? (prismaPkg as any).default?.Grade;
const Prisma =
  (prismaPkg as any).Prisma ?? (prismaPkg as any).default?.Prisma;
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

const prisma = new PrismaClient({ adapter });

const resultIdSchema = z.string().uuid();
const studentIdSchema = z.string().uuid();
const classIdSchema = z.string().uuid();
const termIdSchema = z.string().uuid();
const resultSchema = z.object({
  score: z.number().int(),
  grade: z.nativeEnum(Grade),
  subjectId: z.string().uuid(),
  studentId: z.string().uuid(),
  termId: z.string().uuid(),
  schoolId: z.string().uuid(),
  teacherClassSubjectId: z.string().uuid(),
});

const resultFilterSchema = z.object({
  subjectId: z.string().uuid().optional(),
  studentId: z.string().uuid().optional(),
  termId: z.string().uuid().optional(),
  schoolId: z.string().uuid().optional(),
  teacherClassSubjectId: z.string().uuid().optional(),
  classId: z.string().uuid().optional(),
});

export const createResult = async (
  req: Request<{}, {}, unknown>,
  res: Response,
) => {
  try {
    const parsed = resultSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    const {
      score,
      grade,
      subjectId,
      studentId,
      termId,
      schoolId,
      teacherClassSubjectId,
    } = parsed.data;

    const existingResult = await prisma.result.findFirst({
      where: {
        studentId,
        termId,
        teacherClassSubjectId,
        isDeleted: false,
      },
    });

    if (existingResult) {
      return res.status(409).json({
        message: "Result already exists",
      });
    }

    const existingStudent = await prisma.student.findFirst({
      where: { id: studentId, isDeleted: false },
    });

    if (!existingStudent) {
      return res.status(404).json({
        message: "Student does not exist",
      });
    }

    const existingTerm = await prisma.term.findFirst({
      where: { id: termId, isDeleted: false },
    });

    if (!existingTerm) {
      return res.status(404).json({
        message: "Term does not exist",
      });
    }

    const existingSchool = await prisma.school.findFirst({
      where: { id: schoolId, isDeleted: false },
    });

    if (!existingSchool) {
      return res.status(404).json({
        message: "School does not exist",
      });
    }

    const existingTCS = await prisma.teacherClassSubject.findFirst({
      where: { id: teacherClassSubjectId, isDeleted: false },
    });

    if (!existingTCS) {
      return res.status(404).json({
        message: "TCS does not exist",
      });
    }

    const existingSubject = await prisma.subject.findFirst({
      where: { id: subjectId, isDeleted: false },
    });

    if (!existingSubject) {
      return res.status(404).json({
        message: "Subject does not exist",
      });
    }

    const newResult = await prisma.result.create({
      data: {
        score,
        grade,
        subjectId,
        studentId,
        termId,
        schoolId,
        teacherClassSubjectId,
      },
    });

    res.status(201).json(newResult);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Uknown Error";
    console.error("Error creating result", message);
    res.status(500).json({ message });
  }
};

export const getResults = async (req: Request, res: Response) => {
  try {
    const parsed = resultFilterSchema.safeParse(req.query);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    const {
      subjectId,
      studentId,
      termId,
      schoolId,
      teacherClassSubjectId,
      classId,
    } = parsed.data;

    const where: any = { isDeleted: false };

    if (subjectId) where.subjectId = subjectId;
    if (studentId) where.studentId = studentId;
    if (termId) where.termId = termId;
    if (schoolId) where.schoolId = schoolId;
    if (teacherClassSubjectId)
      where.teacherClassSubjectId = teacherClassSubjectId;
    if (classId) {
      where.student = {
        classId,
        isDeleted: false,
      };
    }

    const results = await prisma.result.findMany({ where });

    res.status(200).json(results);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Uknown Error";
    console.error("Error fetching results", message);
    res.status(500).json({ message });
  }
};
export const getResult = async (
  req: Request<{ id: string }, {}, unknown>,
  res: Response,
) => {
  try {
    const resultIdParsed = resultIdSchema.safeParse(req.params.id);

    if (!resultIdParsed.success) {
      return res.status(400).json({ message: "Invalid result ID" });
    }

    const resultId = resultIdParsed.data;

    const result = await prisma.result.findFirst({
      where: {
        id: resultId,
        isDeleted: false,
      },
    });

    if (!result) {
      return res.status(404).json({ message: "Result not found" });
    }

    res.status(200).json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Uknown Error";
    console.error("Error fetching result", message);
    res.status(500).json({ message });
  }
};
export const getResultPerStudent = async (
  req: Request<{ id: string }, {}, unknown>,
  res: Response,
) => {
  try {
    const studentIdParsed = studentIdSchema.safeParse(req.params.id);

    if (!studentIdParsed.success) {
      return res.status(400).json({
        message: "Invalid student ID",
      });
    }
    const studentId = studentIdParsed.data;

    const existingStudent = await prisma.student.findFirst({
      where: {
        id: studentId,
        isDeleted: false,
      },
    });

    if (!existingStudent) {
      return res.status(404).json({ message: "Student does not exist" });
    }

    const studentResult = await prisma.result.findMany({
      where: {
        studentId,
        isDeleted: false,
      },
    });

    res.status(200).json(studentResult);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Uknown Error";
    console.error("Error fetching result", message);
    res.status(500).json({ message });
  }
};

export const getResultPerClass = async (
  req: Request<{ id: string }, {}, unknown>,
  res: Response,
) => {
  try {
    const classIdParsed = classIdSchema.safeParse(req.params.id);

    if (!classIdParsed.success) {
      return res.status(400).json({
        message: "Invalid class ID",
      });
    }
    const classId = classIdParsed.data;

    const existingClass = await prisma.class.findFirst({
      where: {
        id: classId,
        isDeleted: false,
      },
    });

    if (!existingClass) {
      return res.status(404).json({ message: "Class does not exist" });
    }

    const classResult = await prisma.result.findMany({
      where: {
        isDeleted: false,
        student: {
          classId: classId,
          isDeleted: false,
        },
      },
    });

    res.status(200).json(classResult);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Uknown Error";
    console.error("Error fetching result", message);
    res.status(500).json({ message });
  }
};
export const getResultPerTerm = async (
  req: Request<{ id: string }, {}, unknown>,
  res: Response,
) => {
  try {
    const termIdParsed = termIdSchema.safeParse(req.params.id);

    if (!termIdParsed.success) {
      return res.status(400).json({
        message: "Invalid term ID",
      });
    }
    const termId = termIdParsed.data;

    const existingTerm = await prisma.term.findFirst({
      where: {
        id: termId,
        isDeleted: false,
      },
    });

    if (!existingTerm) {
      return res.status(404).json({ message: "Term does not exist" });
    }

    const termResult = await prisma.result.findMany({
      where: {
        termId,
        isDeleted: false,
      },
    });

    res.status(200).json(termResult);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Uknown Error";
    console.error("Error fetching result", message);
    res.status(500).json({ message });
  }
};

export const updateResult = async (
  req: Request<{ id: string }, {}, unknown>,
  res: Response,
) => {
  try {
    const resultIdParsed = resultIdSchema.safeParse(req.params.id);
    const parsed = resultSchema.safeParse(req.body);

    if (!resultIdParsed.success) {
      return res.status(400).json({ message: "Invalid result ID" });
    }
    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    const resultId = resultIdParsed.data;
    const {
      score,
      grade,
      subjectId,
      studentId,
      termId,
      schoolId,
      teacherClassSubjectId,
    } = parsed.data;

    const existingResult = await prisma.result.findFirst({
      where: {
        id: resultId,
        isDeleted: false,
      },
    });

    if (!existingResult) {
      return res.status(404).json({
        message: "Result does not exist",
      });
    }

    const existingStudent = await prisma.student.findFirst({
      where: { id: studentId, isDeleted: false },
    });

    if (!existingStudent) {
      return res.status(404).json({
        message: "Student does not exist",
      });
    }

    const existingTerm = await prisma.term.findFirst({
      where: { id: termId, isDeleted: false },
    });

    if (!existingTerm) {
      return res.status(404).json({
        message: "Term does not exist",
      });
    }

    const existingSchool = await prisma.school.findFirst({
      where: { id: schoolId, isDeleted: false },
    });

    if (!existingSchool) {
      return res.status(404).json({
        message: "School does not exist",
      });
    }

    const existingTCS = await prisma.teacherClassSubject.findFirst({
      where: { id: teacherClassSubjectId, isDeleted: false },
    });

    if (!existingTCS) {
      return res.status(404).json({
        message: "TCS does not exist",
      });
    }

    const existingSubject = await prisma.subject.findFirst({
      where: { id: subjectId, isDeleted: false },
    });

    if (!existingSubject) {
      return res.status(404).json({
        message: "Subject does not exist",
      });
    }

    const updatedResult = await prisma.result.update({
      where: {
        id: resultId,
      },
      data: {
        score,
        grade,
        subjectId,
        studentId,
        termId,
        schoolId,
        teacherClassSubjectId,
      },
    });

    res.status(200).json(updatedResult);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Uknown Error";
    console.error("Error updating result", message);
    res.status(500).json({ message });
  }
};

export const deleteResult = async (
  req: Request<{ id: string }, {}, unknown>,
  res: Response,
) => {
  try {
    const resultIdParsed = resultIdSchema.safeParse(req.params.id);

    if (!resultIdParsed.success) {
      return res.status(400).json({ message: "Invalid result ID" });
    }

    const resultId = resultIdParsed.data;

    const existingResult = await prisma.result.findFirst({
      where: {
        id: resultId,
        isDeleted: false,
      },
    });

    if (!existingResult) {
      return res.status(404).json({
        message: "Result does not exist",
      });
    }

    await prisma.result.update({
      where: {
        id: resultId,
      },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });

    res.status(200).json({ message: "Result deleted successfully" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Uknown Error";
    console.error("Error deleting result", message);
    res.status(500).json({ message });
  }
};
