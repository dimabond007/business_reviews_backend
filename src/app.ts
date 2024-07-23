import express, { Application } from "express";
import userRoutes from "./routes/user.route";
import businessRouter from "./routes/business.route";
import connectDB from "./config/db";
import cors from "cors";

const app: Application = express();

async function main() {
  await connectDB();
  app.use(express.static("public"));
  app.use(express.json());
  app.use(cors({}));

  const path = require("path");

  app.use("/api/user", userRoutes);
  app.use("/api/business", businessRouter);

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  });
}
main();

export default app;
//f5r
