var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Photo = new Schema({
  name: String,
  date: String,
  time: String,
  imageURL: String,
  platform: String
});

module.exports = mongoose.model("Photo", Photo);
