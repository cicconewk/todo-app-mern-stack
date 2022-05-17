const express = require("express");
const router = express.Router();
const taskModel = require("../models/task");

router.get("/", async (_, res) => {
  const tasks = await taskModel.find();
  res.json(tasks);
});

router.post("/", async (req, res) => {
  const { title, description } = req.body;
  const task = new taskModel({ title, description });
  await task.save();
  res.json({
    message: "Task saved",
  });
});

router.put("/:id", async (req, res) => {
  const { title, description } = req.body;
  const newTask = { title, description };

  await taskModel.findByIdAndUpdate(req.params.id, newTask);

  res.json({
    message: "Task updated",
  });
});

router.delete("/:id", async (req, res) => {
  await taskModel.findByIdAndRemove(req.params.id);

  res.json({
    message: "Task deleted",
  });
});

router.get("/:id", async (req, res) => {
  const task = await taskModel.findById(req.params.id);

  res.json(task);
});

module.exports = router;
