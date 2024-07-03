import { Router } from "express";
import { verifyToken } from "../jwt/jwt.js";

import { ContactUs, getContactAll } from "../controllers/user.controller.js";
const contact = new Router();
contact.post("/", verifyToken, ContactUs);
contact.get("/", verifyToken, getContactAll);
export default contact;
