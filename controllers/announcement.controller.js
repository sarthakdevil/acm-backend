import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

// Schema definitions
const announcementSchema = z.object({
  title: z.string().nonempty("Title is required"),
  description: z.string().nonempty("Description is required"),
  image: z.string().optional(),
  link: z.string().url().optional()
});

const announcementUpdateSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
  link: z.string().url().optional(),
});

// Make announcement
export const makeannouncement = async (req, res, next) => {
  try {
    const date = new Date();
    // Validate the request body
    const validatedData = announcementSchema.parse(req.body);

    const announcement = await prisma.announcement.create({
      data: validatedData,
    });
    return res.status(200).json({ success: true, data: announcement });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: err.errors });
    }
    console.error(err);
    return res.status(400).json({ success: false, error: "Failed To Make Announcement" });
  }
};

// Update announcement
export const announcementupdate = async (req, res, next) => {
  const Sno = Number(req.params.id);
  try {
    // Validate the request body
    const validatedData = announcementUpdateSchema.parse(req.body);

    const updatedAnnouncement = await prisma.announcement.update({
      where: { Sno },
      data: validatedData,
    });
    return res.status(200).json({ success: true, data: updatedAnnouncement });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: err.errors });
    }
    console.error(err);
    return res.status(400).json({ success: false, error: "Failed To Update Announcement" });
  }
};

// Delete announcement
export const announcementdelete = async (req, res, next) => {
  const Sno = Number(req.params.id);
  try {
    await prisma.announcement.delete({ where: { Sno } });
    res.status(200).json({ success: true, message: 'Deleted Successfully' });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

// View all announcements
export const viewallannouncement = async (req, res, next) => {
  try {
    const announcements = await prisma.announcement.findMany();
    return res.status(200).json({ success: true, data: announcements });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ success: false, error: "Failed To View Announcements" });
  }
};

// View a single announcement
export const viewannouncement = async (req, res, next) => {
  const Sno = Number(req.params.id);
  try {
    const announcement = await prisma.announcement.findUnique({
      where: { Sno },
    });
    return res.status(200).json({ success: true, data: announcement });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ success: false, error: "Failed To View Announcement" });
  }
};
