var mongoose = require("mongoose");

var TaskSchema = new mongoose.Schema({
  task: String,
  priority: String,
  date: String,
  time: String
});

module.exports = mongoose.model("Task", TaskSchema);
