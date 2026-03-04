import express, { Request, Response } from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import prismaPkg from "../generated/prisma/client.js";
import userRoute from '../routes/usersRoutes.js'
import jwt from "jsonwebtoken";
import type { Role } from "../generated/prisma/client.js";
import { z } from "zod";

const { PrismaClient } = prismaPkg;

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

const app = express();
const prisma = new PrismaClient({ adapter });

app.use(express.json());
app.use(cors());


//user routes
app.use("/users", userRoute);


app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
