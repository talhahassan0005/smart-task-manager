'use client';
import { useState } from 'react';

export default function TaskList({ tasks, onDelete, onEdit, onComplete }) {
  const [filterCategory, setFilterCategory] = useState("All");
  const [deadlineFilter, setDeadlineFilter] = useState("All");

  // 🔍 Filter logic for deadline
  const isDeadlineMatch = (task) => {
    if (!task.deadline) return deadlineFilter === "No Deadline";

    const today = new Date();
    const due = new Date(task.deadline);
    const diff = Math.floor((due - today) / (1000 * 60 * 60 * 24));

    switch (deadlineFilter) {
      case "Overdue":
        return diff < 0 && !task.completed;
      case "Due Today":
        return diff === 0 && !task.completed;
      case "Due Tomorrow":
        return diff === 1 && !task.completed;
      case "Future":
        return diff > 1;
      case "No Deadline":
        return !task.deadline;
      default:
        return true;
    }
  };

  // 🔍 Combined filter
  const filteredTasks = tasks.filter(task =>
    (filterCategory === "All" || task.category === filterCategory) &&
    isDeadlineMatch(task)
  );

  const getDeadlineStatus = (deadline, completed) => {
    if (completed) return "✅ Completed";
    if (!deadline) return "⏳ No deadline";

    const today = new Date();
    const due = new Date(deadline);
    const diff = Math.floor((due - today) / (1000 * 60 * 60 * 24));

    if (diff < 0) return "❗ Overdue";
    if (diff === 0) return "⚠️ Due Today";
    if (diff === 1) return "⏰ Due Tomorrow";
    return `🕒 ${diff} days left`;
  };

  const getCategoryBadge = (category) => {
    switch (category) {
      case 'Work': return 'bg-primary';
      case 'Personal': return 'bg-success';
      case 'Learning': return 'bg-info text-dark';
      default: return 'bg-secondary';
    }
  };

  return (
    <div>
      {/* 🔘 Filter Controls */}
      <div className="row g-3 align-items-center mb-4">
        <div className="col-md-6">
          <label className="form-label">Filter by Category:</label>
          <select
            className="form-select"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option>All</option>
            <option>Work</option>
            <option>Personal</option>
            <option>Learning</option>
          </select>
        </div>

        <div className="col-md-6">
          <label className="form-label">Filter by Deadline:</label>
          <select
            className="form-select"
            value={deadlineFilter}
            onChange={(e) => setDeadlineFilter(e.target.value)}
          >
            <option>All</option>
            <option>Overdue</option>
            <option>Due Today</option>
            <option>Due Tomorrow</option>
            <option>Future</option>
            <option>No Deadline</option>
          </select>
        </div>
      </div>

      {/* 📝 Task List */}
      {filteredTasks.length === 0 ? (
        <div className="alert alert-info">
          No tasks match your filters.
        </div>
      ) : (
        <div className="list-group">
          {filteredTasks.map((task, idx) => (
            <div
              key={idx}
              className={`list-group-item d-flex justify-content-between align-items-start ${task.completed ? 'bg-light' : ''}`}
            >
              <div className="flex-grow-1 pe-3">
                <div className="d-flex align-items-center justify-content-between">
                  <h6
                    className={`mb-1 ${task.completed ? 'text-decoration-line-through text-muted' : ''}`}
                  >
                    {task.title}
                  </h6>
                  <span className={`badge ${getCategoryBadge(task.category)}`}>
                    {task.completed ? "✅ Done" : task.category}
                  </span>
                </div>
                <small className="text-muted">{getDeadlineStatus(task.deadline, task.completed)}</small>
              </div>

              <div className="d-flex gap-2">
                <button
                  className="btn btn-sm btn-success"
                  onClick={() => onComplete(idx)}
                  disabled={task.completed}
                  title="Mark as Done"
                >
                  ✅Done
                </button>
                <button
                  className="btn btn-sm btn-warning"
                  onClick={() => onEdit(idx)}
                  title="Edit Task"
                >
                  ✏️Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => onDelete(idx)}
                  title="Delete Task"
                >
                  ❌Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
