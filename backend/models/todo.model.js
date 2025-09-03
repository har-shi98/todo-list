import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },   // ✅ yahi se pata chalega task done hai ya nahi
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

// export default mongoose.model("Todo", TodoSchema);

const Todo = mongoose.model("Todo", TodoSchema);
export default Todo;