import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Middleware to ensure the authenticated user is an admin.
 * Requires `verifyToken` middleware first, so req.user.id (Sno) exists.
 */
export const isAdmin = async (req, res, next) => {
  try {
    const userId = req.user?.id; // from JWT payload

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: Missing user ID in token" });
    }

    const user = await prisma.user.findUnique({
      where: { Sno: userId },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "ADMIN") {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }

    next(); // user is admin
  } catch (error) {
    console.error("Error verifying admin status:", error);
    return res.status(500).json({ message: "Internal server error while checking admin status" });
  }
};
