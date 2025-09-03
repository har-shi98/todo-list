import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  status: { type: String, default: "verified" }, // default direct verified
  completedTask: { type: Number, default: 0}
},{timestamps:true}

);

export default mongoose.model("User", UserSchema);