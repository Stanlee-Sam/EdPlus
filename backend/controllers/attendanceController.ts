import { z } from "zod";
import type { Request, Response } from "express";
import { PrismaPg } from "@prisma/adapter-pg";
import prismaPkg, { Prisma } from "../generated/prisma/client.js";
import { AttendanceStatus } from "../generated/prisma/client.js";

const { PrismaClient } = prismaPkg;
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

const prisma = new PrismaClient({ adapter });

const attendanceIdSchema = z.string().uuid();
const attendanceSchema = z.object({
  studentId: z.string().uuid(),
  date: z.coerce.date(),
  status: z.nativeEnum(AttendanceStatus),
  recordedBy: z.string().uuid(),
  termId: z.string().uuid(),
  schoolId: z.string().uuid(),
});
const studentIdSchema = z.string().uuid();


export const createAttendance = async (
  req: Request<{}, {}, unknown>,
  res: Response,
) => {
  try {
    const parsed = attendanceSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    const { studentId, date, status, recordedBy, termId, schoolId } =
      parsed.data;

    const existingAttendance = await prisma.attendance.findFirst({
      where: {
        studentId,
        date,
        termId,
      },
    });

    if (existingAttendance) {
      return res.status(409).json({
        message: "Attendance already exists",
      });
    }

    const newAttendance = await prisma.attendance.create({
      data: {
        studentId,
        date,
        status,
        recordedBy,
        termId,
        schoolId,
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
    const { studentId, date, status, recordedBy, termId, schoolId } =
      parsed.data;

    const existingAttendance = await prisma.attendance.findFirst({
      where: {
        id: attendanceId,
        isDeleted: false,
      },
    });

    if (!existingAttendance) {
      return res.status(404).json({ message: "Attendance does not exist" });
    }

    const updatedAttendance = await prisma.attendance.update({
      where: {
        id: attendanceId,
      },
      data: {
        studentId,
        date,
        status,
        recordedBy,
        termId,
        schoolId,
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
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return res.status(409).json({
        message: "Attendance already exists for this student, date and term",
      });
    }

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
    const attendanceIdParsed = attendanceIdSchema.safeParse(req.params.id);

    if (!attendanceIdParsed.success) {
      return res.status(400).json({ message: "Invalid Attendance ID" });
    }

    const attendanceId = attendanceIdParsed.data;

    const existingAttendance = await prisma.attendance.findFirst({
      where: {
        id: attendanceId,
        isDeleted: false,
      },
    });

    if (!existingAttendance) {
      return res.status(404).json({ message: "Attendance does not exist" });
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

export const getAttendance = async (req : Request, res : Response) => {
    try {
        const attendanceRecords = await prisma.attendance.findMany({
            where: {
                isDeleted: false,
            },
            select : {
                id : true,
                studentId : true,
                date : true,
                status : true,
                recordedBy : true,
                termId : true,
                schoolId : true,
                createdAt : true,
                updatedAt : true,

                student : {
                    select : {
                        id : true,
                        name : true,
                        admissionNumber : true,
                    }
                }
            }
        })

        res.status(200).json(attendanceRecords)
        
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown Error";
        console.error("Error fetching attendance", message);
        res.status(500).json({ message });
    }
}

export const getAttendancePerStudent = async (req : Request< { id : string }, {}, unknown>, res : Response) => {
    try {

        const studentIdParsed = studentIdSchema.safeParse(req.params.id);

        if (!studentIdParsed.success) {
            return res.status(400).json({ message: "Invalid student ID" });
        }

        const studentId = studentIdParsed.data;

        const student = await prisma.student.findFirst({
            where : {
                id : studentId,
                isDeleted : false
            },

        })

        if (!student) {
            return res.status(404).json({ message: "Student does not exist" });
        }
        
        const studentAttendanceRecord = await prisma.attendance.findMany({
            where : {
                studentId,
                isDeleted : false
            },
            select : {
                id : true,
                studentId : true,
                date : true,
                status : true,
                recordedBy : true,
                termId : true,
                schoolId : true,
                createdAt : true,
                updatedAt : true,

                student : {
                    select : {
                        id : true,
                        name : true,
                        admissionNumber : true
                    }
                }

            }
        })

        res.status(200).json(studentAttendanceRecord)
        
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown Error";
        console.error("Error fetching attendance for this student", message);
        res.status(500).json({ message });
    }
}