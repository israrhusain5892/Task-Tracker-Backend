const User = require("../models/User");
const Project = require("../models/Project");

exports.createProject = async (req, res) => {
  const { title, userId } = req.body;
    const limit=process.env.PROJECT_MAX_LIMIT;
    
  try {
    const projectCount = await Project.countDocuments({ userId: req.params.userId });
    
    if (projectCount >= limit) {
      return res.status(400).json({ error: 'Maximum of 4 projects allowed.' });
    }
    const project = new Project({ title, userId: req.params.userId });
    await project.save();
    res.status(201).json(project);

  }
  catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
}
exports.getProject = async (req, res) => {
  try {
    const{userId}=req.params
    const projects = await Project.find({ userId });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}

exports.updateProject = async (req, res) => {
  const { title, status } = req.body;
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.projectId,
      { title, status, completedAt: status === 'completed' ? new Date() : null },
      { new: true }
    );
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
}

exports.deleteProject = async (req, res) => {
  try {
     await Project.findByIdAndDelete(req.params.projectId);
    res.json({message: 'Project deleted.' });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
}