import { z } from "zod";
import type { Request, Response } from "express";
import { PrismaPg } from "@prisma/adapter-pg";
import prismaPkg from "../generated/prisma/client.js";

const PrismaClient = (prismaPkg as any).PrismaClient ?? (prismaPkg as any).default?.PrismaClient;
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const linkSchema = z.object({
  parentId: z.string().uuid(),
  studentId: z.string().uuid(),
  relationshipType: z.string().min(2),
});

const studentIdSchema = z.string().uuid();

export const linkParentToStudent = async (
  req: Request<{}, {}, unknown>,
  res: Response,
) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const { schoolId: adminSchoolId } = user;
    if (!adminSchoolId) {
      return res.status(400).json({ message: "School admin is not linked to a school." });
    }

    const parsed = linkSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    const { parentId, studentId, relationshipType } = parsed.data;

    const parent = await prisma.user.findFirst({
      where: {
        id: parentId,
        role: "PARENT",
        schoolId: adminSchoolId,
      },
    });
    if (!parent) {
      return res.status(404).json({ message: "Parent not found in your school" });
    }

    const student = await prisma.student.findFirst({
      where: {
        id: studentId,
        schoolId: adminSchoolId,
        isDeleted: false,
      },
    });
    if (!student) {
      return res.status(404).json({ message: "Student not found in your school" });
    }

    const existingLink = await prisma.studentParent.findFirst({
      where: {
        parentId,
        studentId,
        isDeleted: false,
      },
    });
    if (existingLink) {
      return res.status(409).json({ message: "Parent is already linked to this student" });
    }

    const link = await prisma.studentParent.create({
      data: {
        parentId,
        studentId,
        relationshipType,
      },
      select: {
        id: true,
        relationshipType: true,
        createdAt: true,
        parent: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
        student: {
          select: {
            id: true,
            name: true,
            admissionNumber: true,
          },
        },
      },
    });

    return res.status(201).json({ message: "Parent linked to student successfully", link });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error linking parent to student:", message);
    return res.status(500).json({ message });
  }
};

export const getParentsByStudent = async (
  req: Request<{ studentId: string }>,
  res: Response,
) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const { schoolId: adminSchoolId } = user;
    if (!adminSchoolId) {
      return res.status(400).json({ message: "School admin is not linked to a school." });
    }

    const parsedStudentId = studentIdSchema.safeParse(req.params.studentId);
    if (!parsedStudentId.success) {
      return res.status(400).json({ message: "Invalid student ID" });
    }

    const studentId = parsedStudentId.data;
    const student = await prisma.student.findFirst({
      where: {
        id: studentId,
        schoolId: adminSchoolId,
        isDeleted: false,
      },
      select: {
        id: true,
        name: true,
        admissionNumber: true,
      },
    });
    if (!student) {
      return res.status(404).json({ message: "Student not found in your school" });
    }

    const parentLinks = await prisma.studentParent.findMany({
      where: {
        studentId,
        isDeleted: false,
      },
      select: {
        id: true,
        relationshipType: true,
        createdAt: true,
        parent: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    return res.status(200).json({
      student,
      parents: parentLinks,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error fetching parents by student:", message);
    return res.status(500).json({ message });
  }
};
