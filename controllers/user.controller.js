import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { generateToken } from "../jwt/jwt.js";
import cookieParser from "cookie-parser";
import { z } from "zod";

const prisma = new PrismaClient();

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 3600000,
};

// Register route
export const register = async (req, res, next) => {
  try {
    const userData = req.body;

    // Hashing password using bcrypt
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await prisma.user.create({
      data: {
        username: userData.username,
        password: hashedPassword,
        role: "USER",
      },
    });

    // Generate JWT token with the user's ID
    const token = generateToken(user);
    console.log(token);
    res.cookie("token", token, cookieOptions);

    return res
      .status(201)
      .json({ message: "User created successfully", user, token });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return res.status(400).json({ errors: e.errors });
    }
    next(e); // Pass any other errors to the error handling middleware
  }
};

// Login route
export const login = async (req, res, next) => {
  try {
    const loginData = req.body;

    // Find user by username
    const user = await prisma.user.findUnique({
      where: {
        username: loginData.username,
      },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Compare password with hashed password
    const passwordMatch = await bcrypt.compare(
      loginData.password,
      user.password,
    );

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Generate JWT token with the user's ID
    const token = generateToken(user);
    console.log(token);
    res.cookie("token", token, cookieOptions);

    // Send JWT token back to the client
    res.json({ message: "Login successful", user, token });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return res.status(400).json({ errors: e.errors });
    }
    next(e); // Pass any other errors to the error handling middleware
  }
};

// Logout route
export const logout = async (req, res, next) => {
  try {
    // Clear the JWT token from the client-side (e.g., remove it from local storage or cookies)
    // For example, if using cookies:
    res.clearCookie("token");

    // Send a response indicating successful logout
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    // If an error occurs during logout, pass it to the error handling middleware
    next(error);
  }
};

//Reset Password Route
export const resetPassword = async (req, res, next) => {
  try {
    // Ensure user is authenticated (req.user set by verifyToken middleware)
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: Invalid user token." });
    }

    const { password } = req.body;

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user password
    const updatedUser = await prisma.user.update({
      where: { Sno: userId },
      data: { password: hashedPassword },
    });

    return res.status(200).json({
      message: "Password updated successfully.",
      user: {
        id: updatedUser.id,
        username: updatedUser.username,
        role: updatedUser.role,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    console.error("Error resetting password:", error);
    next(error);
  }
};


// Admin - Updation of User
export const updateUser = async (req, res, next) => {
  try {
    // Validate Sno param and request body
    const { Sno } = req.params;
    const parsedData = req.body;

    // Prevent editing createdAt / updatedAt
    if ("createdAt" in req.body || "updatedAt" in req.body) {
      return res.status(400).json({
        message: "You cannot modify createdAt or updatedAt fields.",
      });
    }

    // Find the user to ensure existence
    const existingUser = await prisma.user.findUnique({
      where: { Sno: parseInt(Sno, 10) },
    });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found." });
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { Sno: parseInt(Sno, 10) },
      data: parsedData,
    });

    return res.status(200).json({
      message: "User updated successfully.",
      user: updatedUser,
    });

  } catch (error) {
    // Prisma unique constraint violation for username
    if (error.code === "P2002") {
      return res.status(409).json({
        message: "Username must be unique.",
      });
    }

    // Validation error from Zod
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }

    console.error("Error updating user:", error);
    next(error); 
  }
};

// Delete User - Admin only 
export const deleteUser = async (req, res, next) => {
  try {
    // Validate Sno param
    const Sno = parseInt(req.params.Sno, 10);


    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { Sno },
    });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found." });
    }

    // Delete user
    await prisma.user.delete({
      where: { Sno },
    });

    return res.status(200).json({ message: `User with Sno ${Sno} deleted successfully.` });
  } catch (error) {
    // Validation error
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }

    console.error("Error deleting user:", error);
    next(error); 
  }
};


//Fetch All Users - Admin only
export const fetchAllUsers = async (req, res, next) => {
  try {
    // Fetch all users (excluding sensitive info like password)
    const users = await prisma.user.findMany({
      select: {
        Sno: true,
        username: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { Sno: "asc" },
    });

    return res.status(200).json({
      message: "Users fetched successfully.",
      users,
    });
  } catch (error) {
    console.error("Error fetching all users:", error);
    next(error);
  }
};


export const ContactUs = async (req, res, next) => {
  try {
    const { name, email, phone, message, college } = req.body;

    if (!name && !email && !phone && !message && !college) {
      return res.status(200).json({ message: "Please fill all fields" });
    }

    const user2 = await prisma.contact.create({
      data: {
        name: name,
        email: email,
        phone: phone,
        message: message,
        college: college,
      },
    });

    return res.status(200).json({ message: "Done" });
  } catch (e) {
    return res.status(404).json({ message: e });
  }
};

export const getContactAll = async (req, res, next) => {
  const data = await prisma.Contact.findMany();

  return res.status(200).json({ data });
};
