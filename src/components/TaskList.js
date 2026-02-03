import React, { useState, useEffect } from 'react';
import API from '../api';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', status: 'pending' });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await API.get('/tasks');
      setTasks(res.data);
    } catch (error) {
      setMessage(error.response?.data?.error || 'Failed to fetch tasks');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await API.put(`/tasks/${editingId}`, form);
        setMessage('Task updated successfully');
      } else {
        await API.post('/tasks', form);
        setMessage('Task created successfully');
      }
      setForm({ title: '', description: '', status: 'pending' });
      setEditingId(null);
      fetchTasks();
    } catch (error) {
      setMessage(error.response?.data?.error || 'Operation failed');
    }
  };

  const handleEdit = (task) => {
    setForm({ title: task.title, description: task.description, status: task.status });
    setEditingId(task._id);
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      setMessage('Task deleted successfully');
      fetchTasks();
    } catch (error) {
      setMessage(error.response?.data?.error || 'Delete failed');
    }
  };

  return (
    <div>
      <h3>Tasks</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
        <button type="submit">{editingId ? 'Update' : 'Create'} Task</button>
        {editingId && <button onClick={() => { setEditingId(null); setForm({ title: '', description: '', status: 'pending' }); }}>Cancel</button>}
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <strong>{task.title}</strong> - {task.description} ({task.status})
            <button onClick={() => handleEdit(task)}>Edit</button>
            <button onClick={() => handleDelete(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <p>{message}</p>
    </div>
  );
}

export default TaskList;