// app/api/TaskForm/route.js
import { connectToDatabase } from "@/lib/mongodb";
import Task from "../../../models/task";

export async function GET() {
  await connectToDatabase();
  const tasks = await Task.find({});
  return Response.json(tasks);
}

export async function POST(req) {
  const body = await req.json();
  await connectToDatabase();
  const newTask = await Task.create(body);
  return Response.json(newTask);
}
