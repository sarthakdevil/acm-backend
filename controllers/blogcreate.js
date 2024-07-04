import { PrismaClient } from "@prisma/client";
import { saveBlogToDatabase } from "../functions/blogsave.js";
const prisma = new PrismaClient();
import {z} from 'zod'
const blogCreateSchema = z.object({
  Title: z.string().nonempty("Title is required"),
  Content: z.string().nonempty("Content is required"),
  Author: z.string().nonempty("Author is required"),
  Category: z.string().nonempty("Category is required"),
  Event: z.string().nonempty("Event is required"),
});

const blogUpdateSchema = z.object({
  Title: z.string().optional(),
  Content: z.string().optional(),
  Author: z.string().optional(),
  Category: z.string().optional(),
  Event: z.string().optional(),
});

const blogVerifySchema = z.object({
  blogId: z.number().int().positive("Invalid blog ID"),
  verified: z.boolean(),
});

export const blogcreate = async (req, res, next) => {
  const { Title, Content, Author, Category, Event } = req.body;

  // Validate request body using Zod
  try {
    blogCreateSchema.parse({ Title, Content, Author, Category, Event });
  } catch (e) {
    return res.status(400).json({ error: e.errors });
  }

  try {
    let savedBlog;
    if (req.file) {
      const imagePath = req.file.path;
      savedBlog = await saveBlogToDatabase(
        Title,
        Content,
        Author,
        Category,
        Event,
        imagePath
      );
    } else {
      savedBlog = await saveBlogToDatabase(
        Title,
        Content,
        Author,
        Category,
        Event
      );
    }
    res.status(200).json({ success: true, blog: savedBlog });
  } catch (error) {
    console.error("Error:", error);
    return next(error);
  }
};

export const blogupdate = async (req, res, next) => {
  const Sno = Number(req.params.id);

  // Validate request body using Zod
  try {
    blogUpdateSchema.parse(req.body);
  } catch (e) {
    return res.status(400).json({ error: e.errors });
  }

  try {
    const updatedBlog = await prisma.$transaction([
      prisma.blog.update({ where: { Sno }, data: req.body }),
    ]);

    return res.status(200).json({ success: true, data: updatedBlog });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ success: false, error: "Failed To Update Blog" });
  }
};

export const blogdelete = async (req, res, next) => {
  const Sno = Number(req.params.id);

  try {
    await prisma.blog.delete({ where: { Sno } });
    res.status(200).json({ success: true, message: "Deleted Successfully" });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

export const blogverify = async (req, res, next) => {
  const { blogId, verified } = req.body;

  // Validate request body using Zod
  try {
    blogVerifySchema.parse({ blogId, verified });
  } catch (e) {
    return res.status(400).json({ error: e.errors });
  }

  try {
    const updatedBlog = await prisma.blog.update({
      where: { id: blogId },
      data: { verified },
    });

    res.status(200).json({ success: true, blog: updatedBlog });
  } catch (error) {
    console.error("Error verifying blog:", error);
    return next(error);
  }
};