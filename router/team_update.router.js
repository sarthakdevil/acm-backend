import { Router } from "express";
import { verifyToken } from "../jwt/jwt.js";
import { upload } from "../middlewares/multer.middleware.js";
import { getTeam, teamUpdate } from "../controllers/team.controller.js";

const teamRouter = new Router();
teamRouter.route("/").post(
  upload.fields([
    {
      name: "profile_image",
      maxCount: 1,
    },
  ]),
  verifyToken,
  teamUpdate,
);
teamRouter.get("/", verifyToken, getTeam);

export default teamRouter;
