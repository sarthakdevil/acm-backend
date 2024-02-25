// certificateGenerator.js
import { PrismaClient } from '@prisma/client';
import {generateCertificate} from '../functions/certificate.js';
import mailCertificate from '../utils/certificatemailer.utils.js';

const prisma = new PrismaClient();
// Middleware function to handle generating certificates upon receiving a POST request
export const certificategenerator = async (req, res, next) => {
    try {
        // Fetch all entries from the database
        const certificates = await prisma.certificate.findMany();

        // Generate certificate for each entry
        for (const certificate of certificates) {
            await generateCertificate(certificate,"C:/Users/sarth/OneDrive/Desktop/acm backend/uploads/certificate");
            await mailCertificate(certificate,email);
        }
        res.status(200).send('Certificates generated successfully');
    } 
    catch (error) {
        console.error('Error generating certificates:', error);
        res.status(500).send('Internal Server Error');
    }
};
