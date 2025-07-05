import { connectToDatabase } from "@/lib/mongodb";
import Task from "@/models/task";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server"; // ✅ Correct one

// ✅ GET: Fetch tasks for logged-in user
export async function GET(req) {
  try {
    const { userId } = getAuth(req); // ✅ Must pass `req` in Route Handlers

    if (!userId) return new Response("Unauthorized", { status: 401 });

    await connectToDatabase();
    const tasks = await Task.find({ userId });
    return NextResponse.json(tasks);
  } catch (error) {
    console.error("❌ GET Error:", error);
    return new Response("Failed to fetch tasks", { status: 500 });
  }
}

// ✅ POST: Create task for logged-in user
export async function POST(req) {
  try {
    const { userId } = getAuth(req);
    if (!userId) return new Response("Unauthorized", { status: 401 });

    const body = await req.json();
    const taskData = { ...body, userId };

    await connectToDatabase();
    const newTask = await Task.create(taskData);
    return NextResponse.json(newTask);
  } catch (error) {
    console.error("❌ POST Error:", error);
    return new Response("Failed to create task", { status: 500 });
  }
}
