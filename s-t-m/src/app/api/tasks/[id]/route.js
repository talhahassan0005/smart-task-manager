import { connectToDatabase } from "@/lib/mongodb";
import Task from "@/models/task";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server"; // ✅ Correct import

// ✅ PUT: Update a task
export async function PUT(req, context) {
  try {
    const { userId } = getAuth(req); // ✅ Correct usage
    if (!userId) return new Response("Unauthorized", { status: 401 });

    const { id } = context.params;
    const body = await req.json();

    await connectToDatabase();

    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, userId },
      body,
      { new: true }
    );

    if (!updatedTask) {
      return new Response("Task not found or unauthorized", { status: 404 });
    }

    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error("❌ PUT Error:", error);
    return new Response("Failed to update task", { status: 500 });
  }
}

// ✅ DELETE: Delete a task
export async function DELETE(req, context) {
  try {
    const { userId } = getAuth(req); // ✅ Correct usage
    if (!userId) return new Response("Unauthorized", { status: 401 });

    const { id } = context.params;

    await connectToDatabase();

    const deleted = await Task.findOneAndDelete({ _id: id, userId });

    if (!deleted) {
      return new Response("Task not found or unauthorized", { status: 404 });
    }

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("❌ DELETE Error:", error);
    return new Response("Failed to delete task", { status: 500 });
  }
}
