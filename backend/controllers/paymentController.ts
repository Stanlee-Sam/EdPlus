import { z } from "zod";
import type { Request, Response } from "express";
import { PrismaPg } from "@prisma/adapter-pg";
import prismaPkg from "../generated/prisma/client.js";

const { PrismaClient } = prismaPkg;
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

const prisma = new PrismaClient({ adapter });

export const createPayment = async (req : Request, res : Response) => {}
export const getPayments = async (req : Request, res : Response) => {}
export const getPayment = async (req : Request, res : Response) => {}
export const getStudentPayment = async (req : Request, res : Response) => {}
export const getTermPayment = async (req : Request, res : Response) => {}
export const getSchoolPayment = async (req : Request, res : Response) => {}
export const updatePayment = async (req : Request, res : Response) => {}
export const deletePayment = async (req : Request, res : Response) => {}