const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
  try {
    const filter = req.user.role === 'admin' ? {} : { user: req.user.userId };
    const tasks = await Task.find(filter).populate('user', 'username');
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const task = new Task({ ...req.body, user: req.user.userId });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task || (req.user.role !== 'admin' && task.user.toString() !== req.user.userId)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    Object.assign(task, req.body);
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task || (req.user.role !== 'admin' && task.user.toString() !== req.user.userId)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    await task.remove();
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};