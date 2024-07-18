import express, { Application } from "express";
import userRoutes from "./routes/user.route";

const app: Application = express();

app.use(express.json());

app.use("/api/users", userRoutes);

export default app;
