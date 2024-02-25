// mailCertificate.js
import nodemailer from 'nodemailer';
import fs from 'fs';

async function mailCertificate(email, certificatePath) {
    try {
        // Create a Nodemailer transporter using SMTP
        const transporter = nodemailer.createTransport({
            host: 'smtp.example.com', // Your SMTP server hostname
            port: 587,
            secure: false, // Set to true if your SMTP server requires secure connection
            auth: {
                user: 'your_email@example.com',
                pass: 'your_password'
            }
        });

        // Read the certificate file as an attachment
        const attachment = {
            filename: 'certificate.pdf',
            content: fs.createReadStream(certificatePath)
        };

        // Configure email options
        const mailOptions = {
            from: 'your_email@example.com',
            to: email,
            subject: 'Certificate of Completion',
            text: 'Please find your certificate attached.',
            attachments: [attachment]
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);
        console.log('Certificate email sent:', info.response);
    } catch (error) {
        console.error('Error sending certificate email:', error);
        throw error;
    }
}

export default mailCertificate;
