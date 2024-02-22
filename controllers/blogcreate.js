import { PrismaClient } from '@prisma/client';
import {saveBlogToDatabase} from '../blogfunctions.js/blogsave.js';

export const blogcreate = async (req,res,next)=>{
    const { Title, Content, Author, Category, Event } = req.body;
if (!(Title && Content && Author && Category && Event)) return res.status(400).send({ error: "Missing fields" });
try {
    let savedBlog;
    if (req.file.["Image"]) {
        const imagePath = req.file.path;
        // Saving the blog details along with the image path to the database using Prisma
        savedBlog = await saveBlogToDatabase(Title, Content, Author, Category, Event, imagePath);
    } else {
        // Saving the blog details without the image path to the database using Prisma
        savedBlog = await saveBlogToDatabase(Title, Content, Author, Category, Event);
    }
    res.status(200).json({ success: true, blog: savedBlog });
} catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
}
}