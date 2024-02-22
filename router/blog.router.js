import { Router } from "express";
import { verifyToken } from "../jwt/jwt.js";
import {blogcreate} from "../controllers/blogcreate.js"
import { isAdmin } from "../middlewares/isadmin.middleware.js";
import {upload} from "../middlewares/multer.middleware.js";
const blogrouter = new Router()
blogrouter.post("/blogmaker",upload.single('image'),blogcreate)
export default blogrouter