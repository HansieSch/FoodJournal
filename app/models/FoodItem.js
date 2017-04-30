"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var FoodItem = new Schema({
    name: { type: String, required: true },
    brand: { type: String },
    calories_per_gram: Number,
    type: { type: String, required: true, lowercase: true }, // e.g: fruit, vegetable, cooldrink, meat, bread, etc...

    // Nutritional Information Typically(per 100g) found on food packaging labels.
    typical_nutritional_information: { 
        protein: { type: Number, default: 0 },
        energy: { type: Number, default: 0 },
        carbohydrates: {
            total: { type: Number, default: 0 },
            total_sugar: { type: Number, default: 0 }
        },
        fat: {
            total: { type: Number, default: 0 },
            saturated: { type: Number, default: 0 },
            mono_unsaturated: { type: Number, default: 0 },
            poly_unsaturated: { type: Number, default: 0 },
            trans: { type: Number, default: 0 }
        }
    }
});

FoodItem.pre("save", function (next) {
    // Protein and Carbohydrates contain four calories per gram.
    // Fat contains nine calories per gram.
    this.calories_per_gram = (this.typical_nutritional_information.protein * 4
                            + this.typical_nutritional_information.carbohydrates.total * 4
                            + this.typical_nutritional_information.fat.total * 9) / 100;

    next();
});

module.exports = mongoose.model("FoodItem", FoodItem);
