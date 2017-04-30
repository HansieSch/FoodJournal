"use strict";

// FoodItemService is primarily used to communicate with the back end.
angular.module("FoodJournalApp").factory("FoodItemService", function ($http) {

    return {

        // Returns an array with all food items.
        getAll: function () {
            return $http.get("/api/fooditem");
        },

        // Create a new food item.
        create: function (foodItemData) {
            return $http.post("/api/fooditem", foodItemData);
        },

        // Returns the data for a specific food item.
        get: function (foodItemId) {
            return $http.get("/api/fooditem/" + foodItemId);
        },

        // Update the data of a specific food item.
        update: function (foodItemId, foodItemData) {
            return $http.put("/api/fooditem/" + foodItemId, foodItemData);
        },

        // Remove a specific food item from database.
        remove: function (foodItemId) {
            return $http.delete("/api/fooditem/" + foodItemId);
        },

        // Searches for a specific food item.
        find: function (data) {
            return $http({
                url: "/api/find/fooditem",
                method: "GET",
                params: {
                    name: data.name,
                    brand: data.brand,
                    type: data.type
                }
            });
        },

        // Returns the categories used to identify food items.
        getCategories: function () {
            return $http.get("/api/metadata/fooditem");
        }
    };

});
