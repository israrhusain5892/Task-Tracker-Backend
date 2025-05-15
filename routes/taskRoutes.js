const express = require("express");
const { createTask, getTasksByProjectId, deleteTask, updateTask, getStatics,getAllTasks,getTasksByUserId} = require("../controllers/taskController");
const router = express.Router();

router.post("/", createTask);
router.get("/:projectId", getTasksByProjectId);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.get("/statics", getStatics);
router.get("/",getAllTasks);
router.get("/user/:userId",getTasksByUserId)



module.exports = router;
