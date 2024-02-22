import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { generateToken } from '../jwt/jwt.js';
import cookieParser from 'cookie-parser';
const cookieoptions={
  httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Set secure flag in production
            sameSite: 'strict', // Set Same Site to Strict mode (recommended)
            maxAge: 3600000, // Set expiration time for the cookie (1 hour in milliseconds)
}
const prisma = new PrismaClient();

//creating register route
export const register = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  try {
    // Hashing password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        role: 'USER',
      },
    });

    // Generate JWT token with the user's ID
    const token = generateToken(user);
    console.log(token);
    res.cookie('token', token,cookieoptions)

    return res.status(201).json({ message: "User created successfully", user, token });
  } catch (err) {
    next(err); // Pass any errors to the error handling middleware
  }
};


//creating login route
export const login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
      // Find user by username
      const user = await prisma.user.findUnique({
          where: {
              username,
          },
      });

      if (!user) {
          return res.status(401).json({ message: "Invalid username or password" });
      }

      // Compare password with hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
          return res.status(401).json({ message: "Invalid username or password" });
      }

      // Generate JWT token with the user's ID
      const token = generateToken(user);

      console.log(token);

      res.cookie('token', token,cookieoptions)
      // Send JWT token back to the client
      res.json({ message: "Login successful", user, token });
  } catch (error) {
      next(error); // Pass any errors to the error handling middleware
  }
};
export const logout = async (req, res, next) => {
  try {
      // Clear the JWT token from the client-side (e.g., remove it from local storage or cookies)
      // For example, if using cookies:
      res.clearCookie('token');
      
      // Send a response indicating successful logout
      res.status(200).json({ message: "Logout successful" });
  } catch (error) {
      // If an error occurs during logout, pass it to the error handling middleware
      next(error);
  }
};


