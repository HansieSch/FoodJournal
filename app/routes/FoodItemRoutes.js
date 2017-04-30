"use strict";

var FoodItem = require("./../models/FoodItem.js");

module.exports = function (app, express) {

    var api = express.Router();

    api.route("/fooditem")

        // Create a new food item.
        .post(function (req, res) {
            var newItem = new FoodItem({
                name: req.body.name,
                brand: req.body.brand,
                type: req.body.type,
                typical_nutritional_information: {
                    protein: req.body.protein,
                    energy: req.body.energy,
                    carbohydrates: {
                        total: req.body.total_carbs,
                        total_sugar: req.body.total_sugar
                    },
                    fat: {
                        total: req.body.total_fat,
                        saturated: req.body.saturated,
                        mono_unsaturated: req.body.mono_unsaturated,
                        poly_unsaturated: req.body.poly_unsaturated,
                        trans: req.body.trans
                    }
                }
            });

            newItem.save(function (err) {
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

        })
    
        // Get all food items currently in database.
        .get(function (req, res) {

            FoodItem.find({}, function (err, items) {
                if (err) {
                    res.json({
                        success: false,
                        error: err
                    });
                }

                res.json({
                    success: true,
                    items: items
                });
            });

        });

    // :id - The food item's _id field value.
    api.route("/fooditem/:id")

        // Get all information on a specific food item.
        .get(function (req, res) {

            FoodItem.findById(req.params.id, function (err, item) {
                if (err) {
                    res.json({
                        success: false,
                        error: err
                    });
                } else {
                    res.json({
                        success: true,
                        item: item
                    });
                }

            });

        })

        // Update a food item.
        .put(function (req, res) {
            
            FoodItem.findById(req.params.id, function (err, item) {
                if (err) {
                    res.json({
                        success: false,
                        error: err
                    });
                }

                // Only update a field if user changed a value.
                if (req.body.name)
                    item.name = req.body.name;

                if (req.body.brand)
                    item.brand = req.body.brand;

                if (req.body.protein)
                    item.typical_nutritional_information.protein = req.body.protein;

                if (req.body.energy)
                    item.typical_nutritional_information.energy = req.body.energy;

                if (req.body.total_carbs)
                    item.typical_nutritional_information.carbohydrates.total = req.body.total_carbs;

                if (req.body.total_sugar)
                    item.typical_nutritional_information.carbohydrates.total_sugar = req.body.total_sugar;

                if (req.body.total_fat)
                    item.typical_nutritional_information.fat.total = req.body.total_fat;

                if (req.body.saturated)
                    item.typical_nutritional_information.fat.saturated = req.body.saturated;

                if (req.body.mono_unsaturated)
                    item.typical_nutritional_information.fat.mono_unsaturated = req.body.mono_unsaturated;

                if (req.body.poly_unsaturated)
                    item.typical_nutritional_information.fat.poly_unsaturated = req.body.poly_unsaturated;

                if (req.body.trans)
                    item.typical_nutritional_information.fat.trans = req.body.trans;

                if (req.body.type)
                    item.type = req.body.type;


                item.save(function (err) {
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

        // Delete a food item.
        .delete(function (req, res) {

            FoodItem.findByIdAndRemove(req.params.id, function (err) {
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

    // Find the nutritional information of a specific food item when id is not known.
    // Used when user selects a new item to add to an entry
    api.route("/find/fooditem").get(function (req, res) {
        FoodItem.findOne({
            name: req.query.name,
            brand: req.query.brand,
            type: req.query.type
        }, function (err, item) {
            if (err) {
                res.json({
                    success: false,
                    error: err
                });
            } else if (!item) {
                res.json({
                    success: false,
                    message: "No food item in database."
                });
            } else {
                res.json({
                    success: true,
                    item: item
                });
            }

        });
    });

    // Returns metadata on the food items currently in database.
    api.route("/metadata/fooditem").get(function (req, res) {
        FoodItem.find({}, function (err, foodItems) {
            if (err) {
                res.json({
                    success: false,
                    error: err
                });
            }

            var metadata = {
                brands: [],
                types: [],
                names: []
            };

            // Populate metadata not including duplicate values.
            foodItems.forEach(function (val, index, array) {
                if (!metadata.brands.includes(val.brand)) {
                    metadata.brands.push(val.brand);
                }

                if (!metadata.types.includes(val.type)) {
                    metadata.types.push(val.type);
                }

                if (!metadata.names.includes(val.name)) {
                    metadata.names.push(val.name);
                }
            });

            res.json({
                success: true,
                metadata: metadata
            });
        });
    });

    return api;

};
