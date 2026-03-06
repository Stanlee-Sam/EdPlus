import { string, z } from "zod";
import type { Request, Response } from "express";
import { PrismaPg } from "@prisma/adapter-pg";
import prismaPkg from "../generated/prisma/client.js";

const { PrismaClient } = prismaPkg;
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

const prisma = new PrismaClient({ adapter });

const classIdSchema = z.string().uuid();
const classSchema = z.object({
  name: string(),
  classTeacherId: string().uuid(),
  schoolId: string().uuid(),
});

export const getClasses = async (req: Request, res: Response) => {
  try {
    const classes = await prisma.class.findMany({
      where: {
        isDeleted: false,
      },
    });
    res.status(200).json({ classes });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Uknown Error";
    console.error("Error fetching classes", message);
    res.status(500).json({ message });
  }
};

export const createClass = async (req: Request<{}, {}, unknown>, res: Response) => {
  try {
    const parsed = classSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
    }
    const { name, classTeacherId, schoolId } = parsed.data;

    const existingTeacher = await prisma.user.findFirst({
      where: { id: classTeacherId },
    });
    if (!existingTeacher) {
      return res.status(404).json({ message: "Teacher does not exist" });
    }

    const existingSchool = await prisma.school.findFirst({
      where: { id: schoolId, isDeleted: false },
    });
    if (!existingSchool) {
      return res.status(404).json({ message: "School does not exist" });
    }

    const newClass = await prisma.class.create({
      data: {
        name,
        classTeacherId,
        schoolId,
      },
    });
    res.status(201).json({ message: "Class created successfully", newClass });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Uknown Error";
    console.error("Error creating class", message);
    res.status(500).json({ message });
  }
};

export const updateClass = async (
  req: Request<{ id: string }, {}, unknown>,
  res: Response,
) => {
  try {
    const classIdParsed = classIdSchema.safeParse(req.params.id);
    const parsed = classSchema.safeParse(req.body);

    if (!classIdParsed.success) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    const classId = classIdParsed.data;
    const { name, classTeacherId, schoolId } = parsed.data;

    const existingClass = await prisma.class.findFirst({
      where: { id: classId, isDeleted: false },
    });

    if (!existingClass) {
      return res.status(404).json({ message: "Class does not exist" });
    }

    
    const existingTeacher = await prisma.user.findFirst({
      where: { id: classTeacherId},
    });
    if (!existingTeacher) {
      return res.status(404).json({ message: "Teacher does not exist" });
    }

    const existingSchool = await prisma.school.findFirst({
      where: { id: schoolId, isDeleted: false },
    });
    if (!existingSchool) {
      return res.status(404).json({ message: "School does not exist" });
    }

    const updatedClass = await prisma.class.update({
      where: { id: classId },
      data: {
        name,
        classTeacherId,
        schoolId,
      },
    });

    res
      .status(200)
      .json({ message: "Class updated successfully", updatedClass });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Uknown Error";
    console.error("Error updating class", message);
    res.status(500).json({ message });
  }
};

export const deleteClass = async (
  req: Request<{ id: string }, {}, unknown>,
  res: Response,
) => {
  try {
    const classIdParsed = classIdSchema.safeParse(req.params.id);
    if (!classIdParsed.success) {
      return res.status(400).json({
        message: "Invalid ID",
      });
    }

    const classId = classIdParsed.data;

    const existingClass = await prisma.class.findFirst({
      where: { id: classId, isDeleted: false },
    });

    if (!existingClass) {
      return res.status(404).json({ message: "Class does not exist" });
    }

    await prisma.class.update({
      where: { id: classId },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });

    res.status(200).json({ message: "Class deleted successfully" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Uknown Error";
    console.error("Error deleting class", message);
    res.status(500).json({ message });
  }
};
