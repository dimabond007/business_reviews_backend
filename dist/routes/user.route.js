"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const userRouter = (0, express_1.Router)();
userRouter.get("/", auth_middleware_1.verifyToken, user_controller_1.getUserById);
userRouter.post("/login", user_controller_1.login);
userRouter.post("/register", user_controller_1.register);
exports.default = userRouter;
//mkm
//# sourceMappingURL=user.route.js.map