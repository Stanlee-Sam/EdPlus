import { z } from "zod";
import type { Request, Response } from "express";
import { PrismaPg } from "@prisma/adapter-pg";
import prismaPkg, { Prisma } from "../generated/prisma/client.js";

const { PrismaClient } = prismaPkg;
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

const prisma = new PrismaClient({ adapter });

const teacherClassSubjectIdSchema = z.string().uuid();
const teacherClassSubjectSchema = z.object({
  teacherId: z.string().uuid(),
  classId: z.string().uuid(),
  subjectId: z.string().uuid(),
  schoolId: z.string().uuid(),
});

export const getTCS = async (req: Request, res: Response) => {
  try {
    const TCSs = await prisma.teacherClassSubject.findMany({
      where: {
        isDeleted: false,
      },
    });
    res.status(200).json(TCSs);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error fetching TCS", message);
    res.status(500).json({ message });
  }
};
export const getSpecificTCS = async (
  req: Request<{ id: string }, {}, unknown>,
  res: Response,
) => {
  try {
    const TCSIdParsed = teacherClassSubjectIdSchema.safeParse(req.params.id);

    if (!TCSIdParsed.success) {
      return res.status(400).json({ message: "Invalid TCS ID" });
    }

    const TCSId = TCSIdParsed.data;

    const TCS = await prisma.teacherClassSubject.findFirst({
      where: {
        id: TCSId,
        isDeleted: false,
      },
    });

    if (!TCS) {
      return res.status(404).json({ message: "TCS does not exist" });
    }

    res.status(200).json(TCS);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error fetching specific TCS", message);
    res.status(500).json({ message });
  }
};
export const createTCS = async (req: Request, res: Response) => {
  try {
    const parsed = teacherClassSubjectSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    const { teacherId, classId, subjectId, schoolId } = parsed.data;

    const existingTCS = await prisma.teacherClassSubject.findFirst({
      where: {
        teacherId,
        classId,
        subjectId,
        isDeleted: false,
      },
    });

    if (existingTCS) {
      return res.status(409).json({
        message: "TCS already exists",
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

    const existingClass = await prisma.class.findFirst({
      where: {
        id: classId,
        isDeleted: false,
      },
    });

    if (!existingClass) {
      return res.status(404).json({
        message: "Class does not exist",
      });
    }

    const existingSubject = await prisma.subject.findFirst({
      where: {
        id: subjectId,
        isDeleted: false,
      },
    });

    if (!existingSubject) {
      return res.status(404).json({
        message: "Subject does not exist",
      });
    }

    const existingTeacher = await prisma.user.findFirst({
      where: {
        id: teacherId,
        isDeleted: false,
      },
    });

    if (!existingTeacher) {
      return res.status(404).json({
        message: "Teacher does not exist",
      });
    }

    const newTCS = await prisma.teacherClassSubject.create({
      data: {
        teacherId,
        classId,
        subjectId,
        schoolId,
      },
    });

    res.status(201).json(newTCS);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error creating TCS", message);
    res.status(500).json({ message });
  }
};
export const updateTCS = async (
  req: Request<{ id: string }, {}, unknown>,
  res: Response,
) => {
  try {
    const TCSIdParsed = teacherClassSubjectIdSchema.safeParse(req.params.id);
    const parsed = teacherClassSubjectSchema.safeParse(req.body);

    if (!TCSIdParsed.success) {
      return res.status(400).json({ message: "Invalid TCS ID" });
    }

    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    const { teacherId, classId, subjectId, schoolId } = parsed.data;
    const TCSId = TCSIdParsed.data;

    const existingTCS = await prisma.teacherClassSubject.findFirst({
      where: {
        id: TCSId,
        isDeleted: false,
      },
    });

    if (!existingTCS) {
      return res.status(404).json({ message: "TCS does not exist" });
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

    const existingClass = await prisma.class.findFirst({
      where: {
        id: classId,
        isDeleted: false,
      },
    });

    if (!existingClass) {
      return res.status(404).json({
        message: "Class does not exist",
      });
    }

    const existingSubject = await prisma.subject.findFirst({
      where: {
        id: subjectId,
        isDeleted: false,
      },
    });

    if (!existingSubject) {
      return res.status(404).json({
        message: "Subject does not exist",
      });
    }

    const existingTeacher = await prisma.user.findFirst({
      where: {
        id: teacherId,
        isDeleted: false,
      },
    });

    if (!existingTeacher) {
      return res.status(404).json({
        message: "Teacher does not exist",
      });
    }

    const updatedTCS = await prisma.teacherClassSubject.update({
      where: {
        id: TCSId,
      },
      data: {
        teacherId,
        classId,
        subjectId,
        schoolId,
      },
    });

    res.status(200).json(updatedTCS);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error updating TCS", message);
    res.status(500).json({ message });
  }
};
export const deleteTCS = async (
  req: Request<{ id: string }, {}, unknown>,
  res: Response,
) => {
  try {
    const TCSIdParsed = teacherClassSubjectIdSchema.safeParse(req.params.id);

    if (!TCSIdParsed.success) {
      return res.status(400).json({ message: "Invalid TCS ID" });
    }

    const TCSId = TCSIdParsed.data;

    const existingTCS = await prisma.teacherClassSubject.findFirst({
      where: {
        id: TCSId,
        isDeleted: false,
      },
    });

    if (!existingTCS) {
      return res.status(404).json({ message: "TCS does not exist" });
    }

    await prisma.teacherClassSubject.update({
      where: {
        id: TCSId,
      },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });

    res.status(200).json({ message: "TCS deleted successfully" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error deleting TCS", message);
    res.status(500).json({ message });
  }
};
