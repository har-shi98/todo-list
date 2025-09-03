import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import todoRoutes from "./routes/todo.route.js";
import userRoutes from "./routes/user.route.js";

dotenv.config();
const app = express();

connectDB();

app.use(cors({origin: 'http://localhost:5173', credentials: true})); // frontend ka origin yahan dalna hoga     
app.use(express.json());

app.use("/api/todos", todoRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));