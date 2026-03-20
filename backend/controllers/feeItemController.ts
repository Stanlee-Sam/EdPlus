import { z } from "zod";
import type { Request, Response } from "express";
import { PrismaPg } from "@prisma/adapter-pg";
import prismaPkg from "../generated/prisma/client.js";

const { PrismaClient } = prismaPkg;
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

const prisma = new PrismaClient({ adapter });

const feeItemIdSchema = z.string().uuid();
const feeStructureIdSchema = z.string().uuid();
const feeItemSchema = z.object({
  name: z.string(),
  amount: z.number().int(),
  feeStructureId: z.string().uuid(),
});

export const createFeeItem = async (req: Request, res: Response) => {
  try {
    const parsed = feeItemSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    const { name, amount, feeStructureId } = parsed.data;

    const existingFeeItem = await prisma.feeItem.findFirst({
      where: {
        name,
        feeStructureId,
        isDeleted: false,
      },
    });

    if (existingFeeItem) {
      return res.status(400).json({ message: "Fee item already exists" });
    }

    const existingFeeStructure = await prisma.feeStructure.findFirst({
      where: {
        id: feeStructureId,
        isDeleted: false,
      },
    });

    if (!existingFeeStructure) {
      return res.status(404).json({ message: "Fee structure not found" });
    }

    const feeItem = await prisma.feeItem.create({
      data: {
        name,
        amount,
        feeStructureId,
      },
    });

    res.status(201).json(feeItem);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Uknown Error";
    console.error("Error creating fee item", message);
    res.status(500).json({ message });
  }
};

export const getFeeItems = async (req: Request, res: Response) => {
  try {
    const feeItems = await prisma.feeItem.findMany({
      where: {
        isDeleted: false,
      },
    });

    res.status(200).json(feeItems);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Uknown Error";
    console.error("Error fetching fee items", message);
    res.status(500).json({ message });
  }
};
export const getFeeItem = async (
  req: Request<{ id: string }, {}, unknown>,
  res: Response,
) => {
  try {
    const feeItemIdParsed = feeItemIdSchema.safeParse(req.params.id);

    if (!feeItemIdParsed.success) {
      return res.status(400).json({ message: "Invalid fee item id" });
    }

    const feeItemId = feeItemIdParsed.data;

    const feeItem = await prisma.feeItem.findFirst({
      where: {
        id: feeItemId,
        isDeleted: false,
      },
    });

    if (!feeItem) {
      return res.status(404).json({ message: "Fee item not found" });
    }

    res.status(200).json(feeItem);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Uknown Error";
    console.error("Error fetching fee item", message);
    res.status(500).json({ message });
  }
};
export const getFeeStructureFeeItem = async (
  req: Request<{ id: string }, {}, unknown>,
  res: Response,
) => {
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

    const feeItems = await prisma.feeItem.findMany({
      where: {
        feeStructureId,
        isDeleted: false,
      },
    });

    res.status(200).json(feeItems);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Uknown Error";
    console.error("Error fetching fee item", message);
    res.status(500).json({ message });
  }
};
export const updateFeeItem = async (
  req: Request<{ id: string }, {}, unknown>,
  res: Response,
) => {
  try {
    const feeItemIdParsed = feeItemIdSchema.safeParse(req.params.id);
    const parsed = feeItemSchema.safeParse(req.body);

    if (!feeItemIdParsed.success) {
      return res.status(400).json({ message: "Invalid fee item id" });
    }
    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    const { name, amount, feeStructureId } = parsed.data;
    const feeItemId = feeItemIdParsed.data;

    const existingFeeItem = await prisma.feeItem.findFirst({
      where: {
        id: feeItemId,
        isDeleted: false,
      },
    });

    if (!existingFeeItem) {
      return res.status(404).json({ message: "Fee item not found" });
    }

    const existingFeeStructure = await prisma.feeStructure.findFirst({
      where: {
        id: feeStructureId,
        isDeleted: false,
      },
    });

    if (!existingFeeStructure) {
      return res.status(404).json({ message: "Fee structure not found" });
    }

    const feeItem = await prisma.feeItem.update({
      where: {
        id: feeItemId,
      },
      data: {
        name,
        amount,
        feeStructureId,
      },
    });

    res.status(200).json(feeItem);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Uknown Error";
    console.error("Error updating fee item", message);
    res.status(500).json({ message });
  }
};
export const deleteFeeItem = async (
  req: Request<{ id: string }, {}, unknown>,
  res: Response,
) => {
  try {
    const feeItemIdParsed = feeItemIdSchema.safeParse(req.params.id);

    if (!feeItemIdParsed.success) {
      return res.status(400).json({ message: "Invalid fee item id" });
    }

    const feeItemId = feeItemIdParsed.data;

    const existingFeeItem = await prisma.feeItem.findFirst({
      where: {
        id: feeItemId,
        isDeleted: false,
      },
    });

    if (!existingFeeItem) {
      return res.status(404).json({ message: "Fee item not found" });
    }

    await prisma.feeItem.update({
      where: {
        id: feeItemId,
      },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });

    res.status(200).json({ message: "Fee item deleted successfully" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Uknown Error";
    console.error("Error deleting fee item", message);
    res.status(500).json({ message });
  }
};
