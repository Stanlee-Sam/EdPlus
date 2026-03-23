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
  schoolId: z.string().uuid(),
});

export const getSubjects = async (req: Request, res: Response) => {
  try {
    const subjects = await prisma.subject.findMany({
      where: {
        isDeleted: false,
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
    const subjectIdParsed = subjectIdSchema.safeParse(req.params.id);

    if (!subjectIdParsed.success) {
      return res.status(400).json({ message: "Invalid subject ID" });
    }

    const subjectId = subjectIdParsed.data;

    const subject = await prisma.subject.findFirst({
      where: {
        id: subjectId,
        isDeleted: false,
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
    const parsed = subjectSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
    }
    const { name, schoolId } = parsed.data;

    const existingSubject = await prisma.subject.findFirst({
      where: {
        name,
        schoolId,
        isDeleted: false,
      },
    });

    if (existingSubject) {
      return res.status(400).json({ message: "Subject already exists" });
    }

    const existingSchool = await prisma.school.findFirst({
      where: {
        id: schoolId,
        isDeleted: false,
      },
    });

    if (!existingSchool) {
      return res.status(404).json({ message: "School does not exist" });
    }

    const newSubject = await prisma.subject.create({
      data: {
        name,
        schoolId,
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
    const { name, schoolId } = parsed.data;

    const existingSubject = await prisma.subject.findFirst({
      where: {
        id: subjectId,

        isDeleted: false,
      },
    });

    if (!existingSubject) {
      return res.status(404).json({ message: "Subject does not exist" });
    }

    const updatedSubject = await prisma.subject.update({
      where: {
        id: subjectId,
      },
      data: {
        name,
        schoolId,
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
    const subjectIdParsed = subjectIdSchema.safeParse(req.params.id);

    if (!subjectIdParsed.success) {
      return res.status(400).json({ message: "Invalid subject ID" });
    }

    const subjectId = subjectIdParsed.data;

    const existingSubject = await prisma.subject.findFirst({
      where: {
        id: subjectId,
        isDeleted: false,
      },
    });

    if (!existingSubject) {
      return res.status(404).json({ message: "Subject does not exist" });
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
