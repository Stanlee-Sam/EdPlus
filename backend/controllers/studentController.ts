import { string, z } from "zod";
import type { Request, Response } from "express";
import { PrismaPg } from "@prisma/adapter-pg";
import prismaPkg from "../generated/prisma/client.js";

const PrismaClient =
  (prismaPkg as any).PrismaClient ?? (prismaPkg as any).default?.PrismaClient;
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

const prisma = new PrismaClient({ adapter });

const studentIdSchema = z.string().uuid();

const studentSchema = z.object({
  name: string(),
  admissionNumber: string(),
  classId: string().uuid(),
});

export const getStudents = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { schoolId: userSchoolId, role } = user;
    const querySchoolId = req.query.schoolId as string | undefined;
    const effectiveSchoolId =
      role === "SUPER_ADMIN" ? querySchoolId : userSchoolId;

    if (!effectiveSchoolId) {
      return res.status(400).json({ message: "schoolId is required" });
    }

    const students = await prisma.student.findMany({
      where: {
        isDeleted: false,
        schoolId: effectiveSchoolId,
      },
    });
    res.status(200).json(students);
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

    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { schoolId, role } = user;

    const student = await prisma.student.findFirst({
      where: {
        id: studentId,
        isDeleted: false,
        ...(role !== "SUPER_ADMIN" ? { schoolId: schoolId as string } : {}),
      },
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

    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { role, schoolId: userSchoolId } = user;

    // Only School Admins should be allowed to admit students
    if (role !== "SCHOOL_ADMIN") {
      return res.status(403).json({
        message: "Access denied. Only School Admins can admit students.",
      });
    }

    if (!userSchoolId) {
      return res
        .status(400)
        .json({ message: "User is not associated with any school." });
    }

    const { name, admissionNumber, classId } = parsed.data;

    const targetSchoolId = userSchoolId;

    const existingStudent = await prisma.student.findFirst({
      where: {
        admissionNumber,
        schoolId: targetSchoolId,
      },
    });

    if (existingStudent) {
      return res.status(409).json({
        message: "Admission number already exists in this school",
      });
    }

    const existingClass = await prisma.class.findFirst({
      where: { id: classId, schoolId: targetSchoolId, isDeleted: false },
    });
    if (!existingClass)
      return res
        .status(404)
        .json({ message: "Class does not exist in this school" });

    const newStudent = await prisma.student.create({
      data: {
        name,
        admissionNumber,
        classId,
        schoolId: targetSchoolId,
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
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { role, schoolId: userSchoolId } = user;

    if (role !== "SCHOOL_ADMIN") {
      return res.status(403).json({
        message:
          "Access denied. Only School Admins can update student records.",
      });
    }

    const studentIdParsed = studentIdSchema.safeParse(req.params.id);
    const parsed = studentSchema.safeParse(req.body);

    if (!studentIdParsed.success) {
      return res.status(400).json({ message: "Invalid student ID" });
    }

    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    const studentId = studentIdParsed.data;
    const { name, admissionNumber, classId } = parsed.data;

    const existingStudent = await prisma.student.findFirst({
      where: {
        id: studentId,
        schoolId: userSchoolId as string,
        isDeleted: false,
      },
    });

    if (!existingStudent) {
      return res.status(404).json({
        message: "Student does not exist in your school",
      });
    }

    const duplicate = await prisma.student.findFirst({
      where: {
        admissionNumber,
        schoolId: userSchoolId as string,
        id: { not: studentId },
      },
    });
    if (duplicate) {
      return res
        .status(409)
        .json({ message: "Admission number already exists in this school" });
    }

    const existingClass = await prisma.class.findFirst({
      where: {
        id: classId,
        schoolId: userSchoolId as string,
        isDeleted: false,
      },
    });
    if (!existingClass)
      return res
        .status(404)
        .json({ message: "Class does not exist in your school" });

    const updatedStudent = await prisma.student.update({
      where: {
        id: studentId,
      },
      data: {
        name,
        admissionNumber,
        classId,
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
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { role, schoolId: userSchoolId } = user;

    if (role !== "SCHOOL_ADMIN") {
      return res.status(403).json({
        message:
          "Access denied. Only School Admins can delete student records.",
      });
    }

    const studentIdParsed = studentIdSchema.safeParse(req.params.id);

    if (!studentIdParsed.success) {
      return res.status(400).json({ message: "Invalid Student ID" });
    }

    const studentId = studentIdParsed.data;

    const existingStudent = await prisma.student.findFirst({
      where: {
        id: studentId,
        schoolId: userSchoolId as string,
        isDeleted: false,
      },
    });

    if (!existingStudent) {
      return res.status(404).json({
        message: "Student does not exist in your school",
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
