import { Router } from "express";
import { createForm } from "../controllers/form.controller.js";

const formRouter = Router();
formRouter.post("/",createForm);

export default formRouter;