import { z } from "zod";
import type { Request, Response } from "express";
import { PrismaPg } from "@prisma/adapter-pg";
import prismaPkg from "../generated/prisma/client.js";

const { PrismaClient } = prismaPkg;
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

const prisma = new PrismaClient({ adapter });

const schoolSchema = z.object({
  name: z.string(),
  location: z.string(),
  contactEmail: z.string().email(),
  contactPhone: z.string(),
});

const schoolIdSchema = z.string().uuid();

export const getSchools = async (req: Request, res: Response) => {
  try {
    const schools = await prisma.school.findMany({
      where : {isDeleted : false}
    });
    res.status(200).json({ schools });
  } catch (error: unknown) {
    console.error("Error fetching schools", error);
    res.status(500).json({ message: "Failed to fetch schools" });
  }
};

export const createSchool = async (
  req: Request<{}, {}, unknown>,
  res: Response,
) => {
  try {
    const parsed = schoolSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    const { name, location, contactEmail, contactPhone } = parsed.data;

    const newSchool = await prisma.school.create({
      data: {
        name,
        location,
        contactEmail,
        contactPhone,
      },
    });

    res.status(201).json({ message: "School created successfully", newSchool });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Uknown Error";
    console.error("Error creating school", message);
    res.status(500).json({ message });
  }
};

export const updateSchool = async (
  req: Request<{ id: string }, {}, unknown>,
  res: Response,
) => {
  try {
    const parsed = schoolSchema.safeParse(req.body);
    const schoolIdParsed = schoolIdSchema.safeParse(req.params.id);

    if (!schoolIdParsed.success) {
      return res.status(400).json({
        message: "Invalid ID",
      });
    }

    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    const schoolId = schoolIdParsed.data;
    const { name, location, contactEmail, contactPhone } = parsed.data;

    const existingSchool = await prisma.school.findFirst({
      where: { id: schoolId, isDeleted : false },
    });

    if (!existingSchool) {
      return res.status(404).json({ message: "School does not exist" });
    }

    const updatedSchool = await prisma.school.update({
      where: { id: schoolId },
      data: {
        name,
        location,
        contactEmail,
        contactPhone,
      },
    });

    res
      .status(200)
      .json({ message: "School updated successfully", updatedSchool });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Uknown error";
    console.error("Error updating school", message);
    res.status(500).json({ message });
  }
};

export const deleteSchool = async (
  req: Request<{ id: string }, {}, unknown>,
  res: Response,
) => {
  try {
    const schoolIdParsed = schoolIdSchema.safeParse(req.params.id);

    if (!schoolIdParsed.success) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const schoolId = schoolIdParsed.data;

    const existingSchool = await prisma.school.findFirst({
      where: { id: schoolId, isDeleted : false },
    });

    if (!existingSchool) {
      return res.status(404).json({ message: "School does not exist" });
    }

    await prisma.school.update({
      where: { id: schoolId },
      data : {
        isDeleted : true,
        deletedAt : new Date()
      }
    });

    res.status(200).json({ message: "School deleted successfully" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Uknown Error";
    console.error("Error deleting school", message);
    res.status(500).json({ message });
  }
};
