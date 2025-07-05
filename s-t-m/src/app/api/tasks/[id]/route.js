import { connectToDatabase } from "@/lib/mongodb";
import Task from "@/models/task";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

// ✅ PUT: Update task
export async function PUT(req, { params }) {
  try {
    const { id } = await params; // Await the params object
    
    const { userId } = getAuth(req);
    if (!userId) return new Response("Unauthorized", { status: 401 });

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
    return new Response("Internal Server Error", { status: 500 });
  }
}

// ✅ DELETE: Delete task
export async function DELETE(req, { params }) {
  try {
    const { id } = await params; // Await the params object
    
    const { userId } = getAuth(req);
    if (!userId) return new Response("Unauthorized", { status: 401 });

    await connectToDatabase();

    const deleted = await Task.findOneAndDelete({ _id: id, userId });

    if (!deleted) {
      return new Response("Task not found or unauthorized", { status: 404 });
    }

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
}