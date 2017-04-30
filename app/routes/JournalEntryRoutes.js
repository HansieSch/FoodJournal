"use strict";

var JournalEntry = require("./../models/JournalEntry.js");

module.exports = function (app, express) {

    var api = express.Router();

    api.route("/journalentry")

        // Return all journal entries in database.
        .get(function (req, res) {
            JournalEntry.find({}, function (err, entries) {
                if (err) {
                    res.json({
                        success: false,
                        error: err
                    });
                }

                res.json({
                    success: true,
                    entries: entries
                });
            });
        })

        // Create new journal entry.
        .post(function (req, res) {
            var journalEntry = new JournalEntry({
                total_calories_eaten: req.body.total_calories_eaten,
                food_consumed: req.body.food_consumed
            });

            console.log(req.body.food_consumed);

            journalEntry.save(function (err) {
                if (err) {
                    res.json({
                        success: false,
                        error: err
                    });
                }

                res.json({
                    success: true
                });
            });
        });

    api.route("/journalentry/:id")

        .get(function (req, res) {
            JournalEntry.findById(req.params.id, function (err, entry) {
                if (err) {
                    res.json({
                        success: false,
                        error: err
                    });
                }

                res.json({
                    success: true,
                    entry: entry
                });
            });
        })

        .put(function (req, res) {
            JournalEntry.findById(req.params.id, function (err, entry) {
                if (err) {
                    res.json({
                        success: false,
                        error: err
                    });
                }

                if (req.body.food_consumed) entry.food_consumed = req.body.food_consumed;
                if (req.body.total_calories_eaten) entry.total_calories_eaten = req.body.total_calories_eaten;

                entry.save(function (err) {
                    if (err) {
                        res.json({
                            success: false,
                            error: err
                        });
                    }

                    res.json({
                        success: true
                    });
                });
            });
        })

        .delete(function (req, res) {
            JournalEntry.findByIdAndRemove(req.params.id, function (err) {
                if (err) {
                    res.json({
                        success: false,
                        error: err
                    });
                }

                res.json({
                    success: true
                });
            });
        });

    return api;
};
