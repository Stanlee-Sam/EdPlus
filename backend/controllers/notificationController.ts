import { z } from "zod";
import type { Request, Response } from "express";
import { PrismaPg } from "@prisma/adapter-pg";
import prismaPkg from "../generated/prisma/client.js";

const PrismaClient = (prismaPkg as any).PrismaClient ?? (prismaPkg as any).default?.PrismaClient;
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

const prisma = new PrismaClient({ adapter });

const notificationIdSchema = z.string().uuid();
const userIdSchema = z.string().uuid();
const notificationSchema = z.object({
  message: z.string(),
  isRead: z.boolean().optional(),
  userId: z.string().uuid(),
});
const notificationUpdateSchema = notificationSchema.partial();

const notificationReaderSchema = z.object({
  isRead: z.boolean(),
});

export const createNotification = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const { schoolId: userSchoolId, role } = user;

    if (role !== 'SCHOOL_ADMIN' && role !== 'TEACHER' && role !== 'SUPER_ADMIN') {
         return res.status(403).json({ message: "Access denied." });
    }

    const parsed = notificationSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    const { message, isRead, userId } = parsed.data;

    const existingUser = await prisma.user.findFirst({
      where: {
        id: userId,
        schoolId: userSchoolId as string,
      },
    });

    if (!existingUser) {
      return res.status(404).json({
        message: "User does not exist in your school",
      });
    }

    const newNotification = await prisma.notification.create({
      data: {
        message,
        isRead,
        userId,
        schoolId: userSchoolId as string,
      },
    });
    res.status(201).json(newNotification);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Uknown error";
    console.error("Error creating notification", error);
    res.status(500).json({ message });
  }
};

export const getNotifications = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const { schoolId, role } = user;

    const notifications = await prisma.notification.findMany({
      where: {
        isDeleted: false,
        ...(role !== 'SUPER_ADMIN' ? { schoolId: schoolId as string } : {}),
      },
    });
    res.status(200).json(notifications);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Uknown error";
    console.error("Error getting notifications", error);
    res.status(500).json({ message });
  }
};

export const getNotification = async (
  req: Request<{ id: string }, {}, unknown>,
  res: Response,
) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const { schoolId, role } = user;
    const notificationIdParsed = notificationIdSchema.safeParse(req.params.id);

    if (!notificationIdParsed.success) {
      return res.status(400).json({
        message: "Invalid notification ID",
      });
    }

    const notificationId = notificationIdParsed.data;

    const notification = await prisma.notification.findFirst({
      where: {
        id: notificationId,
        isDeleted: false,
        ...(role !== 'SUPER_ADMIN' ? { schoolId: schoolId as string } : {}),
      },
    });

    if (!notification) {
      return res.status(404).json({
        message: "Notification does not exist in your school",
      });
    }

    res.status(200).json(notification);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Uknown error";
    console.error("Error getting notification", error);
    res.status(500).json({ message });
  }
};

export const getUserNotifications = async (
  req: Request<{ id: string }, {}, unknown>,
  res: Response,
) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const { schoolId: userSchoolId, role, userId: currentUserId } = user;
    const userIdParsed = userIdSchema.safeParse(req.params.id);

    if (!userIdParsed.success) {
      return res.status(400).json({
        message: "Invalid user ID",
      });
    }

    const targetUserId = userIdParsed.data;

    // Only the user themselves or SCHOOL_ADMIN/SUPER_ADMIN can see notifications
    if (role !== 'SUPER_ADMIN' && role !== 'SCHOOL_ADMIN' && targetUserId !== currentUserId) {
         return res.status(403).json({ message: "Access denied." });
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        id: targetUserId,
        ...(role !== 'SUPER_ADMIN' ? { schoolId: userSchoolId as string } : {}),
      },
    });

    if (!existingUser) {
      return res.status(404).json({
        message: "User does not exist in your context",
      });
    }

    const userNotifications = await prisma.notification.findMany({
      where: {
        userId: targetUserId,
        isDeleted: false,
        ...(role !== 'SUPER_ADMIN' ? { schoolId: userSchoolId as string } : {}),
      },
    });

    res.status(200).json(userNotifications);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Uknown error";
    console.error("Error getting user notifications", error);
    res.status(500).json({ message });
  }
};

export const updateNotification = async (
  req: Request<{ id: string }, {}, unknown>,
  res: Response,
) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const { schoolId: userSchoolId, role, userId: currentUserId } = user;
    const notificationIdParsed = notificationIdSchema.safeParse(req.params.id);
    const parsed = notificationUpdateSchema.safeParse(req.body);

    if (!notificationIdParsed.success) {
      return res.status(400).json({
        message: "Invalid notification ID",
      });
    }

    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    const notificationId = notificationIdParsed.data;

    const existingNotification = await prisma.notification.findFirst({
      where: {
        id: notificationId,
        schoolId: userSchoolId as string,
        isDeleted: false,
      },
    });

    if (!existingNotification) {
      return res.status(404).json({
        message: "Notification does not exist in your school",
      });
    }

    // Only the recipient or SCHOOL_ADMIN can update
    if (role !== 'SCHOOL_ADMIN' && existingNotification.userId !== currentUserId) {
        return res.status(403).json({ message: "Access denied." });
    }

    const updatedNotification = await prisma.notification.update({
      where: {
        id: notificationId,
      },
      data: parsed.data,
    });

    res.status(200).json(updatedNotification);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Uknown error";
    console.error("Error updating notification", error);
    res.status(500).json({ message });
  }
};

export const markNotificationAsRead = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const { userId: currentUserId } = user;
    const notificationIdParsed = notificationIdSchema.safeParse(req.params.id);
    const parsed = notificationReaderSchema.safeParse(req.body);

    if (!notificationIdParsed.success) {
      return res.status(400).json({
        message: "Invalid notification ID",
      });
    }

    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    const notificationId = notificationIdParsed.data;
    const { isRead } = parsed.data;

    const existingNotification = await prisma.notification.findFirst({
      where: {
        id: notificationId,
        userId: currentUserId,
        isDeleted: false,
      },
    });

    if (!existingNotification) {
      return res.status(404).json({
        message: "Notification not found for you",
      });
    }

    const updatedNotification = await prisma.notification.update({
      where: {
        id: notificationId,
      },
      data: {
        isRead,
      },
    });

    res.status(200).json(updatedNotification);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Uknown error";
    console.error("Error updating notification", error);
    res.status(500).json({ message });
  }
};

export const deleteNotification = async (
  req: Request<{ id: string }, {}, unknown>,
  res: Response,
) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const { schoolId: userSchoolId, role, userId: currentUserId } = user;
    const notificationIdParsed = notificationIdSchema.safeParse(req.params.id);

    if (!notificationIdParsed.success) {
      return res.status(400).json({
        message: "Invalid notification ID",
      });
    }

    const notificationId = notificationIdParsed.data;

    const existingNotification = await prisma.notification.findFirst({
      where: {
        id: notificationId,
        schoolId: userSchoolId as string,
        isDeleted: false,
      },
    });

    if (!existingNotification) {
      return res.status(404).json({
        message: "Notification does not exist in your school",
      });
    }

    // Only the recipient or SCHOOL_ADMIN can delete
    if (role !== 'SCHOOL_ADMIN' && existingNotification.userId !== currentUserId) {
        return res.status(403).json({ message: "Access denied." });
    }

    await prisma.notification.update({
      where: {
        id: notificationId,
      },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });

    res.status(200).json({
      message: "Notification deleted successfully",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Uknown error";
    console.error("Error deleting notification", error);
    res.status(500).json({ message });
  }
};
