import { z } from "zod";
import type { Request, Response } from "express";
import { PrismaPg } from "@prisma/adapter-pg";
import prismaPkg from "../generated/prisma/client.js";

const PrismaClient = (prismaPkg as any).PrismaClient ?? (prismaPkg as any).default?.PrismaClient;
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

const prisma = new PrismaClient({ adapter });

const announcementIdSchema = z.string().uuid();
const schoolIdSchema = z.string().uuid();
const classIdSchema = z.string().uuid();

const announcementSchema = z.object({
  title: z.string(),
  content: z.string(),
  classId: z.string().uuid().optional(),
});

export const createAnnouncement = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const { role, schoolId: userSchoolId, userId } = user;

    if (role !== 'SCHOOL_ADMIN' && role !== 'TEACHER') {
      return res.status(403).json({ message: "Access denied. Only School Admins and Teachers can create announcements." });
    }

    const parsed = announcementSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    const { title, content, classId } = parsed.data;

    const existingAnnouncement = await prisma.announcement.findFirst({
      where: {
        title,
        content,
        createdBy: userId,
        classId,
        schoolId: userSchoolId as string,
        isDeleted: false,
      },
    });

    if (existingAnnouncement) {
      return res.status(400).json({
        message: "Announcement already exists",
      });
    }

    if (classId) {
      const existingClass = await prisma.class.findFirst({
        where: {
          id: classId,
          schoolId: userSchoolId as string,
          isDeleted: false,
        },
      });

      if (!existingClass) {
        return res.status(404).json({
          message: "Class does not exist in your school",
        });
      }
    }

    const newAnnouncement = await prisma.announcement.create({
      data: {
        title,
        content,
        createdBy: userId,
        classId,
        schoolId: userSchoolId as string,
      },
    });

    res.status(201).json({
      message: "Announcement created successfully",
      newAnnouncement,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Uknown Error";
    console.error("Error creating announcement", error);
    res.status(500).json({ message });
  }
};

export const getAnnouncements = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const { schoolId, role } = user;

    const announcements = await prisma.announcement.findMany({
      where: {
        isDeleted: false,
        ...(role !== 'SUPER_ADMIN' ? { schoolId: schoolId as string } : {}),
      },
    });
    res.status(200).json(announcements);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Uknown error";
    console.error("Error getting announcements", error);
    res.status(500).json({ message });
  }
};

export const getAnnouncement = async (
  req: Request<{ id: string }, {}, unknown>,
  res: Response,
) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const { schoolId, role } = user;
    const announcementIdParsed = announcementIdSchema.safeParse(req.params.id);

    if (!announcementIdParsed.success) {
      return res.status(400).json({
        message: "Invalid Announcement ID",
      });
    }

    const announcementId = announcementIdParsed.data;

    const announcement = await prisma.announcement.findFirst({
      where: {
        id: announcementId,
        isDeleted: false,
        ...(role !== 'SUPER_ADMIN' ? { schoolId: schoolId as string } : {}),
      },
    });

    if (!announcement) {
      return res.status(404).json({
        message: "Announcement does not exist in your school",
      });
    }

    res.status(200).json(announcement);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Uknown error";
    console.error("Error getting announcement", error);
    res.status(500).json({ message });
  }
};

export const getSchoolAnnouncement = async (
  req: Request<{ id: string }, {}, unknown>,
  res: Response,
) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const { schoolId: userSchoolId, role } = user;
    const schoolIdParsed = schoolIdSchema.safeParse(req.params.id);

    if (!schoolIdParsed.success) {
      return res.status(400).json({
        message: "Invalid school ID",
      });
    }

    const targetSchoolId = role === 'SUPER_ADMIN' ? schoolIdParsed.data : userSchoolId;

    if (!targetSchoolId) {
       return res.status(400).json({ message: "School ID is required" });
    }

    const schoolAnnouncements = await prisma.announcement.findMany({
      where: {
        schoolId: targetSchoolId as string,
        isDeleted: false,
      },
    });

    res.status(200).json(schoolAnnouncements);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Uknown error";
    console.error("Error getting school announcements", error);
    res.status(500).json({ message });
  }
};

