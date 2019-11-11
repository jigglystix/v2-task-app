var express = require("express");
var router = express.Router();
var homeHandler = require("../controllers/homeHandler");

let homeRoutes = new homeHandler();

router.get("/", homeRoutes.index);
router.post("/addTask", homeRoutes.addTask);
router.delete("/deleteTask/:value", homeRoutes.deleteTask);
module.exports = router;
