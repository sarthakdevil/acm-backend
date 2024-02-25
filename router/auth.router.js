import { Router } from "express";
import {register,login,logout} from '../controllers/user.controller.js'
import { certificategenerator } from "../controllers/certificate.controller.js";
const router = new Router()
router.post('/register',register)
router.post('/login',login)
router.get('/logout',logout)
router.get('/generate-certificates',certificategenerator)
export default router;