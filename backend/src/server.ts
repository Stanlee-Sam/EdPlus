import express, { Request, Response } from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import prismaPkg from "../generated/prisma/client.js";
import jwt from "jsonwebtoken";
import type { Role } from "../generated/prisma/client.js";

const { PrismaClient } = prismaPkg;

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

const app = express();
const prisma = new PrismaClient({ adapter });

app.use(express.json());
app.use(cors());

type Register = {
  name: string;
  email: string;
  password: string;
  phone: string;
};

type Login = {
  email: string;
  password: string;
};

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

//user routes
app.get("/users", async (req: Request, res: Response) => {
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
});

app.post(
  "/users/register",
  async (req: Request<{}, {}, Register>, res: Response) => {
    try {
      const { name, email, password, phone } = req.body;
      if (!name || !email || !password || !phone) {
        return res.status(400).json({ message: "All fields are required" });
      }
      const existingUser = await prisma.user.findUnique({
        where: { email: email },
      });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          name: name,
          email: email,
          password: hashedPassword,
          phone: phone,
          role: "PARENT",
        },
      });
      res.status(200).json({ message: "User created successfully", user });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      console.error("Error creating user:", message);
      res.status(500).json({ message });
    }
  },
);

app.post("/users/login", async (req: Request<{}, {}, Login>, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await prisma.user.findUnique({
      where: { email: email },
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
    res.status(500).json({ message: message });
  }
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
