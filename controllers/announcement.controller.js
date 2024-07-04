import express from 'express';

import  { z } from 'zod';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Schema definitions
const eventSchema = z.object({
  name: z.string().nonempty("Name is required"),
  description: z.string().nonempty("Description is required"),
  startDate: z.string().optional(), // Assuming date is sent as a string in ISO format
  endDate: z.string().optional(), // Assuming date is sent as a string in ISO format
  button1Text: z.string().nonempty("Button1 text is required"),
  button1Link: z.string().url().nonempty("Button1 link is required"),
  button2Text: z.string().nonempty("Button2 text is required"),
  button2Link: z.string().url().nonempty("Button2 link is required"),
  partners: z.string().nonempty("Partners are required"),
  speakers: z.string().nonempty("Speakers are required"),
  poster: z.string().optional(), // Assuming this is a URL or a path to the poster
  year: z.number().int().nonnegative("Year is required"),
  time: z.string().optional(),
});

const eventUpdateSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  startDate: z.string().optional(), // Assuming date is sent as a string in ISO format
  endDate: z.string().optional(), // Assuming date is sent as a string in ISO format
  button1Text: z.string().optional(),
  button1Link: z.string().url().optional(),
  button2Text: z.string().optional(),
  button2Link: z.string().url().optional(),
  partners: z.string().optional(),
  speakers: z.string().optional(),
  poster: z.string().optional(), // Assuming this is a URL or a path to the poster
  year: z.number().int().nonnegative().optional(),
  time: z.string().optional(),
});
// Create event
export const makeannouncement = async (req,res,next)=>{
  const posterPath = req.file ? req.file.path : undefined;
  const data = {
    name: req.body.name,
    description: req.body.description,
    startDate: req.body.startDate || '0',
    endDate: req.body.endDate || '0',
    button1Text: req.body.button1Text,
    button1Link: req.body.button1Link,
    button2Text: req.body.button2Text,
    button2Link: req.body.button2Link,
    partners: req.body.partners,
    speakers: req.body.speakers,
    poster: posterPath, // Use the path from Multer
    year: Number(req.body.year),
    time: req.body.time
  };
  console.log(data);

  try {
    // Validate the request body
    const parsed = eventSchema.parse(data);
    console.log(parsed);
    const event = await prisma.event.create(parsed);

    return res.status(200).json({ success: true, data: event });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: err.errors });
    }
    console.error(err);
    return res.status(400).json({ success: false, error: "Failed To Create Event" });
  }
};

// Update event
export const announcementupdate = async (req,res,next)=>{
  const sno = Number(req.params.id);
  try {
    // Validate the request body
    const validatedData = eventUpdateSchema.parse(req.body);
    const posterPath = req.file ? req.file.path : undefined;

    const updateData = {
      ...validatedData,
      ...(validatedData.startDate && { startDate: new Date(validatedData.startDate) }),
      ...(validatedData.endDate && { endDate: new Date(validatedData.endDate) }),
    };

    // If a new poster was uploaded, add it to the update data
    if (posterPath) {
      updateData.poster = posterPath;
    }

    // Update the announcement in the database
    const updatedAnnouncement = await prisma.event.update({
      where: { sno },
      data: updateData,
    });

    res.status(200).json({ message: "Update successful", updatedAnnouncement });
  } catch (e) {
    res.status(400).json({ message: "Update failed", errors: e.errors });
  }
};

// Delete event
export const announcementdelete = async (req,res,next)=>{
  const sno = Number(req.params.id);
  try {
    await prisma.event.delete({ where: { sno } });

    res.status(200).json({ success: true, message: 'Deleted Successfully' });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ success: false, error: "Failed To Delete Event" });
  }
};

// View all events
export const viewallannouncements = async (req,res,next)=>{
  try {
    const events = await prisma.event.findMany();

    return res.status(200).json({ success: true, data: events });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ success: false, error: "Failed To View Events" });
  }
};

// View a single event
export const viewannouncement= async (req,res)=>{
  const sno = Number(req.params.id);
  try {
    const event = await prisma.event.findUnique({
      where: { sno },
    });

    if (!event) {
      return res.status(404).json({ success: false, error: "Event Not Found" });
    }

    return res.status(200).json({ success: true, data: event });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ success: false, error: "Failed To View Event" });
  }
};