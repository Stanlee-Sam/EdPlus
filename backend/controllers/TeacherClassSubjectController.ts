import { z } from "zod";
import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const teacherClassSubjectIdSchema = z.string().uuid();
const teacherClassSubjectSchema = z.object({
  teacherId: z.string().uuid(),
  classId: z.string().uuid(),
  subjectId: z.string().uuid(),
});
const teacherIdSchema = z.string().uuid();

export const getTCS = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const { schoolId, role } = user;

    const TCSs = await prisma.teacherClassSubject.findMany({
      where: {
        isDeleted: false,
        ...(role !== "SUPER_ADMIN" ? { schoolId: schoolId as string } : {}),
      },
    });
    res.status(200).json(TCSs);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error fetching TCS", message);
    res.status(500).json({ message });
  }
};

export const getSpecificTCS = async (
  req: Request<{ id: string }, {}, unknown>,
  res: Response,
) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const { schoolId, role } = user;
    const TCSIdParsed = teacherClassSubjectIdSchema.safeParse(req.params.id);

    if (!TCSIdParsed.success) {
      return res.status(400).json({ message: "Invalid TCS ID" });
    }

    const TCSId = TCSIdParsed.data;

    const TCS = await prisma.teacherClassSubject.findFirst({
      where: {
        id: TCSId,
        isDeleted: false,
        ...(role !== "SUPER_ADMIN" ? { schoolId: schoolId as string } : {}),
      },
    });

    if (!TCS) {
      return res
        .status(404)
        .json({ message: "TCS does not exist in your school" });
    }

    res.status(200).json(TCS);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error fetching specific TCS", message);
    res.status(500).json({ message });
  }
};

export const createTCS = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const { role, schoolId: userSchoolId } = user;

    if (role !== "SCHOOL_ADMIN") {
      return res
        .status(403)
        .json({
          message: "Access denied. Only School Admins can manage TCS records.",
        });
    }

    const parsed = teacherClassSubjectSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    const { teacherId, classId, subjectId } = parsed.data;

    const existingTCS = await prisma.teacherClassSubject.findFirst({
      where: {
        teacherId,
        classId,
        subjectId,
        schoolId: userSchoolId as string,
        isDeleted: false,
      },
    });

    if (existingTCS) {
      return res.status(409).json({
        message: "This assignment already exists in your school",
      });
    }

    const existingClass = await prisma.class.findFirst({
      where: {
        id: classId,
        schoolId: userSchoolId as string,
        isDeleted: false,
      },
    });

    if (!existingClass) {
      return res.status(404).json({
        message: "Class does not exist in your school",
      });
    }

    const existingSubject = await prisma.subject.findFirst({
      where: {
        id: subjectId,
        schoolId: userSchoolId as string,
        isDeleted: false,
      },
    });

    if (!existingSubject) {
      return res.status(404).json({
        message: "Subject does not exist in your school",
      });
    }

    const existingTeacher = await prisma.user.findFirst({
      where: {
        id: teacherId,
        schoolId: userSchoolId as string,
      },
    });

    if (!existingTeacher) {
      return res.status(404).json({
        message: "Teacher does not exist in your school",
      });
    }

    const newTCS = await prisma.teacherClassSubject.create({
      data: {
        teacherId,
        classId,
        subjectId,
        schoolId: userSchoolId as string,
      },
    });

    res.status(201).json(newTCS);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error creating TCS", message);
    res.status(500).json({ message });
  }
};

export const updateTCS = async (
  req: Request<{ id: string }, {}, unknown>,
  res: Response,
) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const { role, schoolId: userSchoolId } = user;

    if (role !== "SCHOOL_ADMIN") {
      return res
        .status(403)
        .json({
          message: "Access denied. Only School Admins can update TCS records.",
        });
    }

    const TCSIdParsed = teacherClassSubjectIdSchema.safeParse(req.params.id);
    const parsed = teacherClassSubjectSchema.safeParse(req.body);

    if (!TCSIdParsed.success) {
      return res.status(400).json({ message: "Invalid TCS ID" });
    }

    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    const { teacherId, classId, subjectId } = parsed.data;
    const TCSId = TCSIdParsed.data;

    const existingTCS = await prisma.teacherClassSubject.findFirst({
      where: {
        id: TCSId,
        schoolId: userSchoolId as string,
        isDeleted: false,
      },
    });

    if (!existingTCS) {
      return res
        .status(404)
        .json({ message: "TCS record not found in your school" });
    }

    const updatedTCS = await prisma.teacherClassSubject.update({
      where: {
        id: TCSId,
      },
      data: {
        teacherId,
        classId,
        subjectId,
      },
    });

    res.status(200).json(updatedTCS);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error updating TCS", message);
    res.status(500).json({ message });
  }
};

export const deleteTCS = async (
  req: Request<{ id: string }, {}, unknown>,
  res: Response,
) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const { role, schoolId: userSchoolId } = user;

    if (role !== "SCHOOL_ADMIN") {
      return res
        .status(403)
        .json({
          message: "Access denied. Only School Admins can delete TCS records.",
        });
    }

    const TCSIdParsed = teacherClassSubjectIdSchema.safeParse(req.params.id);

    if (!TCSIdParsed.success) {
      return res.status(400).json({ message: "Invalid TCS ID" });
    }

    const TCSId = TCSIdParsed.data;

    const existingTCS = await prisma.teacherClassSubject.findFirst({
      where: {
        id: TCSId,
        schoolId: userSchoolId as string,
        isDeleted: false,
      },
    });

    if (!existingTCS) {
      return res
        .status(404)
        .json({ message: "TCS record not found in your school" });
    }

    await prisma.teacherClassSubject.update({
      where: {
        id: TCSId,
      },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });

    res.status(200).json({ message: "TCS deleted successfully" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error deleting TCS", message);
    res.status(500).json({ message });
  }
};

export const getAllTeacherStudents = async (
  req: Request<{ id: string }, {}, unknown>,
  res: Response,
) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { role, schoolId: userSchoolId } = user;

    if (role !== "TEACHER") {
      return res.status(403).json({
        message: "Access denied. Only Teachers can view their students.",
      });
    }

    if (!userSchoolId) {
      return res
        .status(400)
        .json({ message: "User is not associated with any school." });
    }

    const teacherIdParsed = teacherIdSchema.safeParse(req.params.id);

    if (!teacherIdParsed.success) {
      return res.status(400).json({ message: "Invalid teacher ID" });
    }

    const teacherId = teacherIdParsed.data;

    const teacher = await prisma.user.findFirst({
      where: {
        id: teacherId,
        role: "TEACHER",
      },
    });

    if (!teacher) {
      return res.status(404).json({ message: "Teacher does not exist" });
    }

    // const students = await prisma.student.findMany({
    //   where: {
    //     teacherId: teacherId,
    //     isDeleted: false,
    //   },
    // });

    const assignments = await prisma.teacherClassSubject.findMany({
      where: {
        teacherId: teacherId,
        isDeleted: false,
      },
      select: {
        classId: true,
      },
    });

    const classIds = assignments.map((a) => a.classId);

    const studentsCount = await prisma.student.count({
      where: {
        classId: {
          in: classIds,
        },
        isDeleted: false,
      },
    });

    res.status(200).json(studentsCount);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown Error";
    console.error("Error fetching teacher students", message);
    res.status(500).json({ message });
  }
};
