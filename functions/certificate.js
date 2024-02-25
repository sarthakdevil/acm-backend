import { createCanvas, loadImage } from 'canvas';
import fs from 'fs';

const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
export async function generateCertificate(certificate, outputPath) {
    try {
        // Load the certificate template image
        const templateImage = await loadImage("C:/Users/sarth/OneDrive/Desktop/acm backend/uploads/certificate/Certificate.png");

        // Create a canvas with the same dimensions as the template image
        const canvas = createCanvas(templateImage.width, templateImage.height);
        const ctx = canvas.getContext('2d');

        // Draw the template image onto the canvas
        ctx.drawImage(templateImage, 0, 0);

        // Draw participant details on the canvas
        ctx.font = '50px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText(`${certificate.name}`, 850, 650);
        ctx.fillText(`${certificate.college}`, 760, 880);
        ctx.fillText(`${certificate.course}`, 290, 960);
        ctx.fillText(`${certificate.enrollment}`, 50, 170);
        ctx.fillText(`${certificate.uniqueid}`, 50, 200);
        ctx.fillText(`${formatDate(certificate.startdate)}`, 50, 230);
        ctx.fillText(`${certificate.position}`,1460, 880)

        // Save the canvas as PNG
        const pngData = canvas.toBuffer('image/png');
        fs.writeFileSync(outputPath + certificate.enrollment + '.png', pngData);

        console.log('PNG certificate saved at:', outputPath + '.png');
    } catch (error) {
        console.error('Error generating PNG certificate:', error);
        throw error; // Throw the error for handling in the calling function
    }
}
