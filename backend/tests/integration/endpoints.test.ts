// @ts-nocheck
import request from "supertest";
import { jest } from "@jest/globals";
import { loadTestEnv } from "../helpers/testEnv.js";
import { createTestPrisma } from "../helpers/prisma.js";

jest.setTimeout(60000);

const hasTestDb = loadTestEnv();
const describeIf = hasTestDb ? describe : describe.skip;

type Ids = {
  schoolId: string;
  teacherId: string;
  financeId: string;
  announcerId: string;
  parentId: string;
  levelId: string;
  classId: string;
  studentId: string;
  subjectId: string;
  termId: string;
  tcsId: string;
  homeworkId: string;
  attendanceId: string;
  resultId: string;
  termSummaryId: string;
  feeStructureId: string;
  feeItemId: string;
  paymentId: string;
  announcementId: string;
  notificationId: string;
};

const resetDatabase = async (prisma: any) => {
  const dbUrl = process.env.DATABASE_URL ?? "";
  if (
    !dbUrl.toLowerCase().includes("test") &&
    process.env.ALLOW_DB_RESET !== "true"
  ) {
    throw new Error(
      "Refusing to reset DB. DATABASE_URL_TEST must include 'test' or set ALLOW_DB_RESET=true.",
    );
  }

  await prisma.$executeRawUnsafe(`
    DO $$ DECLARE r RECORD;
    BEGIN
      FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
        EXECUTE 'TRUNCATE TABLE ' || quote_ident(r.tablename) || ' CASCADE;';
      END LOOP;
    END $$;
  `);
};

const assertCreated = (res: request.Response, label: string) => {
  if (res.status !== 201) {
    throw new Error(
      `${label} failed: status=${res.status} body=${JSON.stringify(res.body)}`,
    );
  }
};

