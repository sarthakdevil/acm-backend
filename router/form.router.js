import { Router } from "express";
import { createForm } from "../controllers/form.controller.js";
import { getRecordByACMId } from "../controllers/form.controller.js";
import { getAllRecords } from "../controllers/form.controller.js";

const formRouter = Router();

formRouter.post("/createRecord",createForm);
formRouter.get("/getRecord/:acmMemberShipId",getRecordByACMId);
formRouter.get("/getRecords",getAllRecords);

export default formRouter;