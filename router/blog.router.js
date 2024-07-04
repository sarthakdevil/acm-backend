import { Router } from "express";
import { verifyToken } from "../jwt/jwt.js";
import {blogcreate, blogdelete, blogupdate,blogverify} from "../controllers/blogcreate.js"
import { isAdmin } from "../middlewares/isadmin.middleware.js";
import {upload} from "../middlewares/multer.middleware.js";
const blogrouter = new Router()

blogrouter.post("/blogmaker",verifyToken,upload.single('Image'),blogcreate)
blogrouter.put("/blog/:id",verifyToken,upload.single("Image"),blogupdate)
blogrouter.delete("/blog/:id",[verifyToken,isAdmin],blogdelete)
blogrouter.get("/blogverify",verifyToken)
blogrouter.post("/blogverify",verifyToken,isAdmin,blogverify)

export default blogrouter