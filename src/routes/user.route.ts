import { Router } from "express";
import { getUser } from "../controllers/user.controller";

const userRouter = Router();
// userRouter.get("/", getToken);
// userRouter.post("/", registerUser);
userRouter.get("/:id", getUser);

export default userRouter;
