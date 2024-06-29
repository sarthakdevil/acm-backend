// certificateGenerator.js
import { PrismaClient } from '@prisma/client';
import {generateCertificate} from '../functions/certificate.js';
import mailCertificate from '../utils/certificatemailer.utils.js';
import { z } from 'zod';

const prisma = new PrismaClient();
// Middleware function to handle generating certificates upon receiving a POST request
// Define the Zod schema
const certificateGenerationSchema = z.object({
  outputPath: z.string().nonempty("Output path is required"),
  emailSubject: z.string().nonempty("Email subject is required"),
  emailBody: z.string().nonempty("Email body is required")
});

// Middleware function to handle generating certificates upon receiving a POST request
export const certificategenerator = async (req, res, next) => {
  try {
    // Validate the request body
    const validatedData = certificateGenerationSchema.parse(req.body);

    // Fetch all entries from the database
    const certificates = await prisma.certificate.findMany();

    // Generate certificate for each entry
    for (const certificate of certificates) {
      await generateCertificate(certificate, validatedData.outputPath);
      await mailCertificate(certificate, validatedData.outputPath, validatedData.emailSubject, validatedData.emailBody);
    }

    res.status(200).send('Certificates generated successfully');
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    console.error('Error generating certificates:', error);
    res.status(500).send('Internal Server Error');
  }
};

