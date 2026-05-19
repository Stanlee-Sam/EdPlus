import { z } from "zod";
import type { Request, Response } from "express";
import { PrismaPg } from "@prisma/adapter-pg";
import * as prismaPkg from "../generated/prisma/client.js";

const PrismaClient = (prismaPkg as any).PrismaClient ?? (prismaPkg as any).default?.PrismaClient;
const { Prisma } = prismaPkg as unknown as { Prisma: typeof prismaPkg.Prisma };
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

const prisma = new PrismaClient({ adapter });

const subjectIdSchema = z.string().uuid();
const subjectSchema = z.object({
  name: z.string(),
});

export const getSubjects = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const { schoolId: userSchoolId, role } = user;
    const querySchoolId = req.query.schoolId as string | undefined;
    const effectiveSchoolId = role === "SUPER_ADMIN" ? querySchoolId : userSchoolId;

    if (!effectiveSchoolId) {
      return res.status(400).json({ message: "schoolId is required" });
    }

    const subjects = await prisma.subject.findMany({
      where: {
        isDeleted: false,
        schoolId: effectiveSchoolId,
      },
    });
    res.status(200).json(subjects);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error fetching subjects", message);
    res.status(500).json({ message });
  }
};

export const getSpecificSubject = async (
  req: Request<{ id: string }, {}, unknown>,
  res: Response,
) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const { schoolId, role } = user;
    const subjectIdParsed = subjectIdSchema.safeParse(req.params.id);

    if (!subjectIdParsed.success) {
      return res.status(400).json({ message: "Invalid subject ID" });
    }

    const subjectId = subjectIdParsed.data;

    const subject = await prisma.subject.findFirst({
      where: {
        id: subjectId,
        isDeleted: false,
        ...(role !== 'SUPER_ADMIN' ? { schoolId: schoolId as string } : {}),
      },
    });

    if (!subject) {
      return res.status(404).json({ message: "Subject does not exist" });
    }

    res.status(200).json(subject);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error fetching specific subject", message);
    res.status(500).json({ message });
  }
};

export const createSubject = async (
  req: Request<{}, {}, unknown>,
  res: Response,
) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const { role, schoolId: userSchoolId } = user;

    if (role !== 'SCHOOL_ADMIN') {
      return res.status(403).json({ message: "Access denied. Only School Admins can create subjects." });
    }

    const parsed = subjectSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
    }
    const { name } = parsed.data;

    const existingSubject = await prisma.subject.findFirst({
      where: {
        name,
        schoolId: userSchoolId as string,
        isDeleted: false,
      },
    });

    if (existingSubject) {
      return res.status(400).json({ message: "Subject already exists in your school" });
    }

    const newSubject = await prisma.subject.create({
      data: {
        name,
        schoolId: userSchoolId as string,
      },
    });

    res.status(201).json(newSubject);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error creating subject", message);
    res.status(500).json({ message });
  }
};

export const updateSubject = async (
  req: Request<{ id: string }, {}, unknown>,
  res: Response,
) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const { role, schoolId: userSchoolId } = user;

    if (role !== 'SCHOOL_ADMIN') {
      return res.status(403).json({ message: "Access denied. Only School Admins can update subjects." });
    }

    const subjectIdParsed = subjectIdSchema.safeParse(req.params.id);
    const parsed = subjectSchema.safeParse(req.body);

    if (!subjectIdParsed.success) {
      return res.status(400).json({ message: "Invalid subject ID" });
    }
    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    const subjectId = subjectIdParsed.data;
    const { name } = parsed.data;

    const existingSubject = await prisma.subject.findFirst({
      where: {
        id: subjectId,
        schoolId: userSchoolId as string,
        isDeleted: false,
      },
    });

    if (!existingSubject) {
      return res.status(404).json({ message: "Subject does not exist in your school" });
    }

    const updatedSubject = await prisma.subject.update({
      where: {
        id: subjectId,
      },
      data: {
        name,
      },
    });

    res.status(200).json(updatedSubject);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error updating subject", message);
    res.status(500).json({ message });
  }
};

export const deleteSubject = async (
  req: Request<{ id: string }, {}, unknown>,
  res: Response,
) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const { role, schoolId: userSchoolId } = user;

    if (role !== 'SCHOOL_ADMIN') {
      return res.status(403).json({ message: "Access denied. Only School Admins can delete subjects." });
    }

    const subjectIdParsed = subjectIdSchema.safeParse(req.params.id);

    if (!subjectIdParsed.success) {
      return res.status(400).json({ message: "Invalid subject ID" });
    }

    const subjectId = subjectIdParsed.data;

    const existingSubject = await prisma.subject.findFirst({
      where: {
        id: subjectId,
        schoolId: userSchoolId as string,
        isDeleted: false,
      },
    });

    if (!existingSubject) {
      return res.status(404).json({ message: "Subject does not exist in your school" });
    }

    await prisma.subject.update({
      where: {
        id: subjectId,
      },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });

    res.status(200).json({ message: "Subject deleted successfully" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error deleting subject", message);
    res.status(500).json({ message });
  }
};
