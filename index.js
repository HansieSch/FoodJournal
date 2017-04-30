"use strict";

var express = require("express");
var app = express();

var bodyParser = require("body-parser");
var morgan = require("morgan"); // Logger
var mongoose = require("mongoose");

var config = require("./config.js"); // Configuration info.

// Application Routes
var foodItemRoutes = require("./app/routes/FoodItemRoutes.js")(app, express);
var journalEntryRoutes = require("./app/routes/JournalEntryRoutes.js")(app, express);

// Connect to database.
mongoose.connect(config.db_url);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));

// Application Routes
app.use("/api", foodItemRoutes);
app.use("/api", journalEntryRoutes);

// Serves static resources and homepage.
app.use(require("./app/static.js"));

app.listen(config.port, function () {
    console.log("Listening on port " + config.port);
});