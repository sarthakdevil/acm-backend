import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const formSchema = z.object({
  acmMemberShipId: z
    .number()
    .int()
    .positive()
    .min(1, "ACM Membership Id is required"),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format").min(1, "Name is required"),
  roll: z.number().int().positive().min(1, "Roll number is required"),
});

//POSTing a form in the database
export const createForm = async (req, res) => {
  try {
    const { acmMemberShipId, name, email, roll } = req.body; // Accessing data from the body

    // Debugging: Log the received data
    console.log("Received Data:", req.body);

    // Validate the incoming data with Zod schema
    const validatedData = formSchema.parse({
      acmMemberShipId: Number(acmMemberShipId),
      name,
      email,
      roll: Number(roll),
    });

    // Checks if the unique field doesn't already exist
    const existingForm = await prisma.form.findFirst({
      where: {
        OR: [
          { acmMemberShipId: validatedData.acmMemberShipId },
          { email: validatedData.email },
          { roll: validatedData.roll },
        ],
      },
    });

    if (existingForm) {
      return res.status(400).json({
        success: false,
        message:
          "A record with the same ACM Membership ID, email, or roll number already exists.",
      });
    }

    // Enters the record in the database
    const newFormEntry = await prisma.form.create({
      data: validatedData,
    });
    return res.status(201).json({ success: true, data: newFormEntry });
  } catch (e) {
    console.error("Error:", e);
    if (e instanceof z.ZodError) {
      return res.status(400).json({ error: e.errors });
    }
    console.error(e);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

//GETting a record by acmMemberShipId
export const getRecordByACMId = async (req, res) => {
  try {
    const { acmMemberShipId } = req.params;
    const record = await prisma.form.findUnique({
      where: {
        acmMemberShipId: Number(acmMemberShipId),
      },
    });
    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Record not found.",
      });
    }
    return res.status(200).json({
      success: true,
      data: record,
    });
  } catch (e) {
    console.error("Unexpected error finding record by ACMId: ", e);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//GETting all records from the the database
export const getAllRecords = async (req, res) => {
  try {
    const forms = await prisma.form.findMany();
    return res.status(200).json({
      success: true,
      data: forms,
    });
  } catch (e) {
    console.error("Unexpected error fetching all records: ", e);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
