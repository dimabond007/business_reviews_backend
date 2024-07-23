import express, { Application } from "express";
import userRoutes from "./routes/user.route";
import businessRouter from "./routes/business.route";
import connectDB from "./config/db";
import cors from "cors";
import path from 'path';

const app: Application = express();

async function main() {
  await connectDB();
  
  app.use(express.json());
  app.use(cors({}));

  const publicPath = path.join(__dirname, 'public');
  app.use(express.static(publicPath));

  app.use("/api/user", userRoutes);
  app.use("/api/business", businessRouter);

  app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
  });
}

main();

export default app;