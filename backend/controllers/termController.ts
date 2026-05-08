import { z } from "zod";
import type { Request, Response } from "express";
import { PrismaPg } from "@prisma/adapter-pg";
import prismaPkg from "../generated/prisma/client.js";

const PrismaClient = (prismaPkg as any).PrismaClient ?? (prismaPkg as any).default?.PrismaClient;
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

const prisma = new PrismaClient({ adapter });

const termIdSchema = z.string().uuid();
const termSchema = z.object({
  name: z.string(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
});

export const createTerm = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const { role, schoolId: userSchoolId } = user;

    if (role !== 'SCHOOL_ADMIN') {
      return res.status(403).json({ message: "Access denied. Only School Admins can create terms." });
    }

    const parsed = termSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid request body", errors: parsed.error.flatten().fieldErrors });
    }

    const { name, startDate, endDate } = parsed.data;

    const existingTerm = await prisma.term.findFirst({
      where: {
        name,
        startDate,
        endDate,
        schoolId: userSchoolId as string,
        isDeleted: false,
      },
    });

    if (existingTerm) {
      return res.status(400).json({ message: "Term already exists in your school" });
    }

    const newTerm = await prisma.term.create({
      data: {
        name,
        startDate,
        endDate,
        schoolId: userSchoolId as string,
      },
    });

    res.status(201).json(newTerm);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Uknown Error";
    console.error("Error creating term", message);
    res.status(500).json({ message });
  }
};

export const getTerms = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const { schoolId, role } = user;

    const terms = await prisma.term.findMany({ 
        where: { 
            isDeleted: false,
            ...(role !== 'SUPER_ADMIN' ? { schoolId: schoolId as string } : {}),
        } 
    });
    res.status(200).json(terms);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Uknown Error";
    console.error("Error fetching terms", message);
    res.status(500).json({ message });
  }
};

export const getSpecificTerm = async (
  req: Request<{ id: string }, {}, unknown>,
  res: Response,
) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const { schoolId, role } = user;
    const termIdParsed = termIdSchema.safeParse(req.params.id);

    if (!termIdParsed.success) {
      return res.status(400).json({
        message: "Invalid Term ID",
      });
    }

    const termId = termIdParsed.data;

    const Term = await prisma.term.findFirst({
      where: { 
          id: termId, 
          isDeleted: false,
          ...(role !== 'SUPER_ADMIN' ? { schoolId: schoolId as string } : {}),
      },
    });

    if (!Term) {
      return res.status(404).json({
        message: "Term does not exist in your school",
      });
    }

    res.status(200).json(Term);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Failed to get term", message);
    res.status(500).json({ message });
  }
};

export const updateTerm = async (
  req: Request<{ id: string }, {}, unknown>,
  res: Response,
) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const { role, schoolId: userSchoolId } = user;

    if (role !== 'SCHOOL_ADMIN') {
      return res.status(403).json({ message: "Access denied. Only School Admins can update terms." });
    }

    const termIdParsed = termIdSchema.safeParse(req.params.id);
    const parsed = termSchema.safeParse(req.body);

    if (!termIdParsed.success) {
      return res.status(400).json({
        message: "Invalid Term ID",
      });
    }

    if (!parsed.success) {
      return res.status(400).json({
        message: "Invalid request body",
        errors: parsed.error.flatten().fieldErrors,
      });
    }
    const { name, startDate, endDate } = parsed.data;
    const termId = termIdParsed.data;

    const existingTerm = await prisma.term.findFirst({
      where: {
        id: termId,
        schoolId: userSchoolId as string,
        isDeleted: false,
      },
    });

    if (!existingTerm) {
      return res.status(404).json({
        message: "Term does not exist in your school",
      });
    }

    const updatedTerm = await prisma.term.update({
      where: {
        id: termId,
      },
      data: {
        name,
        startDate,
        endDate,
      },
    });

    res.status(200).json(updatedTerm);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Uknown Error";
    console.error("Error updating term", message);
    res.status(500).json({ message });
  }
};

export const deleteTerm = async (
  req: Request<{ id: string }, {}, unknown>,
  res: Response,
) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const { role, schoolId: userSchoolId } = user;

    if (role !== 'SCHOOL_ADMIN') {
      return res.status(403).json({ message: "Access denied. Only School Admins can delete terms." });
    }

    const termIdParsed = termIdSchema.safeParse(req.params.id);

    if (!termIdParsed.success) {
      return res.status(400).json({
        message: "Invalid Term ID",
      });
    }

    const termId = termIdParsed.data;

    const existingTerm = await prisma.term.findFirst({
      where: {
        id: termId,
        schoolId: userSchoolId as string,
        isDeleted: false,
      },
    });

    if (!existingTerm) {
      return res.status(404).json({
        message: "Term does not exist in your school",
      });
    }

    await prisma.term.update({
      where: {
        id: termId,
      },
      data: {
        isDeleted: true,
        deletedAt : new Date(),
      },
    });

    res.status(200).json({
      message: "Term deleted successfully",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Uknown Error";
    console.error("Error deleting term", message);
    res.status(500).json({ message });
  }
};
