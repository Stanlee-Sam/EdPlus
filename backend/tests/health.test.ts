import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe("Health check route", () => {
  it("is defined in app.ts", () => {
    const filePath = path.join(__dirname, "..", "src", "app.ts");
    const content = fs.readFileSync(filePath, "utf-8");
    expect(content).toMatch(/app\.get\(["']\/health["']/);
  });
});
