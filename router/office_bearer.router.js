import { Router } from "express";
import { verifyToken } from "../jwt/jwt.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
  getBearer,
  getTeam,
  officeBearer,
  teamUpdate,
} from "../controllers/team.controller.js";

const team = new Router();
team.route("/").post(
  upload.fields([
    {
      name: "profile_image",
      maxCount: 1,
    },
  ]),
  verifyToken,
  officeBearer,
);
team.get("/", verifyToken, getBearer);

export default officeBearer;
