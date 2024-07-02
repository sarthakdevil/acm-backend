import { Router } from "express";
import { verifyToken } from "../jwt/jwt.js";

import { ContactUs } from "../controllers/user.controller.js";
const contact = new Router();
contact.post("/", verifyToken, ContactUs);

export default contact;
