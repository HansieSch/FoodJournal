"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var JournalEntry = new Schema({
    date: { type: Date, required: true, unique: true, default: Date.now },
    total_calories_eaten: { type: Number, default: 0 },
    food_consumed: { type: Array, default: [] }
});

module.exports = mongoose.model("JournalEntry", JournalEntry);