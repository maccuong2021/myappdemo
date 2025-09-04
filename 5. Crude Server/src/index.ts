import "reflect-metadata";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { AppDataSource } from "./data-source";
import resourceRoutes from "./routes/resource";
import { setupSwagger } from "./swagger";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

setupSwagger(app);

app.get("/", (_req, res) => res.json({ status: "ok" }));
app.use("/resources", resourceRoutes);

const port = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("✅ Connected to SQL Server");
    app.listen(port, () => {
      console.log(`🚀 Server running at http://localhost:${port}`);
      console.log(`📄 Swagger docs available at http://localhost:${port}/api-docs`);
    });
  })
  .catch((err) => {
    console.error("❌ DB connection error:", err);
    process.exit(1);
  });
