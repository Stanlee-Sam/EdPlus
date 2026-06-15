import { z } from "zod";
import type { Request, Response } from "express";
import { PrismaPg } from "@prisma/adapter-pg";
import * as prismaPkg from "../generated/prisma/client.js";

const PrismaClient =
  (prismaPkg as any).PrismaClient ?? (prismaPkg as any).default?.PrismaClient;
const AttendanceStatus =
  (prismaPkg as any).AttendanceStatus ??
  (prismaPkg as any).default?.AttendanceStatus;
const Prisma = (prismaPkg as any).Prisma ?? (prismaPkg as any).default?.Prisma;
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

const prisma = new PrismaClient({ adapter });

const attendanceIdSchema = z.string().uuid();
const attendanceSchema = z.object({
  studentId: z.string().uuid(),
  date: z.coerce.date(),
  status: z.nativeEnum(AttendanceStatus),
  termId: z.string().uuid(),
});
const studentIdSchema = z.string().uuid();
const attendanceStatsQuerySchema = z.object({
  date: z.coerce.date().optional(),
  termId: z.string().uuid().optional(),
});

export const createAttendance = async (
  req: Request<{}, {}, unknown>,
  res: Response,
) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const { role, schoolId: userSchoolId, userId } = user;

    if (role !== 'SCHOOL_ADMIN' && role !== 'TEACHER') {
      return res.status(403).json({ message: "Access denied. Only School Admins and Teachers can record attendance." });
    }

    const parsed = attendanceSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    const { studentId, date, status, termId } =
      parsed.data;

    const existingAttendance = await prisma.attendance.findFirst({
      where: {
        studentId,
        date,
        termId,
        schoolId: userSchoolId as string,
      },
    });

    if (existingAttendance) {
      return res.status(409).json({
        message: "Attendance already exists for this student on this date",
      });
    }

    const newAttendance = await prisma.attendance.create({
      data: {
        studentId,
        date,
        status,
        recordedBy: userId,
        termId,
        schoolId: userSchoolId as string,
      },
      select: {
        id: true,
        studentId: true,
        date: true,
        status: true,
        recordedBy: true,
        termId: true,
        schoolId: true,
        createdAt: true,
        updatedAt: true,

        student: {
          select: {
            id: true,
            name: true,
            admissionNumber: true,
          },
        },
      },
    });

    res.status(201).json(newAttendance);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown Error";
    console.error("Error creating attendance", message);
    res.status(500).json({ message });
  }
};

export const updateAttendance = async (
  req: Request<{ id: string }, {}, unknown>,
  res: Response,
) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const { role, schoolId: userSchoolId } = user;

    if (role !== 'SCHOOL_ADMIN' && role !== 'TEACHER') {
      return res.status(403).json({ message: "Access denied. Only School Admins and Teachers can update attendance." });
    }

    const attendanceIdParsed = attendanceIdSchema.safeParse(req.params.id);
    const parsed = attendanceSchema.safeParse(req.body);

    if (!attendanceIdParsed.success) {
      return res.status(400).json({ message: "Invalid Attendance ID" });
    }

    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    const attendanceId = attendanceIdParsed.data;
    const { studentId, date, status, termId } =
      parsed.data;

    const existingAttendance = await prisma.attendance.findFirst({
      where: {
        id: attendanceId,
        schoolId: userSchoolId as string,
        isDeleted: false,
      },
    });

    if (!existingAttendance) {
      return res.status(404).json({ message: "Attendance record not found in your school" });
    }

    const updatedAttendance = await prisma.attendance.update({
      where: {
        id: attendanceId,
      },
      data: {
        studentId,
        date,
        status,
        termId,
      },
      select: {
        id: true,
        studentId: true,
        date: true,
        status: true,
        recordedBy: true,
        termId: true,
        schoolId: true,
        createdAt: true,
        updatedAt: true,

        student: {
          select: {
            id: true,
            name: true,
            admissionNumber: true,
          },
        },
      },
    });

    res.status(200).json(updatedAttendance);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error updating attendance", message);
    res.status(500).json({ message });
  }
};

