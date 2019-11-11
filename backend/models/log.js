var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Log = new Schema({
  property: String,
  date: String,
  time: String
});

module.exports = mongoose.model("Log", Log);
