import { z } from "zod";
import type { Request, Response } from "express";
import { PrismaPg } from "@prisma/adapter-pg";
import prismaPkg from "../generated/prisma/client.js";

const { PrismaClient } = prismaPkg;
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

const prisma = new PrismaClient({ adapter });

const announcementIdSchema = z.string().uuid();
const schoolIdSchema = z.string().uuid();
const classIdSchema = z.string().uuid();

const announcementSchema = z.object({
  title: z.string(),
  content: z.string(),
  createdBy: z.string().uuid(),
  classId: z.string().uuid().optional(),
  schoolId: z.string().uuid(),
});

export const createAnnouncement = async (req: Request, res: Response) => {
  try {
    const parsed = announcementSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    const { title, content, createdBy, classId, schoolId } = parsed.data;

    const existingAnnouncement = await prisma.announcement.findFirst({
      where: {
        title,
        content,
        createdBy,
        classId,
        schoolId,
      },
    });

    if (existingAnnouncement) {
      return res.status(400).json({
        message: "Announcement already exists",
      });
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        id: createdBy,
      },
    });

    if (!existingUser) {
      return res.status(404).json({
        message: "User does not exist",
      });
    }

    if (classId) {
      const existingClass = await prisma.class.findFirst({
        where: {
          id: classId,
          isDeleted: false,
        },
      });

      if (!existingClass) {
        return res.status(404).json({
          message: "Class does not exist",
        });
      }
    }

    const existingSchool = await prisma.school.findFirst({
      where: {
        id: schoolId,
        isDeleted: false,
      },
    });

    if (!existingSchool) {
      return res.status(404).json({
        message: "School does not exist",
      });
    }

    const newAnnouncement = await prisma.announcement.create({
      data: {
        title,
        content,
        createdBy,
        classId,
        schoolId,
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
    const announcements = await prisma.announcement.findMany();
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
      },
    });

    if (!announcement) {
      return res.status(404).json({
        message: "Announcement does not exist",
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
    const schoolIdParsed = schoolIdSchema.safeParse(req.params.id);

    if (!schoolIdParsed.success) {
      return res.status(400).json({
        message: "Invalid school ID",
      });
    }

    const schoolId = schoolIdParsed.data;

    const existingSchool = await prisma.school.findFirst({
      where: {
        id: schoolId,
        isDeleted: false,
      },
    });
    if (!existingSchool) {
      return res.status(404).json({
        message: "School does not exist",
      });
    }

    const schoolAnnouncements = await prisma.announcement.findMany({
      where: {
        schoolId,
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
    const classIdParsed = classIdSchema.safeParse(req.params.id);

    if (!classIdParsed.success) {
      return res.status(400).json({ message: "Invalid class ID" });
    }

    const classId = classIdParsed.data;

    const existingClass = await prisma.class.findFirst({
      where: {
        id: classId,
        isDeleted: false,
      },
    });

    if (!existingClass) {
      return res.status(404).json({
        message: "Class does not exist",
      });
    }

    const classAnnouncements = await prisma.announcement.findMany({
      where: {
        classId,
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
    const { title, content, createdBy, classId, schoolId } = parsed.data;

    const existingAnnouncement = await prisma.announcement.findFirst({
      where: {
        id: announcementId,
      },
    });

    if (!existingAnnouncement) {
      return res.status(404).json({
        message: "Announcement does not exist",
      });
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        id: createdBy,
      },
    });

    if (!existingUser) {
      return res.status(404).json({
        message: "User does not exist",
      });
    }

    if (classId) {
      const existingClass = await prisma.class.findFirst({
        where: {
          id: classId,
          isDeleted: false,
        },
      });

      if (!existingClass) {
        return res.status(404).json({
          message: "Class does not exist",
        });
      }
    }

    const existingSchool = await prisma.school.findFirst({
      where: {
        id: schoolId,
        isDeleted: false,
      },
    });

    if (!existingSchool) {
      return res.status(404).json({
        message: "School does not exist",
      });
    }

    const updatedAnnouncement = await prisma.announcement.update({
      where: {
        id: announcementId,
      },
      data: {
        title,
        content,
        createdBy,
        classId,
        schoolId,
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
      },
    });

    if (!existingAnnouncement) {
      return res.status(404).json({
        message: "Announcement does not exist",
      });
    }

    await prisma.announcement.delete({
      where: {
        id: announcementId,
      },
    });

    res.status(200).json({
      message: "Announcement deleted successfully",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Uknown error";
    console.error("Error getting announcements", error);
    res.status(500).json({ message });
  }
};
