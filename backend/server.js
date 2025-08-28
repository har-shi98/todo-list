import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import todoRoutes from "./routes/todo.route.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // CORS enable karna zaruri hai
app.use(express.json()); // JSON body parsing

connectDB(); // MongoDB connect server start hone se pehle

app.use("/api/todos", todoRoutes);

const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});