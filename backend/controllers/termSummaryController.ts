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

const termSummaryIdSchema = z.string().uuid();
const termIdSchema = z.string().uuid();
const studentIdSchema = z.string().uuid();
const termSummarySchema = z.object({
  termId: z.string().uuid(),
  studentId: z.string().uuid(),
  schoolId: z.string().uuid(),
  totalScore: z.number().int(),
  meanScore: z.number(),
  meanGrade: z.nativeEnum(Grade),
});

const termSummaryFilterSchema = z.object({
  termId: z.string().uuid().optional(),
  studentId: z.string().uuid().optional(),
  schoolId: z.string().uuid().optional(),
});

export const createTermSummary = async (req: Request, res: Response) => {
  try {
    const termSummaryParsed = termSummarySchema.safeParse(req.body);

    if (!termSummaryParsed.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: termSummaryParsed.error.flatten().fieldErrors,
      });
    }

    const { termId, studentId, schoolId, totalScore, meanScore, meanGrade } =
      termSummaryParsed.data;

    const existingTermSummary = await prisma.termSummary.findFirst({
      where: {
        termId,
        studentId,
        isDeleted: false,
      },
    });

    if (existingTermSummary) {
      return res.status(409).json({
        message: "Term summary already exists",
      });
    }

    const existingStudent = await prisma.student.findFirst({
      where: {
        id: studentId,
        isDeleted: false,
      },
    });

    if (!existingStudent) {
      return res.status(404).json({
        message: "Student does not exist",
      });
    }

    const existingTerm = await prisma.term.findFirst({
      where: {
        id: termId,
        isDeleted: false,
      },
    });

    if (!existingTerm) {
      return res.status(404).json({
        message: "Term does not exist",
      });
    }

    const existingSchool = await prisma.school.findFirst({
      where: {
        id: schoolId,
        isDeleted: false,
      },
    });

    if (!existingSchool) {
      return res.status(404).json({
        message: "School does not exist",
      });
    }

    const newTermSummary = await prisma.termSummary.create({
      data: {
        termId,
        studentId,
        schoolId,
        totalScore,
        meanScore,
        meanGrade,
      },
    });

    res.status(201).json(newTermSummary);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Uknown Error";
    console.error("Error creating term summary", message);
    res.status(500).json({ message });
  }
};

export const getTermSummaries = async (req: Request, res: Response) => {
  try {
    const parsed = termSummaryFilterSchema.safeParse(req.query);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    const { termId, studentId, schoolId } = parsed.data;

    const where: any = { isDeleted: false };

    if (termId) where.termId = termId;

    if (studentId) where.studentId = studentId;

    if (schoolId) where.schoolId = schoolId;

    const termSummaries = await prisma.termSummary.findMany({ where });

    res.status(200).json(termSummaries);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Uknown Error";
    console.error("Error fetching term summaries", message);
    res.status(500).json({ message });
  }
};

export const getSpecificTermSummary = async (
  req: Request<{ id: string }, {}, unknown>,
  res: Response,
) => {
  try {
    const termSummaryIdParsed = termSummaryIdSchema.safeParse(req.params.id);

    if (!termSummaryIdParsed.success) {
      return res.status(400).json({
        message: "Invalid term summary ID",
      });
    }

    const termSummaryId = termSummaryIdParsed.data;

    const TermSummary = await prisma.termSummary.findFirst({
      where: {
        id: termSummaryId,
        isDeleted: false,
      },
    });

    if (!TermSummary) {
      return res.status(404).json({
        message: "Term summary does not exist",
      });
    }

    res.status(200).json(TermSummary);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Uknown Error";
    console.error("Error fetching specific term summary", message);
    res.status(500).json({ message });
  }
};

export const getTermSummaryByTermId = async (
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
      return res.status(404).json({
        message: "Term does not exist",
      });
    }

    const termSummary = await prisma.termSummary.findMany({
      where: {
        termId,
        isDeleted: false,
      },
    });

    res.status(200).json(termSummary);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Uknown Error";
    console.error("Error fetching specific term summary", message);
    res.status(500).json({ message });
  }
};
export const getTermSummaryByStudentId = async (
  req: Request,
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

    const student = await prisma.student.findFirst({
      where: {
        id: studentId,
        isDeleted: false,
      },
    });

    if (!student) {
      return res.status(404).json({
        message: "Student does not exist",
      });
    }

    const studentTermSummary = await prisma.termSummary.findMany({
      where: {
        studentId,
        isDeleted: false,
      },
    });

    res.status(200).json(studentTermSummary);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Uknown Error";
    console.error("Error fetching specific term summary", message);
    res.status(500).json({ message });
  }
};
export const updateTermSummary = async (
  req: Request<{ id: string }, {}, unknown>,
  res: Response,
) => {
  try {
    const termSummaryIdParsed = termSummaryIdSchema.safeParse(req.params.id);
    const parsed = termSummarySchema.safeParse(req.body);

    if (!termSummaryIdParsed.success) {
      return res.status(400).json({
        message: "Invalid term summary ID",
      });
    }

    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    const termSummaryId = termSummaryIdParsed.data;
    const { termId, studentId, schoolId, totalScore, meanScore, meanGrade } =
      parsed.data;

    const existingTermSummary = await prisma.termSummary.findFirst({
      where: {
        id: termSummaryId,
        isDeleted: false,
      },
    });

    if (!existingTermSummary) {
      return res.status(404).json({
        message: "Term summary does not exist",
      });
    }

    const existingStudent = await prisma.student.findFirst({
      where: {
        id: studentId,
        isDeleted: false,
      },
    });

    if (!existingStudent) {
      return res.status(404).json({
        message: "Student does not exist",
      });
    }

    const existingTerm = await prisma.term.findFirst({
      where: {
        id: termId,
        isDeleted: false,
      },
    });

    if (!existingTerm) {
      return res.status(404).json({
        message: "Term does not exist",
      });
    }

    const existingSchool = await prisma.school.findFirst({
      where: {
        id: schoolId,
        isDeleted: false,
      },
    });

    if (!existingSchool) {
      return res.status(404).json({
        message: "School does not exist",
      });
    }

    const updatedTermSummary = await prisma.termSummary.update({
      where: {
        id: termSummaryId,
      },
      data: {
        termId,
        studentId,
        schoolId,
        totalScore,
        meanScore,
        meanGrade,
      },
    });

    res.status(200).json(updatedTermSummary);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Uknown Error";
    console.error("Error updating term summary", message);
    res.status(500).json({ message });
  }
};

export const deleteTermSummary = async (
  req: Request<{ id: string }, {}, unknown>,
  res: Response,
) => {
  try {
    const termSummaryIdParsed = termSummaryIdSchema.safeParse(req.params.id);

    if (!termSummaryIdParsed.success) {
      return res.status(400).json({
        message: "Invalid term summary ID",
      });
    }

    const termSummaryId = termSummaryIdParsed.data;

    const existingTermSummary = await prisma.termSummary.findFirst({
      where: {
        id: termSummaryId,
        isDeleted: false,
      },
    });

    if (!existingTermSummary) {
      return res.status(404).json({
        message: "Term summary does not exist",
      });
    }

    await prisma.termSummary.update({
      where: {
        id: termSummaryId,
      },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });

    res.status(200).json({ message: "Term summary deleted successfully" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Uknown Error";
    console.error("Error deleting term summary", message);
    res.status(500).json({ message });
  }
};
