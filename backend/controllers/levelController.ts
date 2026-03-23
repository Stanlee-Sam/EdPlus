import { z } from "zod";
import type { Request, Response } from "express";
import { PrismaPg } from "@prisma/adapter-pg";
import prismaPkg from "../generated/prisma/client.js";

const PrismaClient = (prismaPkg as any).PrismaClient ?? (prismaPkg as any).default?.PrismaClient;
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

const prisma = new PrismaClient({ adapter });

const levelIdSchema = z.string().uuid();
const schoolIdSchema = z.string().uuid();
const levelSchema = z.object({
  name: z.string(),
  schoolId: z.string().uuid(),
  order: z.number().int(),
});

export const createLevel = async (req: Request, res: Response) => {
  try {
    const parsed = levelSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
    }
    const { name, schoolId, order } = parsed.data;

    const existingLevel = await prisma.level.findFirst({
      where: {
        name,
        schoolId,
        isDeleted: false,
      },
    });
    if (existingLevel) {
      return res.status(400).json({ message: "Level already exists" });
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

    const existingOrder = await prisma.level.findFirst({
      where: {
        order,
        schoolId,
        isDeleted: false,
      },
    });

    if (existingOrder) {
      return res.status(400).json({ message: "Level order already exists" });
    }

    const newLevel = await prisma.level.create({
      data: {
        name,
        order,
        schoolId,
      },
    });
    res.status(201).json({ message: "Level created successfully", newLevel });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Uknown Error";
    console.error("Error creating level", message);
    res.status(500).json({ message });
  }
};

export const getLevels = async (req: Request, res: Response) => {
  try {
    const levels = await prisma.level.findMany({
      where: {
        isDeleted: false,
      },
    });
    res.status(200).json({ levels });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Uknown Error";
    console.error("Error fetching levels", message);
    res.status(500).json({ message });
  }
};

export const getLevel = async (
  req: Request<{ id: string }, {}, unknown>,
  res: Response,
) => {
  try {
    const levelIdParsed = levelIdSchema.safeParse(req.params.id);

    if (!levelIdParsed.success) {
      return res.status(400).json({ message: "Invalid level ID" });
    }

    const levelId = levelIdParsed.data;

    const level = await prisma.level.findFirst({
      where: {
        id: levelId,
        isDeleted: false,
      },
    });

    if (!level) {
      return res.status(404).json({ message: "Level not found" });
    }

    res.status(200).json(level);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Uknown Error";
    console.error("Error fetching level", message);
    res.status(500).json({ message });
  }
};

export const getSchoolLevel = async (
  req: Request<{ id: string }, {}, unknown>,
  res: Response,
) => {
  try {
    const schoolIdParsed = schoolIdSchema.safeParse(req.params.id);

    if (!schoolIdParsed.success) {
      return res.status(400).json({ message: "Invalid school ID" });
    }

    const schoolId = schoolIdParsed.data;

    const existingSchool = await prisma.school.findFirst({
      where: {
        id: schoolId,
        isDeleted: false,
      },
    });

    if (!existingSchool) {
      return res.status(404).json({ message: "School does not exist" });
    }

    const levels = await prisma.level.findMany({
      where: {
        schoolId,
        isDeleted: false,
      },
    });

    res.status(200).json({ levels });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Uknown Error";
    console.error("Error fetching school level", message);
    res.status(500).json({ message });
  }
};

export const updateLevel = async (
  req: Request<{ id: string }, {}, unknown>,
  res: Response,
) => {
  try {
    const levelIdParsed = levelIdSchema.safeParse(req.params.id);
    const parsed = levelSchema.safeParse(req.body);

    if (!levelIdParsed.success) {
      return res.status(400).json({ message: "Invalid level ID" });
    }

    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    const levelId = levelIdParsed.data;
    const { name, schoolId, order } = parsed.data;

    const existingLevel = await prisma.level.findFirst({
      where: {
        id: levelId,
        isDeleted: false,
      },
    });

    if (!existingLevel) {
      return res.status(404).json({ message: "Level not found" });
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

    const existingOrder = await prisma.level.findFirst({
      where: {
        order,
        schoolId,
        isDeleted: false,
        NOT: { id: levelId },
      },
    });

    if (existingOrder) {
      return res.status(400).json({ message: "Level order already exists" });
    }

    const updatedLevel = await prisma.level.update({
      where: {
        id: levelId,
      },
      data: {
        name,
        order,
        schoolId,
      },
    });

    res
      .status(200)
      .json({ message: "Level updated successfully", updatedLevel });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Uknown Error";
    console.error("Error updating level", message);
    res.status(500).json({ message });
  }
};
export const deleteLevel = async (
  req: Request<{ id: string }, {}, unknown>,
  res: Response,
) => {
  try {
    const levelIdParsed = levelIdSchema.safeParse(req.params.id);

    if (!levelIdParsed.success) {
      return res.status(400).json({ message: "Invalid level ID" });
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

    await prisma.level.update({
      where: {
        id: levelId,
      },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });

    res.status(200).json({ message: "Level deleted successfully" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Uknown Error";
    console.error("Error deleting level", message);
    res.status(500).json({ message });
  }
};
