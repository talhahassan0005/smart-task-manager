import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: String,
  category: String,
  deadline: String,
  completed: Boolean,
  userId: {
    type: String,
    required: true, // 👈 ensure it's always provided
  },
}, { timestamps: true });

export default mongoose.models.Task || mongoose.model("Task", TaskSchema);
