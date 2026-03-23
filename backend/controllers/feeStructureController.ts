import { z } from "zod";
import type { Request, Response } from "express";
import { PrismaPg } from "@prisma/adapter-pg";
import prismaPkg from "../generated/prisma/client.js";

const PrismaClient = (prismaPkg as any).PrismaClient ?? (prismaPkg as any).default?.PrismaClient;
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

const prisma = new PrismaClient({ adapter });

const feeStructureSchema = z.object({
  amount: z.number().int(),
  levelId: z.string().uuid(),
  termId: z.string().uuid(),
  schoolId: z.string().uuid(),
});

const feeStructureIdSchema = z.string().uuid();
const levelIdSchema = z.string().uuid();
const termIdSchema = z.string().uuid();

export const createFeeStructure = async (req: Request, res: Response) => {
  try {
    const parsed = feeStructureSchema.safeParse(req.body);

    if (!parsed.success) {
      return res
        .status(400)
        .json({
          message: "Validation failed",
          errors: parsed.error.flatten().fieldErrors,
        });
    }

    const { amount, levelId, termId, schoolId } = parsed.data;

    const existingFeeStructure = await prisma.feeStructure.findFirst({
      where: {
        levelId,
        termId,
        schoolId,
        isDeleted: false,
      },
    });

    if (existingFeeStructure) {
      return res.status(400).json({ message: "Fee structure already exists" });
    }

    const existingLevel = await prisma.level.findFirst({
      where: {
        id: levelId,
        isDeleted: false,
      },
    });

    if (!existingLevel) {
      return res.status(404).json({ message: "Level does not exist" });
    }

    const existingTerm = await prisma.term.findFirst({
      where: {
        id: termId,
        isDeleted: false,
      },
    });

    if (!existingTerm) {
      return res.status(404).json({ message: "Term does not exist" });
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

    const feeStructure = await prisma.feeStructure.create({
      data: {
        amount,
        levelId,
        termId,
        schoolId,
      },
    });

    res.status(201).json(feeStructure);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Uknown Error";
    console.error("Error creating fee structure", message);
    res.status(500).json({ message });
  }
};

export const getFeeStructures = async (req: Request, res: Response) => {
  try {
    const feeStructures = await prisma.feeStructure.findMany({
      where: {
        isDeleted: false,
      },
    });
    res.status(200).json({ feeStructures });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Uknown Error";
    console.error("Error fetching fee structures", message);
    res.status(500).json({ message });
  }
};

export const getFeeStructure = async (
  req: Request<{ id: string }, {}, unknown>,
  res: Response,
) => {
  try {
    const feeStructureIdParsed = feeStructureIdSchema.safeParse(req.params.id);

    if (!feeStructureIdParsed.success) {
      return res.status(400).json({ message: "Invalid fee structure id" });
    }

    const feeStructureId = feeStructureIdParsed.data;

    const feeStructure = await prisma.feeStructure.findFirst({
      where: {
        id: feeStructureId,
        isDeleted: false,
      },
    });

    if (!feeStructure) {
      return res.status(404).json({ message: "Fee structure not found" });
    }

    res.status(200).json(feeStructure);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Uknown Error";
    console.error("Error fetching fee structure", message);
    res.status(500).json({ message });
  }
};
export const getLevelFeeStructure = async (
  req: Request<{ id: string }, {}, unknown>,
  res: Response,
) => {
  try {
    const levelIdParsed = levelIdSchema.safeParse(req.params.id);

    if (!levelIdParsed.success) {
      return res.status(400).json({ message: "Invalid level id" });
    }

    const levelId = levelIdParsed.data;

    const existingLevel = await prisma.level.findFirst({
      where: {
        id: levelId,
        isDeleted: false,
      },
    });

    if (!existingLevel) {
      return res.status(404).json({ message: "Level not found" });
    }

    const feeStructures = await prisma.feeStructure.findMany({
      where: {
        levelId,
        isDeleted: false,
      },
    });

    res.status(200).json({ feeStructures });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Uknown Error";
    console.error("Error fetching level fee structure", message);
    res.status(500).json({ message });
  }
};

export const getTermFeeStructure = async (
  req: Request<{ id: string }, {}, unknown>,
  res: Response,
) => {
  try {
    const termIdParsed = termIdSchema.safeParse(req.params.id);

    if (!termIdParsed.success) {
      return res.status(400).json({ message: "Invalid term id" });
    }

    const termId = termIdParsed.data;

    const existingTerm = await prisma.term.findFirst({
      where: {
        id: termId,
        isDeleted: false,
      },
    });

    if (!existingTerm) {
      return res.status(404).json({ message: "Term not found" });
    }

    const feeStructures = await prisma.feeStructure.findMany({
      where: {
        termId,
        isDeleted: false,
      },
    });

    res.status(200).json({ feeStructures });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Uknown Error";
    console.error("Error fetching term fee structure", message);
    res.status(500).json({ message });
  }
};

export const updateFeeStructure = async (
  req: Request<{ id: string }, {}, unknown>,
  res: Response,
) => {
  try {
    const feeStructureIdParsed = feeStructureIdSchema.safeParse(req.params.id);
    const parsed = feeStructureSchema.safeParse(req.body);

    if (!feeStructureIdParsed.success) {
      return res.status(400).json({ message: "Invalid fee structure id" });
    }
    if (!parsed.success) {
      return res
        .status(400)
        .json({
          message: "Validation failed",
          errors: parsed.error.flatten().fieldErrors,
        });
    }

    const { amount, levelId, termId, schoolId } = parsed.data;
    const feeStructureId = feeStructureIdParsed.data;

    const existingFeeStructure = await prisma.feeStructure.findFirst({
      where: {
        id: feeStructureId,
        isDeleted: false,
      },
    });

    if (!existingFeeStructure) {
      return res.status(404).json({ message: "Fee structure not found" });
    }

    const existingLevel = await prisma.level.findFirst({
      where: {
        id: levelId,
        isDeleted: false,
      },
    });

    if (!existingLevel) {
      return res.status(404).json({ message: "Level not found" });
    }

    const existingTerm = await prisma.term.findFirst({
      where: {
        id: termId,
        isDeleted: false,
      },
    });

    if (!existingTerm) {
      return res.status(404).json({ message: "Term not found" });
    }

    const existingSchool = await prisma.school.findFirst({
      where: {
        id: schoolId,
        isDeleted: false,
      },
    });

    if (!existingSchool) {
      return res.status(404).json({ message: "School not found" });
    }

    const updatedFeeStructure = await prisma.feeStructure.update({
      where: {
        id: feeStructureId,
      },
      data: {
        amount,
        levelId,
        termId,
        schoolId,
      },
    });
    res.status(200).json(updatedFeeStructure);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Uknown Error";
    console.error("Error updating fee structure", message);
    res.status(500).json({ message });
  }
};

export const deleteFeeStructure = async (req: Request<{id : string}, {}, unknown>, res: Response) => {
    try {
        const feeStructureIdParsed = feeStructureIdSchema.safeParse(req.params.id);

        if (!feeStructureIdParsed.success) {
            return res.status(400).json({ message: "Invalid fee structure id" });
        }
        
        const feeStructureId = feeStructureIdParsed.data;

        const existingFeeStructure = await prisma.feeStructure.findFirst({
            where: {
                id: feeStructureId,
                isDeleted: false,
            },
        });

        if (!existingFeeStructure) {
            return res.status(404).json({ message: "Fee structure not found" });
        }

        await prisma.feeStructure.update({
            where: {
                id: feeStructureId,
            },
            data: {
                isDeleted: true,
                deletedAt: new Date(),
            },
        });
        res.status(200).json({ message: "Fee structure deleted successfully" });

    } catch (error) {
        const message = error instanceof Error ? error.message : "Uknown Error";
        console.error("Error deleting fee structure", message);
        res.status(500).json({ message });
    }
};
