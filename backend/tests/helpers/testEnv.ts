import fs from "fs";
import path from "path";
import dotenv from "dotenv";

export const loadTestEnv = () => {
  const envTestPath = path.join(process.cwd(), ".env.test");
  if (fs.existsSync(envTestPath)) {
    dotenv.config({ path: envTestPath });
  } else {
    dotenv.config();
  }

  const testDbUrl = process.env.DATABASE_URL_TEST;
  if (!testDbUrl) {
    return false;
  }

  process.env.DATABASE_URL = testDbUrl;
  process.env.NODE_ENV = "test";
  process.env.JWT_SECRET = process.env.JWT_SECRET ?? "test_secret";
  return true;
};
