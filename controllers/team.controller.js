import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { generateToken } from "../jwt/jwt.js";
import cookieParser from "cookie-parser";
import { z } from "zod";

const prisma = new PrismaClient();

export const teamUpdate = async (req, res, next) => {
  const { position, socialLink } = req.body;

  const profile_image = req.files?.profile_image[0]?.path;

  console.log(position);
  console.log(profile_image);
  console.log(socialLink);

  if (!position && !socialLink && !profile_image) {
    return res.status(400).json({ message: "Please fill all details" });
  }

  await prisma.teamUpdate.create({
    data: {
      photoUrl: profile_image,
      position: position,
      socialLink: socialLink,
    },
  });

  return res.status(200).json({ message: "done" });
};

export const getTeam = async (req, res, next) => {
  const loginData = loginSchema.parse(req.body);
  const user = await prisma.user.findUnique({
    where: {
      username: loginData.username,
    },
  });

  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const data = await prisma.teamUpdate.findMany();

  return res.status(200).json({ data });
};

export const officeBearer = async (req, res, next) => {
  const { position, socialLink } = req.body;

  const profile_image = req.files?.profile_image[0]?.path;

  console.log(position);
  console.log(profile_image);
  console.log(socialLink);

  if (!position && !socialLink && !profile_image) {
    return res.status(400).json({ message: "Please fill all details" });
  }

  await prisma.officeBearer.create({
    data: {
      photoUrl: profile_image,
      position: position,
      socialLink: socialLink,
    },
  });

  return res.status(200).json({ message: "done" });
};

export const getBearer = async (req, res, next) => {
  const loginData = loginSchema.parse(req.body);
  const user = await prisma.user.findUnique({
    where: {
      username: loginData.username,
    },
  });

  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const data = await prisma.Office_bearer.findMany();

  return res.status(200).json({ data });
};
