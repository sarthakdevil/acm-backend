import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const isAdmin = async (userId) => {
  try {
    // Retrieve the user from the database
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    // Check if the user exists and is an admin
    if(user.isAdmin){
      
    }else{

    };
  } catch (error) {
    console.error("Error checking user admin status:", error);
    return false; // Return false if an error occurs
  }
};