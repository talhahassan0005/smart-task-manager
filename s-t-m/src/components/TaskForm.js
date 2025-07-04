'use client';
import { useState, useEffect } from 'react';

export default function TaskForm({ onAdd, editingTask, setEditingTask }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Work');
  const [deadline, setDeadline] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setCategory(editingTask.category);
      setDeadline(editingTask.deadline);
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = {
      title,
      category,
      deadline,
      completed: editingTask ? editingTask.completed : false,
    };

    if (editingTask) {
      onAdd(newTask, editingTask.index);
      setEditingTask(null);
    } else {
      onAdd(newTask);
    }

    // Clear form
    setTitle('');
    setCategory('Work');
    setDeadline('');
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-2">
          <div className="col-md-4">
            <input
              type="text"
              placeholder="Task Title"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="col-md-3">
            <select
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Work</option>
              <option>Personal</option>
              <option>Learning</option>
            </select>
          </div>
          <div className="col-md-3">
            <input
              type="date"
              className="form-control"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-primary w-100">
              {editingTask ? 'Update' : 'Add'} Task
            </button>
          </div>
        </div>
      </form>

      {editingTask && (
        <div className="mb-4">
          <button
            className="btn btn-secondary"
            onClick={() => {
              setEditingTask(null);
              setTitle('');
              setCategory('Work');
              setDeadline('');
            }}
          >
            ❌ Cancel Edit
          </button>
        </div>
      )}
    </>
  );
}
