import { PrismaClient } from '@prisma/client';
import {saveBlogToDatabase} from '../blogfunctions.js/blogsave.js';
const prisma = new PrismaClient();
export const blogcreate = async (req,res,next)=>{
    const { Title, Content, Author, Category, Event } = req.body;
if (!(Title && Content && Author && Category && Event)) return res.status(400).send({ error: "Missing fields" });
try {
    let savedBlog;
    if (req.file) {
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
    throw next(error)
}
}

export const  blogupdate = async (req, res, next) =>{
    const Sno= Number(req.params.id);
    try {
        const updatedBlog = await prisma.$transaction([
            prisma.blog.update({ where: { Sno }, data: req.body })
        ]);
        
        return res.status(200).json({success :true ,data:updatedBlog});
      }catch (err){
          console.error(err);
          return res.status(400).json({success :false ,error:"Failed To Update Blog"})
      }
};

export const blogdelete = async (req, res, next) => {
    const Sno = Number(req.params.id);
    
    try {
        await prisma.blog.delete({where:{Sno}});
        res.status(200).json({sucess:true, message:'Deleted Successfully'});
    } catch (err) {
        console.error(err);
        throw next(err)
    }
}

export const blogverify = async (req, res, next) => {
    const { blogId, verified } = req.body; // Assuming blogId and verified (true/false) are sent in the request body
    
    try {
        // Update the verification status of the blog post in the database
        const updatedBlog = await prisma.blog.update({
            where: { id: blogId },
            data: { verified: verified }
        });

        // Send response indicating success
        res.status(200).json({ success: true, blog: updatedBlog });
    } catch (error) {
        console.error("Error verifying blog:", error);
        throw next(error)
    }
}
