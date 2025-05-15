const express = require('express');
const Task = require('../models/Task');
const Project=require("../models/Project")
const mongoose = require('mongoose');
exports.createTask = async (req, res) => {
    const { title, description, status, projectId,userId } = req.body;
    try {
        const task = new Task({ title, description, status, projectId,userId });
        await task.save();
        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ error: 'Server error.' });
    }

}
// get all tasks by project Id
exports.getTasksByProjectId = async (req, res) => {

    try {
        const tasks = await Task.find({ projectId: req.params.projectId });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: 'Server error.' });
    }
}

exports.getTasksByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
   
    const tasks = await Task.find({ userId });
    
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error.', message: err.message });
  }
};
// update a task by task ID
exports.updateTask = async (req, res) => {
    const { title, description, status } = req.body;
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            { title, description, status, completedAt: status === 'completed' ? new Date() : null },
            { new: true }
        );
        res.json(task);
    } catch (err) {
        res.status(500).json({ error: 'Server error.' });
    }
}

// Delete a task
exports.deleteTask=async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted.' });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
}


// get all tasks
exports.getAllTasks= async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
}
}



// /get statistic sof user

exports.getStatics= async (req, res) => {
  try {
    // Fetch all project IDs associated with the user
    const projects = await Project.find({ userId: req.userId }, '_id');
    const projectIds = projects.map(project => project._id);

    // Aggregate tasks to count by status
    const statusCounts = await Task.aggregate([
      { $match: { projectId: { $in: projectIds } } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Transform the aggregation result into a more readable format
    const counts = statusCounts.reduce((acc, curr) => {
      acc[curr._id] = curr.count;
      return acc;
    }, {});

    res.json(counts);
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
}
