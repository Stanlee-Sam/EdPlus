import { z } from "zod";
import type { Request, Response } from "express";
import { PrismaPg } from "@prisma/adapter-pg";
import prismaPkg from "../generated/prisma/client.js";

const { PrismaClient } = prismaPkg;
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

const prisma = new PrismaClient({ adapter });

const termIdSchema = z.string().uuid();
const termSchema = z.object({
  name: z.string(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  schoolId: z.string().uuid(),
});

export const createTerm = async (req: Request, res: Response) => {
  try {
    const parsed = termSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid request body" });
    }

    const { name, startDate, endDate, schoolId } = parsed.data;

    const existingTerm = await prisma.term.findFirst({
      where: {
        name,
        startDate,
        endDate,
        schoolId,
        isDeleted: false,
      },
    });

    if (existingTerm) {
      return res.status(400).json({ message: "Term already exists" });
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

    const newTerm = await prisma.term.create({
      data: {
        name,
        startDate,
        endDate,
        schoolId,
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
    const terms = await prisma.term.findMany({ where: { isDeleted: false } });
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
    const termIdParsed = termIdSchema.safeParse(req.params.id);

    if (!termIdParsed.success) {
      return res.status(400).json({
        message: "Invalid Term ID",
      });
    }

    const termId = termIdParsed.data;

    const Term = await prisma.term.findFirst({
      where: { id: termId, isDeleted: false },
    });

    if (!Term) {
      return res.status(404).json({
        message: "Term does not exist",
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
      });
    }
    const { name, startDate, endDate, schoolId } = parsed.data;
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

    const updatedTerm = await prisma.term.update({
      where: {
        id: termId,
      },
      data: {
        name,
        startDate,
        endDate,
        schoolId,
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
        isDeleted: false,
      },
    });

    if (!existingTerm) {
      return res.status(404).json({
        message: "Term does not exist",
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
