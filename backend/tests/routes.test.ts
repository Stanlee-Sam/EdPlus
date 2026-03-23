import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const extractRoutes = (filePath: string) => {
  const content = fs.readFileSync(filePath, "utf-8");
  const regex = /router\.(get|post|put|delete|patch)\(\s*["']([^"']+)["']/gi;
  const routes: string[] = [];
  let match: RegExpExecArray | null;
  while ((match = regex.exec(content)) !== null) {
    routes.push(`${match[1].toUpperCase()} ${match[2]}`);
  }
  return routes.sort();
};

const expectRoutes = (relativePath: string, expected: string[]) => {
  const filePath = path.join(__dirname, "..", relativePath);
  const actual = extractRoutes(filePath);
  expect(actual).toEqual(expected.sort());
};

describe("Route definitions", () => {
  it("users routes", () => {
    expectRoutes("routes/usersRoutes.ts", [
      "GET /",
      "POST /register",
      "POST /login",
    ]);
  });

  it("school routes", () => {
    expectRoutes("routes/schooleRoutes.ts", [
      "POST /",
      "GET /",
      "PUT /:id",
      "DELETE /:id",
    ]);
  });

  it("class routes", () => {
    expectRoutes("routes/classRoutes.ts", [
      "GET /",
      "POST /",
      "PUT /:id",
      "DELETE /:id",
    ]);
  });

  it("student routes", () => {
    expectRoutes("routes/studentRoutes.ts", [
      "GET /",
      "GET /:id",
      "POST /",
      "PUT /:id",
      "DELETE /:id",
    ]);
  });

  it("attendance routes", () => {
    expectRoutes("routes/attendanceRoute.ts", [
      "GET /",
      "GET /:id",
      "POST /",
      "PUT /:id",
      "DELETE /:id",
    ]);
  });

  it("homework routes", () => {
    expectRoutes("routes/homeworkRoute.ts", [
      "GET /",
      "POST /",
      "PUT /:id",
      "PUT /status",
      "DELETE /:id",
    ]);
  });

  it("subject routes", () => {
    expectRoutes("routes/subjectRoutes.ts", [
      "GET /",
      "GET /:id",
      "POST /",
      "PUT /:id",
      "DELETE /:id",
    ]);
  });

  it("teacher-class-subject routes", () => {
    expectRoutes("routes/TeacherClassSubjectRoute.ts", [
      "GET /",
      "GET /:id",
      "POST /",
      "PUT /:id",
      "DELETE /:id",
    ]);
  });

  it("results routes", () => {
    expectRoutes("routes/resultsRoute.ts", [
      "GET /",
      "GET /:id",
      "GET /class/:id",
      "GET /student/:id",
      "GET /term/:id",
      "POST /",
      "PUT /:id",
      "DELETE /:id",
    ]);
  });

  it("term routes", () => {
    expectRoutes("routes/termRoutes.ts", [
      "GET /",
      "GET /:id",
      "POST /",
      "PUT /:id",
      "DELETE /:id",
    ]);
  });

  it("term summary routes", () => {
    expectRoutes("routes/termSummaryRoutes.ts", [
      "GET /",
      "GET /student/:id",
      "GET /term/:id",
      "GET /:id",
      "POST /",
      "PUT /:id",
      "DELETE /:id",
    ]);
  });

  it("announcement routes", () => {
    expectRoutes("routes/announcementRoutes.ts", [
      "GET /",
      "GET /class/:id",
      "GET /school/:id",
      "GET /:id",
      "POST /",
      "PUT /:id",
      "DELETE /:id",
    ]);
  });

  it("notification routes", () => {
    expectRoutes("routes/notificationRoute.ts", [
      "GET /",
      "GET /user/:id",
      "GET /:id",
      "POST /",
      "PUT /:id",
      "PUT /read/:id",
      "DELETE /:id",
    ]);
  });

  it("level routes", () => {
    expectRoutes("routes/levelRoutes.ts", [
      "GET /",
      "GET /school/:id",
      "GET /:id",
      "POST /",
      "PUT /:id",
      "DELETE /:id",
    ]);
  });

  it("fee structure routes", () => {
    expectRoutes("routes/feeStructureRoutes.ts", [
      "GET /",
      "GET /level/:id",
      "GET /term/:id",
      "GET /:id",
      "POST /",
      "PUT /:id",
      "DELETE /:id",
    ]);
  });

  it("fee item routes", () => {
    expectRoutes("routes/feeItemRoutes.ts", [
      "GET /",
      "GET /feeStructure/:id",
      "GET /:id",
      "POST /",
      "PUT /:id",
      "DELETE /:id",
    ]);
  });

  it("payment routes", () => {
    expectRoutes("routes/paymentRoutes.ts", [
      "GET /",
      "GET /school/:id",
      "GET /student/:id",
      "GET /term/:id",
      "GET /:id",
      "POST /",
      "PUT /:id",
      "DELETE /:id",
    ]);
  });
});
