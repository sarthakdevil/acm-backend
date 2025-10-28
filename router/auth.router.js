import { Router } from "express";
import {register,login,logout,updateUser,deleteUser,resetPassword,fetchAllUsers} from '../controllers/user.controller.js'
import { certificategenerator } from "../controllers/certificate.controller.js";
import { verifyToken } from "../jwt/jwt.js";
import { isAdmin } from "../middlewares/isadmin.middleware.js";
import { validate } from "../middlewares/validator.middleware.js";
import { registerSchema,loginSchema,passwordSchema,updateUserSchema } from "../schemas/user.schema.js";

const router = new Router()
router.post('/register' , validate(registerSchema) ,register)
router.post('/login' , validate(loginSchema), login)
router.get('/logout' , logout)
router.put('/reset-password' , validate(passwordSchema) , verifyToken , resetPassword)
router.put('/user/:Sno' ,validate(updateUserSchema) ,verifyToken ,isAdmin , updateUser)
router.delete('/user/:Sno' , verifyToken , isAdmin , deleteUser)
router.get('/users', verifyToken , isAdmin , fetchAllUsers);
router.get('/generate-certificates' , certificategenerator)
export default router;