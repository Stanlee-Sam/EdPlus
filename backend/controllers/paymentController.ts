import { coerce, z } from "zod";
import type { Request, Response } from "express";
import { PrismaPg } from "@prisma/adapter-pg";
import * as prismaPkg from "../generated/prisma/client.js";

const PrismaClient = (prismaPkg as any).PrismaClient ?? (prismaPkg as any).default?.PrismaClient;
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

const prisma = new PrismaClient({ adapter });

const paymentIdSchema = z.string().uuid();
const studentIdSchema = z.string().uuid();
const termIdSchema = z.string().uuid();
const schoolIdSchema = z.string().uuid();
const paymentSchema = z.object({
  amount: z.number().int(),
  date: coerce.date(),
  method: z.enum(["CASH", "MPESA", "BANK"]),
  studentId: z.string().uuid(),
  termId: z.string().uuid(),
});

export const createPayment = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const { role, schoolId: userSchoolId, userId } = user;

    if (role !== 'SCHOOL_ADMIN') {
      return res.status(403).json({ message: "Access denied. Only School Admins can record payments." });
    }

    const parsed = paymentSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    const { amount, date, method, studentId, termId } =
      parsed.data;

    const existingPayment = await prisma.payment.findFirst({
      where: {
        amount,
        date,
        studentId,
        termId,
        schoolId: userSchoolId as string,
        isDeleted: false,
      },
    });

    if (existingPayment) {
      return res.status(400).json({ message: "Payment already exists for this student on this date" });
    }

    const existingStudent = await prisma.student.findFirst({
      where: {
        id: studentId,
        schoolId: userSchoolId as string,
        isDeleted: false,
      },
    });

    if (!existingStudent) {
      return res.status(404).json({ message: "Student does not exist in your school" });
    }

    const existingTerm = await prisma.term.findFirst({
      where: {
        id: termId,
        schoolId: userSchoolId as string,
        isDeleted: false,
      },
    });

    if (!existingTerm) {
      return res.status(404).json({ message: "Term does not exist in your school" });
    }

    const payment = await prisma.payment.create({
      data: {
        amount,
        date,
        method,
        financeAdmin: {
          connect: { id: userId },
        },
        student: {
          connect: { id: studentId },
        },
        term: {
          connect: { id: termId },
        },
        school: {
          connect: { id: userSchoolId as string },
        },
      },
    });

    res.status(201).json(payment);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error creating payment", message);
    res.status(500).json({ message });
  }
};

export const getPayments = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const { schoolId, role } = user;

    const payments = await prisma.payment.findMany({
      where: {
        isDeleted: false,
        ...(role !== 'SUPER_ADMIN' ? { schoolId: schoolId as string } : {}),
      },
    });

    res.status(200).json(payments);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error fetching payments", message);
    res.status(500).json({ message });
  }
};

export const getPayment = async (
  req: Request<{ id: string }, {}, unknown>,
  res: Response,
) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const { schoolId, role } = user;
    const paymentIdParsed = paymentIdSchema.safeParse(req.params.id);

    if (!paymentIdParsed.success) {
      return res.status(400).json({
        message: "Validation failed",
      });
    }

    const paymentId = paymentIdParsed.data;

    const payment = await prisma.payment.findFirst({
      where: {
        id: paymentId,
        isDeleted: false,
        ...(role !== 'SUPER_ADMIN' ? { schoolId: schoolId as string } : {}),
      },
    });

    if (!payment) {
      return res.status(404).json({ message: "Payment does not exist in your school" });
    }

    res.status(200).json(payment);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error fetching payment", message);
    res.status(500).json({ message });
  }
};

export const getStudentPayment = async (
  req: Request<{ id: string }, {}, unknown>,
  res: Response,
) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const { schoolId, role } = user;
    const studentIdParsed = studentIdSchema.safeParse(req.params.id);

    if (!studentIdParsed.success) {
      return res.status(400).json({
        message: "Invalid student ID",
      });
    }

    const studentId = studentIdParsed.data;

    const existingStudent = await prisma.student.findFirst({
      where: {
        id: studentId,
        isDeleted: false,
        ...(role !== 'SUPER_ADMIN' ? { schoolId: schoolId as string } : {}),
      },
    });

    if (!existingStudent) {
      return res.status(404).json({ message: "Student does not exist in your school" });
    }

    const payments = await prisma.payment.findMany({
      where: {
        studentId,
        isDeleted: false,
        ...(role !== 'SUPER_ADMIN' ? { schoolId: schoolId as string } : {}),
      },
    });

    res.status(200).json(payments);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error fetching student payment", message);
    res.status(500).json({ message });
  }
};

