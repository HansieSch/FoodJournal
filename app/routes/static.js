var express = require("express");
var router = express.Router();

var path = require("path");

// Serve resources
router.use(express.static(__dirname + "/../public"));

router.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/../public/app/views/index.html"));
});

module.exports = router;
