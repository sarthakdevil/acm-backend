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

const registerSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

// Register route
export const register = async (req, res, next) => {
  try {
    const userData = registerSchema.parse(req.body);

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
    const loginData = loginSchema.parse(req.body);

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
