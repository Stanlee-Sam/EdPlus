import { z } from "zod";
import type { Request, Response } from "express";
import { PrismaPg } from "@prisma/adapter-pg";
import prismaPkg from "../generated/prisma/client.js";

const PrismaClient = (prismaPkg as any).PrismaClient ?? (prismaPkg as any).default?.PrismaClient;
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
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const { role, schoolId: userSchoolId } = user;

    if (role !== 'SCHOOL_ADMIN') {
      return res.status(403).json({ message: "Access denied. Only School Admins can create fee items." });
    }

    const parsed = feeItemSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    const { name, amount, feeStructureId } = parsed.data;

    // Verify fee structure belongs to the school
    const existingFeeStructure = await prisma.feeStructure.findFirst({
      where: {
        id: feeStructureId,
        schoolId: userSchoolId as string,
        isDeleted: false,
      },
    });

    if (!existingFeeStructure) {
      return res.status(404).json({ message: "Fee structure not found in your school" });
    }

    const existingFeeItem = await prisma.feeItem.findFirst({
      where: {
        name,
        feeStructureId,
        isDeleted: false,
      },
    });

    if (existingFeeItem) {
      return res.status(400).json({ message: "Fee item already exists in this structure" });
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
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const { schoolId, role } = user;

    const feeItems = await prisma.feeItem.findMany({
      where: {
        isDeleted: false,
        feeStructure: {
            isDeleted: false,
            ...(role !== 'SUPER_ADMIN' ? { schoolId: schoolId as string } : {}),
        }
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
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const { schoolId, role } = user;
    const feeItemIdParsed = feeItemIdSchema.safeParse(req.params.id);

    if (!feeItemIdParsed.success) {
      return res.status(400).json({ message: "Invalid fee item id" });
    }

    const feeItemId = feeItemIdParsed.data;

    const feeItem = await prisma.feeItem.findFirst({
      where: {
        id: feeItemId,
        isDeleted: false,
        feeStructure: {
            isDeleted: false,
            ...(role !== 'SUPER_ADMIN' ? { schoolId: schoolId as string } : {}),
        }
      },
    });

    if (!feeItem) {
      return res.status(404).json({ message: "Fee item not found in your school" });
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
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const { schoolId, role } = user;
    const feeStructureIdParsed = feeStructureIdSchema.safeParse(req.params.id);

    if (!feeStructureIdParsed.success) {
      return res.status(400).json({ message: "Invalid fee structure id" });
    }

    const feeStructureId = feeStructureIdParsed.data;

    const existingFeeStructure = await prisma.feeStructure.findFirst({
      where: {
        id: feeStructureId,
        isDeleted: false,
        ...(role !== 'SUPER_ADMIN' ? { schoolId: schoolId as string } : {}),
      },
    });

    if (!existingFeeStructure) {
      return res.status(404).json({ message: "Fee structure not found in your school" });
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
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const { role, schoolId: userSchoolId } = user;

    if (role !== 'SCHOOL_ADMIN') {
      return res.status(403).json({ message: "Access denied. Only School Admins can update fee items." });
    }

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
        feeStructure: {
            isDeleted: false,
            schoolId: userSchoolId as string,
        }
      },
    });

    if (!existingFeeItem) {
      return res.status(404).json({ message: "Fee item not found in your school" });
    }

    // Verify target fee structure belongs to school
    const existingFeeStructure = await prisma.feeStructure.findFirst({
      where: {
        id: feeStructureId,
        schoolId: userSchoolId as string,
        isDeleted: false,
      },
    });

    if (!existingFeeStructure) {
      return res.status(404).json({ message: "Target fee structure not found in your school" });
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
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const { role, schoolId: userSchoolId } = user;

    if (role !== 'SCHOOL_ADMIN') {
      return res.status(403).json({ message: "Access denied. Only School Admins can delete fee items." });
    }

    const feeItemIdParsed = feeItemIdSchema.safeParse(req.params.id);

    if (!feeItemIdParsed.success) {
      return res.status(400).json({ message: "Invalid fee item id" });
    }

    const feeItemId = feeItemIdParsed.data;

    const existingFeeItem = await prisma.feeItem.findFirst({
      where: {
        id: feeItemId,
        isDeleted: false,
        feeStructure: {
            isDeleted: false,
            schoolId: userSchoolId as string,
        }
      },
    });

    if (!existingFeeItem) {
      return res.status(404).json({ message: "Fee item not found in your school" });
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
