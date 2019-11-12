var express = require("express");
var app = express();
var mongoose = require("mongoose");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var cors = require("cors");
var fileUpload = require("express-fileupload");
var odin = require("./policies/odin");

var mongoDB = "mongodb://127.0.0.1:27017/marvin";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var photosRouter = require("./routes/photos");

app.use(cors());
app.use(express.static(__dirname + "/public"));
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: "true" }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(odin);
app.use(fileUpload());

app.use("/photos", photosRouter);
app.use("/users", usersRouter);
app.use("/", indexRouter);

app.listen(3002);
