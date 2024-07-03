import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import errorHandler from "./utils/error.utils.js";
import authRouter from "./router/auth.router.js";
import blogRouter from "./router/blog.router.js";
import memberRouter from "./router/acmmembers.router.js";
import { PrismaClient } from "@prisma/client";
import cookieParser from "cookie-parser";
import announcerouter from "./router/announcement.router.js";
import contactrouter from "./router/contact.router.js";

import teamRouter from "./router/team_update.router.js";

const prisma = new PrismaClient();
dotenv.config();
const app = express();

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: "*", // Allow requests from any origin
  methods: "GET,POST", // Allow only GET and POST requests
  credentials: true, // Allow cookies to be sent to the client
};

app.use(cors(corsOptions));
app.use("/uploads", express.static("uploads"));
// Debugging middleware to log headers and body
app.use((req, res, next) => {
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  next();
});

// Routes
app.get("/ping", (req, res) => {
  console.log("Ping received");
  const pong = new Date().toISOString();
  res.send(pong);
});

app.use("/api/auth", authRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/members", memberRouter);
app.use("/api/announcement", announcerouter);
app.use("/api/contact", contactrouter);
app.use("/api/team_update", teamRouter);

app.get("*", async (req, res) => {
  try {
    // Increment the visitor count
    await prisma.VisitorCount.update({
      where: { id: 1 }, // Assuming the visitor count is stored with ID 1
      data: { count: { increment: 1 } },
    });

    // Retrieve the updated visitor count
    const updatedVisitorCount = await prisma.VisitorCount.findUnique({
      where: { id: 1 },
    });

    console.log(`Visitor Count: ${updatedVisitorCount.count}`);

    // Send the response
    res.status(404).send("404 Not Found");
  } catch (error) {
    console.error("Error updating visitor count:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Error handling middleware
app.use(errorHandler);

export default app;
