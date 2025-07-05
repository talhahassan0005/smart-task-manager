// models/task.js
import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    enum: ["Work", "Personal", "Learning"],
    default: "Work",
  },
  deadline: {
    type: String, // you can also use Date type if preferred
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Medium",
  },
  completed: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: String, // Clerk user ID
    required: true,
  }
}, { timestamps: true });

export default mongoose.models.Task || mongoose.model("Task", TaskSchema);
