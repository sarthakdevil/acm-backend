import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const formSchema=z.object({
    acmMemberShipId: z.number().int().positive().min(1,"ACM Membership Id is required"),
    name: z.string().min(1,"Name is required"),
    email: z.string().email("Invalid email format").min(1,"Name is required"),
    roll: z.number().int().positive().min(1,"Roll number is required"),
})

export const createForm= async(req, res)=>{
    try{
        const validatedData= formSchema.parse(req.body);
        const newFormEntry = await prisma.form.create({
            data:validatedData,
        });
        return res.status(201).json({success: true, data: newFormEntry});
    }catch(e){
        console.error("error:", e);
        if (e instanceof z.ZodError){
            return res.status(400).json({error: e.errors});
        }
        console.error(e);
        return res.status(500).json({ success: false, data: "Internal server error"})
    }
}