import bcrypt from "bcrypt";
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import jwt from "jsonwebtoken";
import type { Role } from "../generated/prisma/client.js";
import { z } from "zod";
import type { Request, Response } from "express";
import prismaPkg from "../generated/prisma/client.js";

const { PrismaClient } = prismaPkg;
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

const prisma = new PrismaClient({ adapter });

type TokenUser = {
  id: string;
  role: Role;
};

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  throw new Error("JWT_SECRET is not defined");
}
const generateAccessToken = (user: TokenUser) => {
  return jwt.sign({ userId: user.id, role: user.role }, jwtSecret, {
    expiresIn: "7d",
  });
};

//zod schemas
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const registerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string(),
});

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        schoolId: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    res.json(users);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error fetching users:", message);
    res.status(500).json({ message });
  }
};

export const registerUsers = async (
  req: Request<{}, {}, unknown>,
  res: Response,
) => {
  try {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
    }
    const { name, email, password, phone } = parsed.data;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
        role: "PARENT",
      },
    });
    res.status(201).json({ message: "User created successfully", user });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error creating user:", message);
    res.status(500).json({ message });
  }
};

export const loginUser = async (
  req: Request<{}, {}, unknown>,
  res: Response,
) => {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
    }
    const { email, password } = parsed.data;

    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const matchingPassword = await bcrypt.compare(password, user.password);

    if (!matchingPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const accessToken = generateAccessToken(user);

    res
      .status(200)
      .json({ message: "User logged in successfully", accessToken });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error logging in user:", message);
    res.status(500).json({ message });
  }
};