export const getTermPayment = async (
  req: Request<{ id: string }, {}, unknown>,
  res: Response,
) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const { schoolId, role } = user;
    const termIdParsed = termIdSchema.safeParse(req.params.id);

    if (!termIdParsed.success) {
      return res.status(400).json({
        message: "Invalid term ID",
      });
    }

    const termId = termIdParsed.data;

    const existingTerm = await prisma.term.findFirst({
      where: {
        id: termId,
        isDeleted: false,
        ...(role !== 'SUPER_ADMIN' ? { schoolId: schoolId as string } : {}),
      },
    });

    if (!existingTerm) {
      return res.status(404).json({ message: "Term does not exist in your school" });
    }

    const payments = await prisma.payment.findMany({
      where: {
        termId,
        isDeleted: false,
        ...(role !== 'SUPER_ADMIN' ? { schoolId: schoolId as string } : {}),
      },
    });

    res.status(200).json(payments);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error fetching term payment", message);
    res.status(500).json({ message });
  }
};

export const getSchoolPayment = async (
  req: Request<{ id: string }, {}, unknown>,
  res: Response,
) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const { schoolId: userSchoolId, role } = user;
    const schoolIdParsed = schoolIdSchema.safeParse(req.params.id);

    if (!schoolIdParsed.success) {
      return res.status(400).json({
        message: "Invalid school ID",
      });
    }

    const targetSchoolId = role === 'SUPER_ADMIN' ? schoolIdParsed.data : userSchoolId;

    if (!targetSchoolId) {
       return res.status(400).json({ message: "School ID is required" });
    }

    const payments = await prisma.payment.findMany({
      where: {
        schoolId: targetSchoolId as string,
        isDeleted: false,
      },
    });

    res.status(200).json(payments);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error fetching school payment", message);
    res.status(500).json({ message });
  }
};

export const updatePayment = async (
  req: Request<{ id: string }, {}, unknown>,
  res: Response,
) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const { role, schoolId: userSchoolId } = user;

    if (role !== 'SCHOOL_ADMIN') {
      return res.status(403).json({ message: "Access denied. Only School Admins can update payments." });
    }

    const paymentIdParsed = paymentIdSchema.safeParse(req.params.id);
    const parsed = paymentSchema.safeParse(req.body);

    if (!paymentIdParsed.success) {
      return res.status(400).json({
        message: "Invalid payment ID",
      });
    }

    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    const paymentId = paymentIdParsed.data;
    const { amount, date, method, studentId, termId } =
      parsed.data;

    const existingPayment = await prisma.payment.findFirst({
      where: {
        id: paymentId,
        schoolId: userSchoolId as string,
        isDeleted: false,
      },
    });

    if (!existingPayment) {
      return res.status(404).json({
        message: "Payment does not exist in your school",
      });
    }

    const updatedPayment = await prisma.payment.update({
      where: {
        id: paymentId,
      },
      data: {
        amount,
        date,
        method,
        student: {
          connect: { id: studentId },
        },
        term: {
          connect: { id: termId },
        },
      },
    });

    res.status(200).json(updatedPayment);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error updating payment", message);
    res.status(500).json({ message });
  }
};

export const deletePayment = async (
  req: Request<{ id: string }, {}, unknown>,
  res: Response,
) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const { role, schoolId: userSchoolId } = user;

    if (role !== 'SCHOOL_ADMIN') {
      return res.status(403).json({ message: "Access denied. Only School Admins can delete payments." });
    }

    const paymentIdParsed = paymentIdSchema.safeParse(req.params.id);

    if (!paymentIdParsed.success) {
      return res.status(400).json({
        message: "Invalid payment ID",
      });
    }

    const paymentId = paymentIdParsed.data;

    const existingPayment = await prisma.payment.findFirst({
      where: {
        id: paymentId,
        schoolId: userSchoolId as string,
        isDeleted: false,
      },
    });

    if (!existingPayment) {
      return res.status(404).json({ message: "Payment does not exist in your school" });
    }

    await prisma.payment.update({
      where: {
        id: paymentId,
      },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });

    res.status(200).json({ message: "Payment deleted successfully" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error deleting payment", message);
    res.status(500).json({ message });
  }
};
