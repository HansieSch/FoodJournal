"use strict";

var foodJournalApp  = angular.module("FoodJournalApp");

foodJournalApp.controller("allJournalEntriesCtrl", function ($scope, JournalEntryService) {
    JournalEntryService.getAll().then(function (data) {
        data.data.entries.forEach(function (val, index, array) {

            // Used in sorting entries from latest to eldest.
            array[index].timeCreated = new Date(val.date).getTime();

            // String representation of the date on which entry was created.
            array[index].dateString = new Date(val.date).toLocaleDateString(
                "en-US", 
                { weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric' 
            });
        });

        // Make all journal entries available to the view.
        $scope.allEntries = data.data.entries;
    });
});

// Has to retrieve the journal entry who's id is passed as a routeparameter.
foodJournalApp.controller("singleJournalEntryCtrl", function ($scope, $routeParams, JournalEntryService, $location) {
    JournalEntryService.get($routeParams.id).then(function (data) {

        // Used in sorting entries from latest to eldest.
        data.data.entry.timeCreated = new Date(data.data.entry.date).getTime();

        // String representation of the date on which entry was created.
        data.data.entry.dateString = new Date(data.data.entry.date).toLocaleDateString(
            "en-US", 
            { weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric' 
        });

        $scope.entryData = data.data.entry;
    });

    $scope.removeItem = function (id) {
        JournalEntryService.remove(id).then(function (data) {
            if (data.data.success) {
                $location.path("/allJournalEntries");
            }
        });
    };
});

// saveEntry() - save the journal entry data to database.
// $scope.categories - contains all the brands, types, and names in database used
// to find a food item user specified.
// Update total_calories eaten every time input is changed.
// Has to update the dom when a new food item is added to the entry.
foodJournalApp.controller("createJournalEntryCtrl", function ($scope, JournalEntryService, FoodItemService, $location) {

    // Get categories of items currently being stored in database.
    FoodItemService.getCategories().then(function (data) {
        $scope.categories = data.data.metadata;
    });

    // Used to keep track of current item being created's data.
    // Makes adding items and updating view a breeze.
    $scope.newJournalEntryData = {
        total_calories_eaten: 0,
        food_consumed: []
    };

    // Used to check whether current already contains data of a specific item.
    $scope.contained = false;

    $scope.addItem = function (newFoodItem) {
        if (!newFoodItem) {
            return false;
        }

        FoodItemService.find({
            type: newFoodItem.type,
            brand: newFoodItem.brand,
            name: newFoodItem.name
        }).then(function (data) {
            var foodItem = data.data.item;

            // Newly added Food Item
            var newFoodConsumed = {
                id: foodItem._id,
                name: foodItem.name,
                brand: foodItem.brand,
                type: foodItem.type,
                calories_per_gram: foodItem.calories_per_gram,
                amount_eaten: newFoodItem.grams_eaten,
                calories_eaten: (newFoodItem.grams_eaten * foodItem.calories_per_gram)
            };

            $scope.newJournalEntryData.food_consumed.push();

            // If food_comsumed already contains the food data for this particular item
            // update rather than push.
            $scope.newJournalEntryData.food_consumed.forEach(function (value, index, array) {
                if (value.id === newFoodConsumed.id) {
                    value.amount_eaten += newFoodConsumed.amount_eaten;
                    value.calories_eaten += (newFoodItem.grams_eaten * foodItem.calories_per_gram);
                    $scope.contained = true;
                }
            });

            // If current entry didn't already contain data from the food item
            // being added. Just add the data on to the array.
            if (!$scope.contained) {
                $scope.newJournalEntryData.food_consumed.push(newFoodConsumed);
            } else {
                $scope.contained = false;
            }
            
            $scope.newJournalEntryData.total_calories_eaten += (foodItem.calories_per_gram 
                                                                * newFoodItem.grams_eaten);
            $scope.newFoodItemData= {}; // Clear input elements' data.
        });
    };

    $scope.saveEntry = function (entry) {
        JournalEntryService.create(entry).then(function (data) {
            if (data.data.success) {
                $location.path("/allJournalEntries");
            }
        });
    };
});

// saveEntry() - Saves the changes made to entry.
foodJournalApp.controller("editJournalEntryCtrl", function ($scope, JournalEntryService, $routeParams, FoodItemService, $location) {
    
    JournalEntryService.get($routeParams.id).then(function (data) {
        $scope.entry = data.data.entry;
    });

    // Used for the dropdown menus when adding a new food item.
    FoodItemService.getCategories().then(function (data) {
        $scope.categories = data.data.metadata;
    });

    // Used to check whether current already contains data of a specific item.
    $scope.contained = false;

    $scope.addItem = function (newFoodItem) {
        if (!newFoodItem) {
            return false;
        }

        FoodItemService.find({
            type: newFoodItem.type,
            brand: newFoodItem.brand,
            name: newFoodItem.name
        }).then(function (data) {
            var foodItem = data.data.item;

            // Newly added Food Item
            var newFoodConsumed = {
                id: foodItem._id,
                name: foodItem.name,
                brand: foodItem.brand,
                type: foodItem.type,
                calories_per_gram: foodItem.calories_per_gram,
                amount_eaten: newFoodItem.grams_eaten,
                calories_eaten: (newFoodItem.grams_eaten * foodItem.calories_per_gram)
            };

            $scope.entry.food_consumed.push();

            // If food_comsumed already contains the food data for this particular item
            // update rather than push.
            $scope.entry.food_consumed.forEach(function (value, index, array) {
                if (value.id === newFoodConsumed.id) {
                    value.amount_eaten += newFoodConsumed.amount_eaten;
                    value.calories_eaten += (newFoodItem.grams_eaten * foodItem.calories_per_gram);
                    $scope.contained = true;
                }
            });

            if (!$scope.contained) {
                $scope.entry.food_consumed.push(newFoodConsumed);
            } else {
                $scope.contained = false;
            }
            
            $scope.entry.total_calories_eaten += (foodItem.calories_per_gram 
                                                                * newFoodItem.grams_eaten);
            $scope.newFoodItemData= {};
        });
    };

    $scope.saveEntry = function (entryId, entryData) {
        JournalEntryService.update(entryId, entryData).then(function (data) {
            if (data.data.success) {
                $location.path("/allJournalEntries");
            }
        });
    };
});
