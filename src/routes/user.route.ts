import { Router } from "express";
import { login, register } from "../controllers/user.controller";

const userRouter = Router();
userRouter.get("/", login);
userRouter.post("/", register);

export default userRouter;
