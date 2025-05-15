const express = require("express");
const { createProject,getProject,updateProject,deleteProject } = require("../controllers/projectController");
const router = express.Router();

router.post("/:userId", createProject);
router.get("/:userId",getProject);
router.put("/:projectId",updateProject);
router.delete("/:projectId",deleteProject);

module.exports = router;
