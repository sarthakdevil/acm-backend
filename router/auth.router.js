import { Router } from "express";
import {register,login,logout} from '../controllers/user.controller.js'
import { verifyToken } from "../jwt/jwt.js";
const router = new Router()
router.post('/register',register)
router.post('/login',login)
router.get('/logout',logout)

export default router;