export const deleteAttendance = async (
  req: Request<{ id: string }, {}, unknown>,
  res: Response,
) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const { role, schoolId: userSchoolId } = user;

    if (role !== 'SCHOOL_ADMIN') {
      return res.status(403).json({ message: "Access denied. Only School Admins can delete attendance records." });
    }

    const attendanceIdParsed = attendanceIdSchema.safeParse(req.params.id);

    if (!attendanceIdParsed.success) {
      return res.status(400).json({ message: "Invalid Attendance ID" });
    }

    const attendanceId = attendanceIdParsed.data;

    const existingAttendance = await prisma.attendance.findFirst({
      where: {
        id: attendanceId,
        schoolId: userSchoolId as string,
        isDeleted: false,
      },
    });

    if (!existingAttendance) {
      return res.status(404).json({ message: "Attendance record not found in your school" });
    }

    await prisma.attendance.update({
      where: {
        id: attendanceId,
      },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });

    res.status(200).json({ message: "Attendance deleted successfully" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown Error";
    console.error("Error deleting attendance", message);
    res.status(500).json({ message });
  }
};

export const getAttendance = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const { schoolId, role } = user;

    const attendanceRecords = await prisma.attendance.findMany({
      where: {
        isDeleted: false,
        ...(role !== 'SUPER_ADMIN' ? { schoolId: schoolId as string } : {}),
      },
      select: {
        id: true,
        studentId: true,
        date: true,
        status: true,
        recordedBy: true,
        termId: true,
        schoolId: true,
        createdAt: true,
        updatedAt: true,

        student: {
          select: {
            id: true,
            name: true,
            admissionNumber: true,
          },
        },
      },
    });

    res.status(200).json(attendanceRecords);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown Error";
    console.error("Error fetching attendance", message);
    res.status(500).json({ message });
  }
};

export const getAttendancePerStudent = async (
  req: Request<{ id: string }, {}, unknown>,
  res: Response,
) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const { schoolId, role } = user;

    const studentIdParsed = studentIdSchema.safeParse(req.params.id);

    if (!studentIdParsed.success) {
      return res.status(400).json({ message: "Invalid student ID" });
    }

    const studentId = studentIdParsed.data;

    const student = await prisma.student.findFirst({
      where: {
        id: studentId,
        isDeleted: false,
        ...(role !== 'SUPER_ADMIN' ? { schoolId: schoolId as string } : {}),
      },
    });

    if (!student) {
      return res.status(404).json({ message: "Student does not exist in your school" });
    }

    const studentAttendanceRecord = await prisma.attendance.findMany({
      where: {
        studentId,
        isDeleted: false,
        ...(role !== 'SUPER_ADMIN' ? { schoolId: schoolId as string } : {}),
      },
      select: {
        id: true,
        studentId: true,
        date: true,
        status: true,
        recordedBy: true,
        termId: true,
        schoolId: true,
        createdAt: true,
        updatedAt: true,

        student: {
          select: {
            id: true,
            name: true,
            admissionNumber: true,
          },
        },
      },
    });

    res.status(200).json(studentAttendanceRecord);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown Error";
    console.error("Error fetching attendance for this student", message);
    res.status(500).json({ message });
  }
};

