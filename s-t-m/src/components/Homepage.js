'use client';

import { useState, useEffect } from 'react';
import { useUser, SignOutButton } from '@clerk/nextjs';
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";

export default function MainPage() {
  const { user } = useUser();
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [notifications, setNotifications] = useState([]);

  // ✅ GET all tasks on page load
useEffect(() => {
  if (!user) return;
  fetch('/api/tasks') // 🟢 Will only return YOUR tasks
    .then(res => res.json())
    .then(data => setTasks(data));
}, [user]);


  // ✅ Check for upcoming deadlines
  useEffect(() => {
    const today = new Date();
    const alerts = [];

    tasks.forEach(task => {
      if (!task.deadline || task.completed) return;

      const due = new Date(task.deadline);
      const diff = Math.floor((due - today) / (1000 * 60 * 60 * 24)); // Days difference

      if (diff === 0) {
        alerts.push(`⚠️ "${task.title}" is due today.`);
      } else if (diff === 1) {
        alerts.push(`⏰ "${task.title}" is due tomorrow.`);
      }
    });

    setNotifications(alerts);
  }, [tasks]);

  // ✅ Add or update a task
  const addTask = async (task, index = null) => {
    const headers = { 'Content-Type': 'application/json' };

    if (index !== null) {
      const id = tasks[index]._id;
      const res = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(task),
      });

      const updated = await res.json();
      const newTasks = [...tasks];
      newTasks[index] = updated;
      setTasks(newTasks);
    } else {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers,
        body: JSON.stringify(task),
      });

      const newTask = await res.json();
      setTasks([...tasks, newTask]);
    }
  };

  const editTask = (index) => {
    setEditingTask({ ...tasks[index], index });
  };

  const deleteTask = async (index) => {
    const id = tasks[index]._id;
    await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const markComplete = async (index) => {
    const id = tasks[index]._id;
    const updatedTask = { ...tasks[index], completed: true };

    const res = await fetch(`/api/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTask),
    });

    const data = await res.json();
    const updatedTasks = [...tasks];
    updatedTasks[index] = data;
    setTasks(updatedTasks);
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-center mb-0">📝 Smart Task Manager</h2>

        {/* ✅ Custom Logout Button */}
        <SignOutButton>
          <button className="btn btn-outline-danger">Logout</button>
        </SignOutButton>
      </div>

      {/* 🔔 Show deadline notifications */}
      {notifications.length > 0 && (
        <div className="alert alert-warning">
          <strong>Upcoming Deadlines:</strong>
          <ul className="mb-0">
            {notifications.map((note, i) => (
              <li key={i}>{note}</li>
            ))}
          </ul>
        </div>
      )}

      <TaskForm
        onAdd={addTask}
        editingTask={editingTask}
        setEditingTask={setEditingTask}
      />

      <TaskList
        tasks={tasks}
        onEdit={editTask}
        onDelete={deleteTask}
        onComplete={markComplete}
      />
    </div>
  );
}
// This code defines the main homepage of the Smart Task Manager application.
// It includes functionality for displaying tasks, adding new tasks, editing existing tasks, deleting tasks,