describeIf("Integration: endpoints", () => {
  let app: any;
  let prisma: any;
  const ids: Partial<Ids> = {};

  beforeAll(async () => {
    prisma = createTestPrisma();
    await resetDatabase(prisma);
    app = (await import("../../src/app.js")).default;

    // create school
    const schoolRes = await request(app).post("/school").send({
      name: "Test School",
      location: "Nairobi",
      contactEmail: "school@test.com",
      contactPhone: "0700000000",
    });
    assertCreated(schoolRes, "createSchool");
    ids.schoolId = schoolRes.body?.newSchool?.id ?? schoolRes.body?.id;

    // seed users (teacher, finance admin, announcer)
    const teacher = await prisma.user.create({
      data: {
        name: "Teacher One",
        email: "teacher@test.com",
        phone: "0711111111",
        password: "hashed",
        role: "TEACHER",
        schoolId: ids.schoolId,
      },
    });
    ids.teacherId = teacher.id;

    const finance = await prisma.user.create({
      data: {
        name: "Finance Admin",
        email: "finance@test.com",
        phone: "0722222222",
        password: "hashed",
        role: "SCHOOL_ADMIN",
        schoolId: ids.schoolId,
      },
    });
    ids.financeId = finance.id;

    const announcer = await prisma.user.create({
      data: {
        name: "Announcer",
        email: "announcer@test.com",
        phone: "0733333333",
        password: "hashed",
        role: "SCHOOL_ADMIN",
        schoolId: ids.schoolId,
      },
    });
    ids.announcerId = announcer.id;

    // register parent (via endpoint)
    const parentRes = await request(app).post("/users/register").send({
      name: "Parent One",
      email: "parent@test.com",
      password: "password1",
      phone: "0744444444",
    });
    assertCreated(parentRes, "registerUser");
    ids.parentId = parentRes.body?.user?.id;

    // create level
    const levelRes = await request(app).post("/level").send({
      name: "Grade 1",
      order: 1,
      schoolId: ids.schoolId,
    });
    assertCreated(levelRes, "createLevel");
    ids.levelId = levelRes.body?.newLevel?.id ?? levelRes.body?.id;

    // create class
    const classRes = await request(app).post("/class").send({
      name: "Grade 1A",
      classTeacherId: ids.teacherId,
      schoolId: ids.schoolId,
      levelId: ids.levelId,
    });
    assertCreated(classRes, "createClass");
    ids.classId = classRes.body?.newClass?.id ?? classRes.body?.id;

    // create student
    const studentRes = await request(app).post("/student").send({
      name: "Student One",
      admissionNumber: "ADM-001",
      classId: ids.classId,
      schoolId: ids.schoolId,
    });
    assertCreated(studentRes, "createStudent");
    ids.studentId = studentRes.body?.newStudent?.id ?? studentRes.body?.id;

    // create subject
    const subjectRes = await request(app).post("/subject").send({
      name: "Mathematics",
      schoolId: ids.schoolId,
    });
    assertCreated(subjectRes, "createSubject");
    ids.subjectId = subjectRes.body?.newSubject?.id ?? subjectRes.body?.id;

    // create term
    const termRes = await request(app).post("/term").send({
      name: "Term 1",
      startDate: new Date("2026-01-01").toISOString(),
      endDate: new Date("2026-03-31").toISOString(),
      schoolId: ids.schoolId,
    });
    assertCreated(termRes, "createTerm");
    ids.termId = termRes.body?.newTerm?.id ?? termRes.body?.id;

    // create teacher-class-subject
    const tcsRes = await request(app).post("/tcs").send({
      teacherId: ids.teacherId,
      classId: ids.classId,
      subjectId: ids.subjectId,
      schoolId: ids.schoolId,
    });
    assertCreated(tcsRes, "createTCS");
    ids.tcsId = tcsRes.body?.newTCS?.id ?? tcsRes.body?.id;

  });

  afterAll(async () => {
    await resetDatabase(prisma);
    await prisma.$disconnect();
  });

  it("users: get + login", async () => {
    const loginRes = await request(app).post("/users/login").send({
      email: "parent@test.com",
      password: "password1",
    });
    expect(loginRes.status).toBe(200);

    const usersRes = await request(app).get("/users");
    expect(usersRes.status).toBe(200);
  });

  it("school: get + update", async () => {
    const getRes = await request(app).get("/school");
    expect(getRes.status).toBe(200);

    const updateRes = await request(app).put(`/school/${ids.schoolId}`).send({
      name: "Test School Updated",
      location: "Nairobi",
      contactEmail: "school@test.com",
      contactPhone: "0700000000",
    });
    expect(updateRes.status).toBe(200);

  });

  it("level: get + update", async () => {
    const getRes = await request(app).get("/level");
    expect(getRes.status).toBe(200);

    const getSchoolRes = await request(app).get(
      `/level/school/${ids.schoolId}`,
    );
    expect(getSchoolRes.status).toBe(200);

    const updateRes = await request(app).put(`/level/${ids.levelId}`).send({
      name: "Grade 1 Updated",
      order: 1,
      schoolId: ids.schoolId,
    });
    expect(updateRes.status).toBe(200);
  });

  it("class: get + update", async () => {
    const getRes = await request(app).get("/class");
    expect(getRes.status).toBe(200);

    const updateRes = await request(app).put(`/class/${ids.classId}`).send({
      name: "Grade 1B",
      classTeacherId: ids.teacherId,
      schoolId: ids.schoolId,
      levelId: ids.levelId,
    });
    expect(updateRes.status).toBe(200);
  });

  it("student: get + update", async () => {
    const getRes = await request(app).get("/student");
    expect(getRes.status).toBe(200);

    const getOneRes = await request(app).get(`/student/${ids.studentId}`);
    expect(getOneRes.status).toBe(200);

    const updateRes = await request(app).put(`/student/${ids.studentId}`).send({
      name: "Student One Updated",
      admissionNumber: "ADM-001",
      classId: ids.classId,
      schoolId: ids.schoolId,
    });
    expect(updateRes.status).toBe(200);
  });

  it("subject: get + update", async () => {
    const getRes = await request(app).get("/subject");
    expect(getRes.status).toBe(200);

    const getOneRes = await request(app).get(`/subject/${ids.subjectId}`);
    expect(getOneRes.status).toBe(200);

    const updateRes = await request(app).put(`/subject/${ids.subjectId}`).send({
      name: "Mathematics Updated",
      schoolId: ids.schoolId,
    });
    expect(updateRes.status).toBe(200);
  });

  it("tcs: get + update", async () => {
    const getRes = await request(app).get("/tcs");
    expect(getRes.status).toBe(200);

    const getOneRes = await request(app).get(`/tcs/${ids.tcsId}`);
    expect(getOneRes.status).toBe(200);

    const updateRes = await request(app).put(`/tcs/${ids.tcsId}`).send({
      teacherId: ids.teacherId,
      classId: ids.classId,
      subjectId: ids.subjectId,
      schoolId: ids.schoolId,
    });
    expect(updateRes.status).toBe(200);
  });

  it("term: get + update", async () => {
    const getRes = await request(app).get("/term");
    expect(getRes.status).toBe(200);

    const getOneRes = await request(app).get(`/term/${ids.termId}`);
    expect(getOneRes.status).toBe(200);

    const updateRes = await request(app).put(`/term/${ids.termId}`).send({
      name: "Term 1 Updated",
      startDate: new Date("2026-01-01").toISOString(),
      endDate: new Date("2026-04-01").toISOString(),
      schoolId: ids.schoolId,
    });
    expect(updateRes.status).toBe(200);
  });

  it("homework: create + get + update + parent status", async () => {
    const createRes = await request(app).post("/homework").send({
      title: "Homework 1",
      description: "Solve problems",
      dueDate: new Date("2026-02-01").toISOString(),
      classId: ids.classId,
      teacherId: ids.teacherId,
      subjectId: ids.subjectId,
      termId: ids.termId,
      schoolId: ids.schoolId,
    });
    expect(createRes.status).toBe(201);
    ids.homeworkId = createRes.body?.newHomework?.id;

    const getRes = await request(app).get("/homework");
    expect(getRes.status).toBe(200);

    const updateRes = await request(app)
      .put(`/homework/${ids.homeworkId}`)
      .send({
        title: "Homework 1 Updated",
        description: "Solve problems",
        dueDate: new Date("2026-02-02").toISOString(),
        classId: ids.classId,
        teacherId: ids.teacherId,
        subjectId: ids.subjectId,
        termId: ids.termId,
        schoolId: ids.schoolId,
      });
    expect(updateRes.status).toBe(200);

    const parentRes = await request(app).put("/homework/status").send({
      status: "complete",
      homeworkId: ids.homeworkId,
      studentId: ids.studentId,
    });
    expect(parentRes.status).toBe(200);
  });

  it("attendance: create + get + update + per student", async () => {
    const createRes = await request(app).post("/attendance").send({
      studentId: ids.studentId,
      date: new Date("2026-02-10").toISOString(),
      status: "present",
      recordedBy: ids.teacherId,
      termId: ids.termId,
      schoolId: ids.schoolId,
    });
    expect(createRes.status).toBe(201);
    ids.attendanceId = createRes.body?.id;

    const getRes = await request(app).get("/attendance");
    expect(getRes.status).toBe(200);

    const getStudentRes = await request(app).get(
      `/attendance/${ids.studentId}`,
    );
    expect(getStudentRes.status).toBe(200);

    const updateRes = await request(app)
      .put(`/attendance/${ids.attendanceId}`)
      .send({
        studentId: ids.studentId,
        date: new Date("2026-02-10").toISOString(),
        status: "late",
        recordedBy: ids.teacherId,
        termId: ids.termId,
        schoolId: ids.schoolId,
      });
    expect(updateRes.status).toBe(200);
  });

  it("results: create + get + update + filters", async () => {
    const createRes = await request(app).post("/results").send({
      score: 80,
      grade: "A",
      subjectId: ids.subjectId,
      studentId: ids.studentId,
      termId: ids.termId,
      schoolId: ids.schoolId,
      teacherClassSubjectId: ids.tcsId,
    });
    expect(createRes.status).toBe(201);
    ids.resultId = createRes.body?.id;

    const getRes = await request(app).get("/results");
    expect(getRes.status).toBe(200);

    const getOneRes = await request(app).get(`/results/${ids.resultId}`);
    expect(getOneRes.status).toBe(200);

    const getStudentRes = await request(app).get(
      `/results/student/${ids.studentId}`,
    );
    expect(getStudentRes.status).toBe(200);

    const getClassRes = await request(app).get(
      `/results/class/${ids.classId}`,
    );
    expect(getClassRes.status).toBe(200);

    const getTermRes = await request(app).get(`/results/term/${ids.termId}`);
    expect(getTermRes.status).toBe(200);

    const updateRes = await request(app)
      .put(`/results/${ids.resultId}`)
      .send({
        score: 85,
        grade: "A",
        subjectId: ids.subjectId,
        studentId: ids.studentId,
        termId: ids.termId,
        schoolId: ids.schoolId,
        teacherClassSubjectId: ids.tcsId,
      });
    expect(updateRes.status).toBe(200);
  });

  it("term summary: create + get + update + filters", async () => {
    const createRes = await request(app).post("/termSummary").send({
      termId: ids.termId,
      studentId: ids.studentId,
      schoolId: ids.schoolId,
      totalScore: 80,
      meanScore: 80.0,
      meanGrade: "A",
    });
    expect(createRes.status).toBe(201);
    ids.termSummaryId = createRes.body?.id;

    const getRes = await request(app).get("/termSummary");
    expect(getRes.status).toBe(200);

    const getOneRes = await request(app).get(
      `/termSummary/${ids.termSummaryId}`,
    );
    expect(getOneRes.status).toBe(200);

    const getStudentRes = await request(app).get(
      `/termSummary/student/${ids.studentId}`,
    );
    expect(getStudentRes.status).toBe(200);

    const getTermRes = await request(app).get(
      `/termSummary/term/${ids.termId}`,
    );
    expect(getTermRes.status).toBe(200);

    const updateRes = await request(app)
      .put(`/termSummary/${ids.termSummaryId}`)
      .send({
        termId: ids.termId,
        studentId: ids.studentId,
        schoolId: ids.schoolId,
        totalScore: 85,
        meanScore: 85.0,
        meanGrade: "A",
      });
    expect(updateRes.status).toBe(200);
  });

  it("fee structure + fee item: create + get + update", async () => {
    const fsRes = await request(app).post("/feeStructure").send({
      amount: 10000,
      levelId: ids.levelId,
      termId: ids.termId,
      schoolId: ids.schoolId,
    });
    expect(fsRes.status).toBe(201);
    ids.feeStructureId = fsRes.body?.newFeeStructure?.id ?? fsRes.body?.id;

    const getFsRes = await request(app).get("/feeStructure");
    expect(getFsRes.status).toBe(200);

    const getFsLevelRes = await request(app).get(
      `/feeStructure/level/${ids.levelId}`,
    );
    expect(getFsLevelRes.status).toBe(200);

    const getFsTermRes = await request(app).get(
      `/feeStructure/term/${ids.termId}`,
    );
    expect(getFsTermRes.status).toBe(200);

    const getFsOneRes = await request(app).get(
      `/feeStructure/${ids.feeStructureId}`,
    );
    expect(getFsOneRes.status).toBe(200);

    const updateFsRes = await request(app)
      .put(`/feeStructure/${ids.feeStructureId}`)
      .send({
        amount: 12000,
        levelId: ids.levelId,
        termId: ids.termId,
        schoolId: ids.schoolId,
      });
    expect(updateFsRes.status).toBe(200);

    const fiRes = await request(app).post("/feeItem").send({
      name: "Tuition",
      amount: 6000,
      feeStructureId: ids.feeStructureId,
    });
    expect(fiRes.status).toBe(201);
    ids.feeItemId = fiRes.body?.newFeeItem?.id ?? fiRes.body?.id;

    const getFiRes = await request(app).get("/feeItem");
    expect(getFiRes.status).toBe(200);

    const getFiFsRes = await request(app).get(
      `/feeItem/feeStructure/${ids.feeStructureId}`,
    );
    expect(getFiFsRes.status).toBe(200);

    const getFiOneRes = await request(app).get(`/feeItem/${ids.feeItemId}`);
    expect(getFiOneRes.status).toBe(200);

    const updateFiRes = await request(app)
      .put(`/feeItem/${ids.feeItemId}`)
      .send({
        name: "Tuition Updated",
        amount: 6500,
        feeStructureId: ids.feeStructureId,
      });
    expect(updateFiRes.status).toBe(200);
  });

  it("payment: create + get + update", async () => {
    const createRes = await request(app).post("/payment").send({
      amount: 5000,
      date: new Date("2026-02-15").toISOString(),
      method: "CASH",
      recordedBy: ids.financeId,
      studentId: ids.studentId,
      termId: ids.termId,
      schoolId: ids.schoolId,
    });
    expect(createRes.status).toBe(201);
    ids.paymentId = createRes.body?.id;

    const getRes = await request(app).get("/payment");
    expect(getRes.status).toBe(200);

    const getOneRes = await request(app).get(`/payment/${ids.paymentId}`);
    expect(getOneRes.status).toBe(200);

    const getSchoolRes = await request(app).get(
      `/payment/school/${ids.schoolId}`,
    );
    expect(getSchoolRes.status).toBe(200);

    const getStudentRes = await request(app).get(
      `/payment/student/${ids.studentId}`,
    );
    expect(getStudentRes.status).toBe(200);

    const getTermRes = await request(app).get(`/payment/term/${ids.termId}`);
    expect(getTermRes.status).toBe(200);

    const updateRes = await request(app)
      .put(`/payment/${ids.paymentId}`)
      .send({
        amount: 5500,
        date: new Date("2026-02-16").toISOString(),
        method: "CASH",
        recordedBy: ids.financeId,
        studentId: ids.studentId,
        termId: ids.termId,
        schoolId: ids.schoolId,
      });
    expect(updateRes.status).toBe(200);
  });

  it("announcement: create + get + update", async () => {
    const createRes = await request(app).post("/announcement").send({
      title: "School Opening",
      content: "School opens next week.",
      createdBy: ids.announcerId,
      classId: ids.classId,
      schoolId: ids.schoolId,
    });
    expect(createRes.status).toBe(201);
    ids.announcementId =
      createRes.body?.newAnnouncement?.id ?? createRes.body?.id;

    const getRes = await request(app).get("/announcement");
    expect(getRes.status).toBe(200);

    const getOneRes = await request(app).get(
      `/announcement/${ids.announcementId}`,
    );
    expect(getOneRes.status).toBe(200);

    const getClassRes = await request(app).get(
      `/announcement/class/${ids.classId}`,
    );
    expect(getClassRes.status).toBe(200);

    const getSchoolRes = await request(app).get(
      `/announcement/school/${ids.schoolId}`,
    );
    expect(getSchoolRes.status).toBe(200);

    const updateRes = await request(app)
      .put(`/announcement/${ids.announcementId}`)
      .send({
        title: "School Opening Updated",
        content: "School opens on Monday.",
        createdBy: ids.announcerId,
        classId: ids.classId,
        schoolId: ids.schoolId,
      });
    expect(updateRes.status).toBe(200);
  });

  it("notification: create + get + update + mark read", async () => {
    const createRes = await request(app).post("/notification").send({
      message: "Welcome",
      userId: ids.parentId,
      schoolId: ids.schoolId,
    });
    expect(createRes.status).toBe(201);
    ids.notificationId =
      createRes.body?.newNotification?.id ?? createRes.body?.id;

    const getRes = await request(app).get("/notification");
    expect(getRes.status).toBe(200);

    const getOneRes = await request(app).get(
      `/notification/${ids.notificationId}`,
    );
    expect(getOneRes.status).toBe(200);

    const getUserRes = await request(app).get(
      `/notification/user/${ids.parentId}`,
    );
    expect(getUserRes.status).toBe(200);

    const updateRes = await request(app)
      .put(`/notification/${ids.notificationId}`)
      .send({
        message: "Welcome Updated",
        isRead: false,
        userId: ids.parentId,
        schoolId: ids.schoolId,
      });
    expect(updateRes.status).toBe(200);

    const markRes = await request(app)
      .put(`/notification/read/${ids.notificationId}`)
      .send({
        isRead: true,
      });
    expect(markRes.status).toBe(200);
  });

  it("delete endpoints", async () => {
    const delResult = await request(app).delete(`/results/${ids.resultId}`);
    expect(delResult.status).toBe(200);

    const delTermSummary = await request(app).delete(
      `/termSummary/${ids.termSummaryId}`,
    );
    expect(delTermSummary.status).toBe(200);

    const delHomework = await request(app).delete(`/homework/${ids.homeworkId}`);
    expect(delHomework.status).toBe(200);

    const delAttendance = await request(app).delete(
      `/attendance/${ids.attendanceId}`,
    );
    expect(delAttendance.status).toBe(200);

    const delFeeItem = await request(app).delete(`/feeItem/${ids.feeItemId}`);
    expect(delFeeItem.status).toBe(200);

    const delFeeStructure = await request(app).delete(
      `/feeStructure/${ids.feeStructureId}`,
    );
    expect(delFeeStructure.status).toBe(200);

    const delPayment = await request(app).delete(`/payment/${ids.paymentId}`);
    expect(delPayment.status).toBe(200);

    const delAnnouncement = await request(app).delete(
      `/announcement/${ids.announcementId}`,
    );
    expect(delAnnouncement.status).toBe(200);

    const delNotification = await request(app).delete(
      `/notification/${ids.notificationId}`,
    );
    expect(delNotification.status).toBe(200);

    const delStudent = await request(app).delete(`/student/${ids.studentId}`);
    expect(delStudent.status).toBe(200);

    const delClass = await request(app).delete(`/class/${ids.classId}`);
    expect(delClass.status).toBe(200);

    const delLevel = await request(app).delete(`/level/${ids.levelId}`);
    expect(delLevel.status).toBe(200);

    const delSubject = await request(app).delete(`/subject/${ids.subjectId}`);
    expect(delSubject.status).toBe(200);

    const delTcs = await request(app).delete(`/tcs/${ids.tcsId}`);
    expect(delTcs.status).toBe(200);

    const delTerm = await request(app).delete(`/term/${ids.termId}`);
    expect(delTerm.status).toBe(200);

    const delSchool = await request(app).delete(`/school/${ids.schoolId}`);
    expect(delSchool.status).toBe(200);
  });
});