export const getAttendancePercentage = async (req : Request, res : Response) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const { schoolId, role, userId } = user;
    const parsedQuery = attendanceStatsQuerySchema.safeParse(req.query);
    if (!parsedQuery.success) {
      return res.status(400).json({
        message: "Invalid query params",
        errors: parsedQuery.error.flatten().fieldErrors,
      });
    }

    const { date, termId } = parsedQuery.data;

    const targetDate = date ?? new Date();
    const startOfDay = new Date(targetDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(targetDate);
    endOfDay.setHours(23, 59, 59, 999);

    const baseWhere = {
      isDeleted: false,
      ...(role !== "SUPER_ADMIN" ? { schoolId: schoolId as string } : {}),
      ...(termId ? { termId } : {}),
      date: {
        gte: startOfDay,
        lte: endOfDay,
      },
    };

    let teacherStudentRelationFilter: { is: { classId: { in: string[] } } } | null = null;

    if (role === "TEACHER") {
      const assignedClasses = await prisma.teacherClassSubject.findMany({
        where: {
          teacherId: userId,
          schoolId: schoolId as string,
          isDeleted: false,
        },
        select: {
          classId: true,
        },
      });

      const classTeacherClasses = await prisma.class.findMany({
        where: {
          classTeacherId: userId,
          schoolId: schoolId as string,
          isDeleted: false,
        },
        select: {
          id: true,
        },
      });

      const classIds = [...new Set([
        ...assignedClasses.map((assignment : {classId: string}) => assignment.classId),
        ...classTeacherClasses.map((classRecord : { id: string}) => classRecord.id),
      ])];

      if (classIds.length === 0) {
        return res.status(200).json({
          presentStudents: 0,
          absentStudents: 0,
          totalRecords: 0,
          attendancePercentage: 0,
        });
      }

      teacherStudentRelationFilter = {
        is: {
          classId: {
            in: classIds,
          },
        },
      };
    }

    const presentStudents = await prisma.attendance.count({
      where : {
        ...baseWhere,
        ...(role === "TEACHER" && teacherStudentRelationFilter
          ? {
              student: teacherStudentRelationFilter,
            }
          : {}),
        status : {
          in : ['present', 'late']
        },
      }
    });

    const absentStudents = await prisma.attendance.count({
      where: {
        ...baseWhere,
        ...(role === "TEACHER" && teacherStudentRelationFilter
          ? {
              student: teacherStudentRelationFilter,
            }
          : {}),
        status: "absent",
      },
    });

    const totalRecords = presentStudents + absentStudents;
    const percentage = totalRecords === 0 ? 0 : (presentStudents / totalRecords) * 100;

    res.status(200).json({
      presentStudents,
      absentStudents,
      totalRecords,
      attendancePercentage: Number(percentage.toFixed(2)),
    });

  } catch(error) {
    const message = error instanceof Error ? error.message : "Unknown Error";
    console.error("Error fetching attendance percentage", message);
    res.status(500).json({ message });
  }
}

export const getAttendancePerClass = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const { schoolId, role, userId } = user;
    const parsedQuery = attendanceStatsQuerySchema.safeParse(req.query);
    if (!parsedQuery.success) {
      return res.status(400).json({
        message: "Invalid query params",
        errors: parsedQuery.error.flatten().fieldErrors,
      });
    }

    const { date, termId } = parsedQuery.data;

    const targetDate = date ?? new Date();
    const startOfDay = new Date(targetDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(targetDate);
    endOfDay.setHours(23, 59, 59, 999);

    let teacherStudentRelationFilter: { is: { classId: { in: string[] } } } | null = null;

    if (role === "TEACHER") {
      const assignedClasses = await prisma.teacherClassSubject.findMany({
        where: {
          teacherId: userId,
          schoolId: schoolId as string,
          isDeleted: false,
        },
        select: {
          classId: true,
        },
      });

      const classTeacherClasses = await prisma.class.findMany({
        where: {
          classTeacherId: userId,
          schoolId: schoolId as string,
          isDeleted: false,
        },
        select: {
          id: true,
        },
      });

      const classIds = [...new Set([
        ...assignedClasses.map((assignment: { classId: string }) => assignment.classId),
        ...classTeacherClasses.map((classRecord: { id: string }) => classRecord.id),
      ])];

      if (classIds.length === 0) {
        return res.status(200).json([]);
      }

      teacherStudentRelationFilter = {
        is: {
          classId: {
            in: classIds,
          },
        },
      };
    }

    const attendanceRecords = await prisma.attendance.findMany({
      where: {
        isDeleted: false,
        ...(role !== "SUPER_ADMIN" ? { schoolId: schoolId as string } : {}),
        ...(termId ? { termId } : {}),
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
        ...(role === "TEACHER" && teacherStudentRelationFilter ? {
          student: teacherStudentRelationFilter,
        } : {}),
      },
      select: {
        id: true,
        studentId: true,
        date: true,
        status: true,
        recordedBy: true,
        termId: true,
        schoolId: true,
        createdAt: true,
        updatedAt: true,

        student: {
          select: {
            id: true,
            name: true,
            admissionNumber: true,
            classId: true
          },
        },
      },
    });

    res.status(200).json(attendanceRecords);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown Error";
    console.error("Error fetching attendance per class", message);
    res.status(500).json({ message });
  }
};