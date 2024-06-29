import { Router } from "express";
import { verifyToken } from "../jwt/jwt.js";
import { announcementdelete, announcementupdate, makeannouncement, viewallannouncement, viewannouncement } from "../controllers/announcement.controller.js";
import { isAdmin } from "../middlewares/isadmin.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
const announcerouter = new Router();

announcerouter.post('/makeannouncement',verifyToken,upload.single('image'),makeannouncement);
announcerouter.get('/getannouncement/:id',verifyToken,viewannouncement);
announcerouter.get('/getannouncements',verifyToken,viewallannouncement)
announcerouter.delete('/delete/:id',verifyToken,isAdmin,announcementdelete)
announcerouter.put('/delete/:id',verifyToken,announcementupdate)

export default announcerouter;