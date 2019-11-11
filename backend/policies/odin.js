var log = require("../models/log");
var moment = require("moment");

function Today() {
  return (currentDate = moment().format("DD-MM-YYYY"));
}

function Time() {
  return (currentTime = moment().format("h:mm:ss"));
}

var odin = function(req, res, next) {
  log.create({
    property: req.url,
    date: String(Today()),
    time: String(Time())
  });
  next();
};

module.exports = odin;
