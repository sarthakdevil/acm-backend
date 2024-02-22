import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export async function saveBlogToDatabase(title, content, author, category, event, imagePath) {
    try {
        // Assuming you have a 'Blog' model in your Prisma schema
        const savedBlog = await prisma.blog.create({
            data: {
                Title: title,
                Content: content,
                Author: author,
                Category: category, // Assuming 'category' is a field in your Blog model
                Event: event, // Assuming 'event' is a field in your Blog model
                Image: imagePath || "no image"
            }
        });
        return savedBlog;
    } catch (error) {
        console.error("Error saving blog to database:", error);
        throw error;
    }
}
