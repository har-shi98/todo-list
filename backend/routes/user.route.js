import express from "express";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { authMiddleware } from "../middleware/auth.js";


const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ error: "Missing fields" });

  const existing = await User.findOne({ email });
  if (existing)
    return res.status(400).json({ error: "Email already registered" });

  const hash = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    password: hash,
  });
  await user.save();

  res.json({ message: "Registered successfully", email });
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ error: "Invalid password" });

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token, name: user.name, email: user.email });
});

export default router;
