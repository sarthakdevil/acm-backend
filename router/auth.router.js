import { Router } from "express";
import login from './controllers'
const router = new Router()
router.post('/login',login)