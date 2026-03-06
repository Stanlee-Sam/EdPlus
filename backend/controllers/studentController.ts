import { string, z } from "zod";
import type { Request, Response } from "express";
import { PrismaPg } from "@prisma/adapter-pg";
import prismaPkg from "../generated/prisma/client.js";

const { PrismaClient } = prismaPkg;
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

const prisma = new PrismaClient({ adapter });

const studentIdSchema = z.string().uuid();

const studentSchema = z.object({
  name: string(),
  admissionNumber: string(),
  classId: string().uuid(),
  schoolId: string().uuid(),
});

export const getStudents = async (req: Request, res: Response) => {
  try {
    const students = await prisma.student.findMany({
      where: {
        isDeleted: false,
      },
    });
    res.status(200).json({ students });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Uknown Error";
    console.error("Error fetching students", message);
    res.status(500).json({ message });
  }
};
export const getSpecificStudent = async (
  req: Request<{ id: string }, {}, unknown>,
  res: Response,
) => {
  try {
    const studentIdParsed = studentIdSchema.safeParse(req.params.id);

    if (!studentIdParsed.success) {
      return res.status(400).json({ message: "Invalid student ID" });
    }
    const studentId = studentIdParsed.data;

    const student = await prisma.student.findFirst({
      where: { id: studentId, isDeleted: false },
    });

    if (!student) {
      return res.status(404).json({ message: "Student does not exist" });
    }

    res.status(200).json({ student });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown Error";
    console.error("Error fetching specific student", message);
    res.status(500).json({ message });
  }
};

export const createStudent = async (
  req: Request<{}, {}, unknown>,
  res: Response,
) => {
  try {
    const parsed = studentSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    const { name, admissionNumber, classId, schoolId } = parsed.data;

    const existingStudent = await prisma.student.findFirst({
      where: {
        admissionNumber,
      },
    });

    if (existingStudent) {
      return res.status(409).json({
        message: "Admission number already exists",
      });
    }

    const existingClass = await prisma.class.findFirst({
      where: { id: classId, isDeleted: false },
    });
    if (!existingClass)
      return res.status(404).json({ message: "Class does not exist" });

    const existingSchool = await prisma.school.findFirst({
      where: { id: schoolId, isDeleted: false },
    });
    if (!existingSchool)
      return res.status(404).json({ message: "School does not exist" });

    const newStudent = await prisma.student.create({
      data: {
        name,
        admissionNumber,
        classId,
        schoolId,
      },
    });

    res.status(201).json({
      message: "Student created successfully",
      newStudent,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown Error";
    console.error("Error creating student", message);
    res.status(500).json({ message });
  }
};

export const updateStudent = async (
  req: Request<{ id: string }, {}, unknown>,
  res: Response,
) => {
  try {
    const studentIdParsed = studentIdSchema.safeParse(req.params.id);
    const parsed = studentSchema.safeParse(req.body);

    if (!studentIdParsed.success) {
      return res.status(400).json({
        message: "Invalid student ID",
      });
    }

    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    const studentId = studentIdParsed.data;
    const { name, admissionNumber, classId, schoolId } = parsed.data;

    const existingStudent = await prisma.student.findFirst({
      where: {
        id: studentId,
        isDeleted: false,
      },
    });
    if (!existingStudent) {
      return res.status(404).json({
        message: "Student does not exist",
      });
    }

    const duplicate = await prisma.student.findFirst({
      where: { admissionNumber, id: { not: studentId } },
    });
    if (duplicate) {
      return res
        .status(409)
        .json({ message: "Admission number already exists" });
    }

    const existingClass = await prisma.class.findFirst({
      where: { id: classId, isDeleted: false },
    });
    if (!existingClass)
      return res.status(404).json({ message: "Class does not exist" });

    const existingSchool = await prisma.school.findFirst({
      where: { id: schoolId, isDeleted: false },
    });
    if (!existingSchool)
      return res.status(404).json({ message: "School does not exist" });

    const updatedStudent = await prisma.student.update({
      where: {
        id: studentId,
      },
      data: {
        name,
        admissionNumber,
        classId,
        schoolId,
      },
    });
    res.status(200).json({
      message: "Student updated successfully",
      updatedStudent,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown Error";
    console.error("Error updating student", message);
    res.status(500).json({ message });
  }
};

export const deleteStudent = async (
  req: Request<{ id: string }, {}, unknown>,
  res: Response,
) => {
  try {
    const studentIdParsed = studentIdSchema.safeParse(req.params.id);

    if (!studentIdParsed.success) {
      return res.status(400).json({
        message: "Invalid Student ID",
      });
    }

    const studentId = studentIdParsed.data;

    const existingStudent = await prisma.student.findFirst({
      where: { id: studentId, isDeleted: false },
    });

    if (!existingStudent) {
      return res.status(404).json({
        message: "Student does not exist",
      });
    }

    await prisma.student.update({
      where: { id: studentId },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });

    res.status(200).json({
      message: "Student deleted successfully",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown Error";
    console.error("Error deleting student", message);
    res.status(500).json({ message });
  }
};
