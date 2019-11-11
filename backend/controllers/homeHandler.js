let apiRes = require("../helpers/response");
var Task = require("../models/tasks");
var Moment = require("moment");

class homeHandler {
  index(req, res) {
    Task.find({}, function(err, data) {
      apiRes.successWithData(res, "Api Success", data);
    });
  }
  addTask(req, res) {
    console.log(req.body);
    var task = new Task();
    task.task = req.body.task;
    var priority = "dot " + req.body.priority;
    task.priority = priority;
    task.date = Moment().format("DD/MM");
    task.time = Moment().format("HH:MM");
    task.save(function(err, result) {
      if (err) {
        console.log(err);
        apiRes.error(res, "An error occured.");
      } else {
        Task.find({}, function(err, data) {
          apiRes.successWithData(res, "Api Success", data);
        });
      }
    });
  }
  deleteTask(req, res) {
    console.log(req.params);
    Task.findOneAndDelete({ _id: req.params.value }, function(err, data) {
      Task.find({}, function(err, data) {
        apiRes.successWithData(res, "Api Success", data);
      });
    });
  }
}

module.exports = homeHandler;
