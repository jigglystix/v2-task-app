var express = require("express");
var router = express.Router();
var photo = require("../models/photos");
var moment = require("moment");

function Today() {
  return (currentDate = moment().format("DD-MM-YYYY"));
}

function Time() {
  return (currentTime = moment().format("h:mm:ss"));
}

/* GET home page. */
router.get("/all", function(req, res, next) {
  photo
    .find({})
    .sort({ time: "descending" })
    .exec(function(err, photos) {
      if (err) {
        console.error(err);
      }
      res.json(photos);
    });
});

router.post("/upload", function(req, res, next) {
  if (req.files === null) {
    res.send("No Image Uploaded");
  } else {
    const file = req.files.file;

    file.mv(`../client/public/images/${file.name}`, err => {
      if (err) {
        console.error();
        return res.status(500).send(err);
      }
    });

    photo.create({
      name: req.body.text,
      date: String(Today()),
      time: String(Time()),
      imageURL: `/images/${file.name}`,
      platform: "win32"
    });
  }
  photo
    .find({})
    .sort({ time: "descending" })
    .exec(function(err, photos) {
      if (err) {
        console.error(err);
      }
      res.json(photos);
    });
});

router.delete("/delete/:_id", function(req, res, next) {
  var id = req.params._id;
  photo.findByIdAndDelete(id, function(err, photo) {
    if (err) {
      res.send(err);
    }
  });
  photo
    .find({})
    .sort({ time: "descending" })
    .exec(function(err, photos) {
      if (err) {
        console.error(err);
      }
      res.json(photos);
    });
});

module.exports = router;
