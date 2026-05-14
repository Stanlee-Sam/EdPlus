import bcrypt from "bcrypt";
import "dotenv/config";
import jwt from "jsonwebtoken";
import type { Role } from "../generated/prisma/client.js";
import { z } from "zod";
import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

type TokenUser = {
  id: string;
  role: Role;
  schoolId?: string | null;
};

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  throw new Error("JWT_SECRET is not defined");
}
const generateAccessToken = (user: TokenUser) => {
  return jwt.sign({ userId: user.id, role: user.role, schoolId: user.schoolId }, jwtSecret, {
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

const userIdSchema = z.string().uuid();
const updateRoleSchema = z.object({
  userId: z.string(),
  role: z.enum(["SUPER_ADMIN", "SCHOOL_ADMIN", "TEACHER", "PARENT"]),
});

export const getUsers = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const { schoolId: userSchoolId, role: userRole } = user;

    if (userRole !== 'SUPER_ADMIN' && userRole !== 'SCHOOL_ADMIN') {
        return res.status(403).json({ message: "Access denied." });
    }

    const { schoolId: querySchoolId, role: queryRole } = req.query;
    
    // If SCHOOL_ADMIN, they can only see users in their school
    const effectiveSchoolId = userRole === 'SUPER_ADMIN' ? (querySchoolId as string) : (userSchoolId as string);

    const users = await prisma.user.findMany({
      where: {
        ...(effectiveSchoolId ? { schoolId: effectiveSchoolId } : {}),
        ...(queryRole ? { role: queryRole as any } : {}),
      },
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

const schoolAdminSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string(),
  schoolName: z.string(),
  schoolLocation: z.string(),
  schoolContactEmail: z.string().email(),
  schoolContactPhone: z.string(),
});

export const registerSchoolAdmin = async (
  req: Request<{}, {}, unknown>,
  res: Response,
) => {
  try {
    const parsed = schoolAdminSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
    }
    const { name, email, password, phone, schoolName, schoolLocation, schoolContactEmail, schoolContactPhone } = parsed.data;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user and school in a transaction
    const result = await prisma.$transaction(async (tx) => {
      const school = await tx.school.create({
        data: {
          name: schoolName,
          location: schoolLocation,
          contactEmail: schoolContactEmail,
          contactPhone: schoolContactPhone,
        },
      });

      const user = await tx.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          phone,
          role: "SCHOOL_ADMIN",
          schoolId: school.id,
        },
        include: {
          school: true,
        },
      });

      return { user, school };
    });

    res.status(201).json({ message: "School admin created successfully", user: result.user });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error creating school admin:", message);
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

export const updateUserRole = async (req: Request<{id: string}, {}, unknown>, res: Response) => {
  try {
    const adminUser = req.user;
    if (!adminUser) return res.status(401).json({ message: "Unauthorized" });

    const { role: adminRole, schoolId: adminSchoolId } = adminUser;

    if (adminRole !== 'SUPER_ADMIN' && adminRole !== 'SCHOOL_ADMIN') {
        return res.status(403).json({ message: "Access denied." });
    }

    const parsed = updateRoleSchema.safeParse(req.body);
    const userIdParsed = userIdSchema.safeParse(req.params.id);

    if(!parsed.success){
      return res.status(400).json({
        message : "Validation failed",
        errors : parsed.error.flatten().fieldErrors,
      })
    }
    
    if(!userIdParsed.success){
      return res.status(400).json({
        message : "Invalid User ID",
      })
    }
    
    const {userId, role} = parsed.data;

    // Check if target user exists
    const targetUser = await prisma.user.findUnique({
      where : {id : userId}
    });
    if(!targetUser){
      return res.status(404).json({message : "User not found"})
    }

    // If SCHOOL_ADMIN, they can only update users in their school
    if (adminRole === 'SCHOOL_ADMIN' && targetUser.schoolId !== adminSchoolId) {
        return res.status(403).json({ message: "Access denied. You can only update users in your school." });
    }

    const updatedUser = await prisma.user.update({
      where : {id : userId},
      data : {role}
    })
    res.status(200).json({message : "User role updated successfully", updatedUser})
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error updating user role:", message);
    res.status(500).json({ message });
  }
}