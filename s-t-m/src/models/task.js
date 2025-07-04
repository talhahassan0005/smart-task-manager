import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: String,
  category: String,
  deadline: String,
  completed: Boolean,
}, { timestamps: true });

export default mongoose.models.Task || mongoose.model("Task", TaskSchema);
