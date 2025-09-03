import express from "express";
import Todo from "../models/todo.model.js";
import User from "../models/user.model.js";  // agar completedTask count update karna ho
import { authMiddleware } from "../middleware/auth.js"; // JWT middleware

const router = express.Router();

// ✅ Get logged-in user's todos
router.get("/", authMiddleware, async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.id }); // sirf us user ke todos
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Add a new todo
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    const todo = new Todo({
      text,
      completed: false,
      userId: req.user.id, // ✅ Logged-in user ka ID link karo
    });

    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Update a todo (text and/or completed)
router.patch("/:id", authMiddleware, async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, userId: req.user.id });
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    const prevCompleted = todo.completed;

    if (req.body.text !== undefined) {
      todo.text = req.body.text;
    }
    if (req.body.completed !== undefined) {
      todo.completed = req.body.completed;
    }

    const updatedTodo = await todo.save();

    // ✅ Agar completedTask count update karna hai to:
    if (req.body.completed !== undefined) {
      const user = await User.findById(req.user.id);
      if (user) {
        if (!prevCompleted && todo.completed) {
          user.completedTask += 1;
        } else if (prevCompleted && !todo.completed) {
          user.completedTask -= 1;
        }
        await user.save();
      }
    }

    res.json(updatedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ Delete a todo
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!todo) return res.status(404).json({ message: "Todo not found" });

    // ✅ Agar completedTask count update karna hai to:
    if (todo.completed) {
      const user = await User.findById(req.user.id);
      if (user) {
        user.completedTask -= 1;
        await user.save();
      }
    }

    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get only completed todos of logged-in user
router.get("/completed", authMiddleware, async (req, res) => {
  try {
    const completed = await Todo.find({ userId: req.user.id, completed: true });
    res.json(completed);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
