import { z } from "zod";
import type { Request, Response } from "express";
import { PrismaPg } from "@prisma/adapter-pg";
import * as prismaPkg from "../generated/prisma/client.js";

const PrismaClient = (prismaPkg as any).PrismaClient ?? (prismaPkg as any).default?.PrismaClient;
const HomeworkStatus =
  (prismaPkg as any).HomeworkStatus ??
  (prismaPkg as any).default?.HomeworkStatus;
const Prisma =
  (prismaPkg as any).Prisma ?? (prismaPkg as any).default?.Prisma;
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

const prisma = new PrismaClient({ adapter });

const homeworkIdSchema = z.string().uuid();
const homeworkSchema = z.object({
  title: z.string(),
  description: z.string(),
  dueDate: z.coerce.date(),
  classId: z.string().uuid(),
  subjectId: z.string().uuid(),
  termId: z.string().uuid(),
});
const parentHomeworkSchema = z.object({
  status: z.literal(HomeworkStatus.complete),
  homeworkId: z.string().uuid(),
  studentId: z.string().uuid(),
});

export const getHomework = async (req: Request, res: Response) => {
  try {
   const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { role, schoolId: userSchoolId, userId: teacherId } = user;

    if (role !== "TEACHER") {
      return res.status(403).json({
        message: "Access denied. Only Teachers can view their students.",
      });
    }

    if (!userSchoolId) {
      return res
        .status(400)
        .json({ message: "User is not associated with any school." });
    }


    const homework = await prisma.homework.findMany({
      where: {
        isDeleted: false,
        ...(role !== 'TEACHER' ? { schoolId: userSchoolId as string } : {}),
      },
    });
    res.status(200).json(homework);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error fetching homework", message);
    res.status(500).json({ message });
  }
};

export const createHomework = async (
  req: Request<{}, {}, unknown>,
  res: Response,
) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const { role, schoolId: userSchoolId, userId } = user;

    if (role !== 'SCHOOL_ADMIN' && role !== 'TEACHER') {
      return res.status(403).json({ message: "Access denied. Only School Admins and Teachers can create homework." });
    }

    const parsed = homeworkSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    const {
      title,
      description,
      dueDate,
      classId,
      subjectId,
      termId,
    } = parsed.data;

    // Verify class belongs to the school
    const existingClass = await prisma.class.findFirst({
        where: { id: classId, schoolId: userSchoolId as string, isDeleted: false }
    });
    if (!existingClass) return res.status(404).json({ message: "Class does not exist in your school" });

    const newHomework = await prisma.homework.create({
      data: {
        title,
        description,
        dueDate,
        classId,
        teacherId: userId,
        subjectId,
        termId,
        schoolId: userSchoolId as string,
      },
    });

    const students = await prisma.student.findMany(
        {
            where : {
                classId,
                schoolId: userSchoolId as string,
                isDeleted : false
            }
        }
    )

    await prisma.homeworkSubmission.createMany({
        data : students.map((student : {id : string}) => ({
            studentId : student.id,
            homeworkId : newHomework.id,
            status : HomeworkStatus.incomplete
        }))
    })

    res
      .status(201)
      .json({ message: "Homework created successfully", newHomework });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Uknown error";
    console.log("Error creating homework", message);
    res.status(500).json({ message });
  }
};

export const editHomework = async (
  req: Request<{ id: string }, {}, unknown>,
  res: Response,
) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const { role, schoolId: userSchoolId, userId } = user;

    if (role !== 'SCHOOL_ADMIN' && role !== 'TEACHER') {
      return res.status(403).json({ message: "Access denied. Only School Admins and Teachers can edit homework." });
    }

    const homeworkIdParsed = homeworkIdSchema.safeParse(req.params.id);
    const parsed = homeworkSchema.safeParse(req.body);

    if (!homeworkIdParsed.success) {
      return res.status(400).json({ message: "Invalid homework ID" });
    }
    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    const homeworkId = homeworkIdParsed.data;
    const {
      title,
      description,
      dueDate,
      classId,
      subjectId,
      termId,
    } = parsed.data;

    const existingHomework = await prisma.homework.findFirst({
      where: {
        id: homeworkId,
        schoolId: userSchoolId as string,
        isDeleted: false,
      },
    });

    if (!existingHomework) {
      return res.status(404).json({ message: "Homework does not exist in your school" });
    }

    // If teacher, ensure they are the one who created it
    if (role === 'TEACHER' && existingHomework.teacherId !== userId) {
        return res.status(403).json({ message: "Access denied. You can only edit homework you created." });
    }

    const updatedHomework = await prisma.homework.update({
      where: {
        id: homeworkId,
      },
      data: {
        title,
        description,
        dueDate,
        classId,
        subjectId,
        termId,
      },
    });

    res
      .status(200)
      .json({ message: "Homework updated successfully", updatedHomework });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Uknown error";
    console.log("Error editing homework", message);
    res.status(500).json({ message });
  }
};