export const getClassAnnouncement = async (
  req: Request<{ id: string }, {}, unknown>,
  res: Response,
) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const { schoolId, role } = user;
    const classIdParsed = classIdSchema.safeParse(req.params.id);

    if (!classIdParsed.success) {
      return res.status(400).json({ message: "Invalid class ID" });
    }

    const classId = classIdParsed.data;

    const existingClass = await prisma.class.findFirst({
      where: {
        id: classId,
        isDeleted: false,
        ...(role !== 'SUPER_ADMIN' ? { schoolId: schoolId as string } : {}),
      },
    });

    if (!existingClass) {
      return res.status(404).json({
        message: "Class does not exist in your school",
      });
    }

    const classAnnouncements = await prisma.announcement.findMany({
      where: {
        classId,
        isDeleted: false,
        ...(role !== 'SUPER_ADMIN' ? { schoolId: schoolId as string } : {}),
      },
    });

    res.status(200).json(classAnnouncements);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Uknown error";
    console.error("Error getting class announcements", error);
    res.status(500).json({ message });
  }
};

export const updateAnnouncement = async (
  req: Request<{ id: string }, {}, unknown>,
  res: Response,
) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const { role, schoolId: userSchoolId, userId } = user;

    if (role !== 'SCHOOL_ADMIN' && role !== 'TEACHER') {
      return res.status(403).json({ message: "Access denied. Only School Admins and Teachers can update announcements." });
    }

    const announcementIdParsed = announcementIdSchema.safeParse(req.params.id);
    const parsed = announcementSchema.safeParse(req.body);

    if (!announcementIdParsed.success) {
      return res.status(400).json({
        message: "Invalid announcement ID",
      });
    }

    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    const announcementId = announcementIdParsed.data;
    const { title, content, classId } = parsed.data;

    const existingAnnouncement = await prisma.announcement.findFirst({
      where: {
        id: announcementId,
        schoolId: userSchoolId as string,
        isDeleted: false,
      },
    });

    if (!existingAnnouncement) {
      return res.status(404).json({
        message: "Announcement does not exist in your school",
      });
    }

    // If teacher, ensure they created it
    if (role === 'TEACHER' && existingAnnouncement.createdBy !== userId) {
        return res.status(403).json({ message: "Access denied. You can only update announcements you created." });
    }

    if (classId) {
      const existingClass = await prisma.class.findFirst({
        where: {
          id: classId,
          schoolId: userSchoolId as string,
          isDeleted: false,
        },
      });

      if (!existingClass) {
        return res.status(404).json({
          message: "Class does not exist in your school",
        });
      }
    }

    const updatedAnnouncement = await prisma.announcement.update({
      where: {
        id: announcementId,
      },
      data: {
        title,
        content,
        classId,
      },
    });

    res.status(200).json({
      message: "Announcement updated successfully",
      updatedAnnouncement,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Uknown error";
    console.error("Error updating announcement", error);
    res.status(500).json({ message });
  }
};

export const deleteAnnouncement = async (
  req: Request<{ id: string }, {}, unknown>,
  res: Response,
) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const { role, schoolId: userSchoolId, userId } = user;

    if (role !== 'SCHOOL_ADMIN' && role !== 'TEACHER') {
      return res.status(403).json({ message: "Access denied. Only School Admins and Teachers can delete announcements." });
    }

    const announcementIdParsed = announcementIdSchema.safeParse(req.params.id);

    if (!announcementIdParsed.success) {
      return res.status(400).json({
        message: "Invalid Announcement ID",
      });
    }

    const announcementId = announcementIdParsed.data;

    const existingAnnouncement = await prisma.announcement.findFirst({
      where: {
        id: announcementId,
        schoolId: userSchoolId as string,
        isDeleted: false,
      },
    });

    if (!existingAnnouncement) {
      return res.status(404).json({
        message: "Announcement does not exist in your school",
      });
    }

    // If teacher, ensure they created it
    if (role === 'TEACHER' && existingAnnouncement.createdBy !== userId) {
        return res.status(403).json({ message: "Access denied. You can only delete announcements you created." });
    }

    await prisma.announcement.update({
      where: {
        id: announcementId,
      },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });

    res.status(200).json({
      message: "Announcement deleted successfully",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Uknown error";
    console.error("Error deleting announcement", error);
    res.status(500).json({ message });
  }
};
