import { PrismaPg } from "@prisma/adapter-pg";
import * as prismaPkg from "../../generated/prisma/client.js";

const PrismaClient =
  (prismaPkg as unknown as { PrismaClient: any }).PrismaClient ??
  (prismaPkg as unknown as { default?: { PrismaClient: any } }).default
    ?.PrismaClient;

if (!PrismaClient) {
  throw new Error("PrismaClient export not found");
}

export const createTestPrisma = () => {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  return new PrismaClient({ adapter });
};
