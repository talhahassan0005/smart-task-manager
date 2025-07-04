import { connectToDatabase } from "@/lib/mongodb";
import Task from "@/models/task";
import { NextResponse } from "next/server";

// ✅ Update Task (Edit / Mark as Done)
export async function PUT(req, context) {
  try {
    const { id } = context.params; // ✅ Correct way
    const body = await req.json();
    await connectToDatabase();

    const updatedTask = await Task.findByIdAndUpdate(id, body, { new: true });

    if (!updatedTask) {
      return new Response("Task not found", { status: 404 });
    }

    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error("❌ PUT Error:", error);
    return new Response("Failed to update task", { status: 500 });
  }
}


// ✅ Delete Task
export async function DELETE(req, { params }) {
  try {
    const { id } = await context.params;
    await connectToDatabase();

    const deleted = await Task.findByIdAndDelete(id);

    if (!deleted) {
      return new Response("Task not found", { status: 404 });
    }

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("❌ DELETE Error:", error);
    return new Response("Failed to delete task", { status: 500 });
  }
}
