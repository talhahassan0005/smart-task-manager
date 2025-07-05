'use client';
import { useState, useEffect } from 'react';

export default function TaskForm({ onAdd, editingTask, setEditingTask }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Work');
  const [description, setDescription] = useState(''); // ✅
  const [priority, setPriority] = useState('Medium'); // ✅
  const [deadline, setDeadline] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setCategory(editingTask.category);
      setDescription(editingTask.description || '');
      setPriority(editingTask.priority || 'Medium');
      setDeadline(editingTask.deadline);
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = {
      title,
      category,
      description, // ✅
      priority,    // ✅
      deadline,
      completed: editingTask ? editingTask.completed : false,
    };

    if (editingTask) {
      onAdd(newTask, editingTask.index);
      setEditingTask(null);
    } else {
      onAdd(newTask);
    }

    // Reset form
    setTitle('');
    setCategory('Work');
    setDescription('');
    setPriority('Medium');
    setDeadline('');
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-2">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Task Title"
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
        </div>

        {/* New Fields Row */}
        <div className="row g-2 mt-2">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <select
              className="form-select"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
          <div className="col-md-3">
            <button type="submit" className="btn btn-primary w-100">
              {editingTask ? 'Update' : 'Add'} Task
            </button>
          </div>
        </div>
      </form>

      {editingTask && (
        <button
          className="btn btn-secondary mb-4"
          onClick={() => {
            setEditingTask(null);
            setTitle('');
            setCategory('Work');
            setDescription('');
            setPriority('Medium');
            setDeadline('');
          }}
        >
           Cancel Edit
        </button>
      )}
    </>
  );
}
