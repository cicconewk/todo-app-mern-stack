const { model, Schema } = require("mongoose");

const taskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = model("Task", taskSchema);
