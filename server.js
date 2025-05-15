require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const {authenticateUser}=require("./middleWare/authMiddleWare");
const app = express();
connectDB();

app.use(cors());
// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/task",authenticateUser,require("./routes/taskRoutes"));
app.use("/project",authenticateUser,require("./routes/projectRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


