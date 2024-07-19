import express, { Application } from "express";
import userRoutes from "./routes/user.route";
import businessRouter from "./routes/business.route";
import connectDB from "./config/db";

const app: Application = express();

async function main() {
  await connectDB();

  app.use(express.json());

  app.use("/api/user", userRoutes);
  app.use("/api/business", businessRouter);
}
main();

export default app;
