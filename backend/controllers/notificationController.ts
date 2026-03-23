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
  schoolId: z.string().uuid(),
});
const notificationUpdateSchema = notificationSchema.partial();

const notificationReaderSchema = z.object({
  isRead: z.boolean(),
});

export const createNotification = async (req: Request, res: Response) => {
  try {
    const parsed = notificationSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    const { message, isRead, userId, schoolId } = parsed.data;

    const existingUser = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!existingUser) {
      return res.status(404).json({
        message: "User does not exist",
      });
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

    const newNotification = await prisma.notification.create({
      data: {
        message,
        isRead,
        userId,
        schoolId,
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
    const notifications = await prisma.notification.findMany({
      where: {
        isDeleted: false,
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
      },
    });

    if (!notification) {
      return res.status(404).json({
        message: "Notification does not exist",
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
    const userIdParsed = userIdSchema.safeParse(req.params.id);

    if (!userIdParsed.success) {
      return res.status(400).json({
        message: "Invalid user ID",
      });
    }

    const userId = userIdParsed.data;

    const existingUser = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!existingUser) {
      return res.status(404).json({
        message: "User does not exist",
      });
    }

    const userNotifications = await prisma.notification.findMany({
      where: {
        userId,
        isDeleted: false,
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
        isDeleted: false,
      },
    });

    if (!existingNotification) {
      return res.status(404).json({
        message: "Notification does not exist",
      });
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
        isDeleted: false,
      },
    });

    if (!existingNotification) {
      return res.status(404).json({
        message: "Notification does not exist",
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
        isDeleted: false,
      },
    });

    if (!existingNotification) {
      return res.status(404).json({
        message: "Notification does not exist",
      });
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