export const ParentEditHomework = async (
  req: Request<{}, {}, unknown>,
  res: Response,
) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const { schoolId: userSchoolId } = user;

    const parsed = parentHomeworkSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    const { status, studentId, homeworkId } = parsed.data;

    const existingStudent = await prisma.student.findFirst({
      where: {
        id: studentId,
        schoolId: userSchoolId as string,
        isDeleted: false,
      },
    });

    if (!existingStudent) {
      return res.status(404).json({ message: "Student does not exist in your school" });
    }

    const existingHomeworkSubmission =
      await prisma.homeworkSubmission.findFirst({
        where: {
          homeworkId,
          studentId,
          isDeleted: false,
        },
      });

    if (!existingHomeworkSubmission) {
      return res.status(404).json({ message: "Homework submission does not exist" });
    }

    const updatedHomeworkSubmission = await prisma.homeworkSubmission.update({
      where: {
        homeworkId_studentId: {
          homeworkId,
          studentId,
        },
      },
      data: {
        status,
        markedAt: new Date(),
      },
    });
    res.status(200).json({
      message: "Homework status updated successfully",
      updatedHomeworkSubmission,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Uknown error";
    console.log("Error editing homework", message);
    res.status(500).json({ message });
  }
};

export const deleteHomework = async (
  req: Request<{ id: string }, {}, unknown>,
  res: Response,
) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const { role, schoolId: userSchoolId, userId } = user;

    if (role !== 'SCHOOL_ADMIN' && role !== 'TEACHER') {
      return res.status(403).json({ message: "Access denied. Only School Admins and Teachers can delete homework." });
    }

    const homeworkIdParsed = homeworkIdSchema.safeParse(req.params.id);

    if (!homeworkIdParsed.success) {
      return res.status(400).json({ message: "Invalid homework ID" });
    }

    const homeworkId = homeworkIdParsed.data;

    const existingHomework = await prisma.homework.findFirst({
      where: {
        id: homeworkId,
        schoolId: userSchoolId as string,
        isDeleted: false,
      },
    });

    if (!existingHomework) {
      return res.status(404).json({ message: "Homework does not exist in your school" });
    }

    // If teacher, ensure they are the one who created it
    if (role === 'TEACHER' && existingHomework.teacherId !== userId) {
        return res.status(403).json({ message: "Access denied. You can only delete homework you created." });
    }

    await prisma.homework.update({
      where: {
        id: homeworkId,
      },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });

    res.status(200).json({ message: "Homework deleted successfully" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Uknown error";
    console.log("Error deleting homework", message);
    res.status(500).json({ message });
  }
};

export const getAssignmentsToGradeCount = async (req: Request, res: Response) => {
  try{
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { role, schoolId: userSchoolId, userId: teacherId } = user;

    if (role !== "TEACHER") {
      return res.status(403).json({
        message: "Access denied. Only Teachers can view their students.",
      });
    }

    if (!userSchoolId) {
      return res
        .status(400)
        .json({ message: "User is not associated with any school." });
    }

    const pendingAssignmentsToGrade = await prisma.homeworkSubmission.count({
      where : {
        status : 'complete',
        markedAt : null,
        isDeleted : false,
        homework : {
          teacherId,
          schoolId: userSchoolId as string,
          isDeleted : false
        }
      }
    })

    res.status(200).json(pendingAssignmentsToGrade)

  }catch(error){
    const message = error instanceof Error ? error.message : "Uknown error";
    console.log("Error getting assignments to grade count", message);
    res.status(500).json({ message });
  }
}

export const getGradedAssignmens = async (req : Request, res : Response) => {
  try {
     const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { role, schoolId: userSchoolId, userId: teacherId } = user;

    if (role !== "TEACHER") {
      return res.status(403).json({
        message: "Access denied. Only Teachers can view their students.",
      });
    }

    if (!userSchoolId) {
      return res
        .status(400)
        .json({ message: "User is not associated with any school." });
    }

    const gradedAssignments = await prisma.homeworkSubmission.findMany({
      where : {
        status : 'complete',
        markedAt : {
          not : null
        },
        isDeleted : false,
        homework : {
          teacherId,
          schoolId: userSchoolId as string,
          isDeleted : false
        }
      },
      include : {
        student : {
          select : {
           name : true
          }
        }
      }
    })

    res.status(200).json(gradedAssignments)

    
  } catch (error) {
    const message = error instanceof Error ? error.message : "Uknown error";
    console.log('Error getting graded assignments', message);
    res.status(500).json({message})
  }
}
