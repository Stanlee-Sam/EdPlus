import { coerce, z } from "zod";
import type { Request, Response } from "express";
import { PrismaPg } from "@prisma/adapter-pg";
import prismaPkg, { PaymentMethod } from "../generated/prisma/client.js";

const { PrismaClient } = prismaPkg;
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
  recordedBy: z.string().uuid(),
  studentId: z.string().uuid(),
  termId: z.string().uuid(),
  schoolId: z.string().uuid(),
});

export const createPayment = async (req: Request, res: Response) => {
  try {
    const parsed = paymentSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    const { amount, date, method, recordedBy, studentId, termId, schoolId } =
      parsed.data;

    const existingPayment = await prisma.payment.findFirst({
      where: {
        amount,
        date,
        studentId,
        termId,
        isDeleted: false,
      },
    });

    if (existingPayment) {
      return res.status(400).json({ message: "Payment already exists" });
    }

    const existingFinanceAdmin = await prisma.user.findFirst({
      where: {
        id: recordedBy,
        isDeleted: false,
      },
    });

    if (!existingFinanceAdmin) {
      return res.status(404).json({ message: "Finance admin does not exist" });
    }

    const existingStudent = await prisma.student.findFirst({
      where: {
        id: studentId,
        isDeleted: false,
      },
    });

    if (!existingStudent) {
      return res.status(404).json({ message: "Student does not exist" });
    }

    const existingTerm = await prisma.term.findFirst({
      where: {
        id: termId,
        isDeleted: false,
      },
    });

    if (!existingTerm) {
      return res.status(404).json({ message: "Term does not exist" });
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

    const payment = await prisma.payment.create({
      data: {
        amount,
        date,
        method,
        recordedBy,
        studentId,
        termId,
        schoolId,
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
    const payments = await prisma.payment.findMany({
      where: {
        isDeleted: false,
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
      },
    });

    if (!payment) {
      return res.status(404).json({ message: "Payment does not exist" });
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
      },
    });

    if (!existingStudent) {
      return res.status(404).json({ message: "Student does not exist" });
    }

    const payments = await prisma.payment.findMany({
      where: {
        studentId,
        isDeleted: false,
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
      },
    });

    if (!existingTerm) {
      return res.status(404).json({ message: "Term does not exist" });
    }

    const payments = await prisma.payment.findMany({
      where: {
        termId,
        isDeleted: false,
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
    const schoolIdParsed = schoolIdSchema.safeParse(req.params.id);

    if (!schoolIdParsed.success) {
      return res.status(400).json({
        message: "Invalid school ID",
      });
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

    const payments = await prisma.payment.findMany({
      where: {
        schoolId,
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
    const { amount, date, method, recordedBy, studentId, termId, schoolId } =
      parsed.data;

    const existingPayment = await prisma.payment.findFirst({
      where: {
        id: paymentId,
        isDeleted: false,
      },
    });

    if (!existingPayment) {
      return res.status(404).json({
        message: "Payment does not exist",
      });
    }

    const existingFinanceAdmin = await prisma.user.findFirst({
      where: {
        id: recordedBy,
        isDeleted: false,
      },
    });

    if (!existingFinanceAdmin) {
      return res.status(404).json({ message: "Finance admin does not exist" });
    }

    const existingStudent = await prisma.student.findFirst({
      where: {
        id: studentId,
        isDeleted: false,
      },
    });

    if (!existingStudent) {
      return res.status(404).json({ message: "Student does not exist" });
    }

    const existingTerm = await prisma.term.findFirst({
      where: {
        id: termId,
        isDeleted: false,
      },
    });

    if (!existingTerm) {
      return res.status(404).json({ message: "Term does not exist" });
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

    const updatedPayment = await prisma.payment.update({
      where: {
        id: paymentId,
      },
      data: {
        amount,
        date,
        method,
        recordedBy,
        studentId,
        termId,
        schoolId,
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
        isDeleted: false,
      },
    });

    if (!existingPayment) {
      return res.status(404).json({ message: "Payment does not exist" });
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
