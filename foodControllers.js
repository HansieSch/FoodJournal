"use strict";

var foodJournalApp = angular.module("FoodJournalApp");

foodJournalApp.controller("createFoodItemCtrl", function ($scope, FoodItemService) {

    // "unset" is used to indicate user hasn't attempted to save item.
    $scope.status = "unset";

    // Save new item to database.
    $scope.newItem = function (data) {
        if (!data) {
            $scope.status = false;
            return null;
        }

        FoodItemService.create(data).then(function (data) {
            if (!data.data.success) {
                $scope.status = false;
            } else {
                $scope.status = true;
            }
        });
    };
});

foodJournalApp.controller("editFoodItemCtrl", function ($scope, $routeParams, FoodItemService) {

    // "unset" is used to indicate user hasn't attempted to save item.
    $scope.status = "unset";

    // Get all data about the item currently being editted.
    FoodItemService.get($routeParams.id).then(function (data) {
        var item = data.data.item;

        // Set current values of input elements to match values of item being editted.
        $scope.edittedFoodItemData = item;
        $scope.edittedFoodItemData.energy = item.typical_nutritional_information.energy;
        $scope.edittedFoodItemData.protein = item.typical_nutritional_information.protein;
        $scope.edittedFoodItemData.total_carbs = item.typical_nutritional_information.carbohydrates.total;
        $scope.edittedFoodItemData.total_sugar = item.typical_nutritional_information.carbohydrates.total_sugar;
        $scope.edittedFoodItemData.total_fat = item.typical_nutritional_information.fat.total;
        $scope.edittedFoodItemData.saturated = item.typical_nutritional_information.fat.saturated;
        $scope.edittedFoodItemData.trans = item.typical_nutritional_information.fat.trans;
        $scope.edittedFoodItemData.mono_unsaturated = item.typical_nutritional_information.fat.mono_unsaturated;
        $scope.edittedFoodItemData.poly_unsaturated = item.typical_nutritional_information.fat.poly_unsaturated;
    });
    
    $scope.saveItem = function (edittedData) {
        FoodItemService.update($routeParams.id, edittedData).then(function (data) {
            if (!data) {
                $scope.status = false;
                return null;
            }

            if (!data.data.success) {
                $scope.status = false;
            } else {
                $scope.status = true;
            }
        });
    };
});

foodJournalApp.controller("allFoodItemsCtrl", function ($scope, FoodItemService) {
    FoodItemService.getAll().then(function (data) {
        $scope.all = data.data.items;
    });
});

foodJournalApp.controller("singleFoodItemCtrl", function ($scope, $routeParams, FoodItemService, $location) {

    // "unset" is used to indicate user hasn't attempted to save item.
    $scope.status = "unset";

    FoodItemService.get($routeParams.id).then(function (item) {
        $scope.foodItemData = item.data.item;
    });

    $scope.removeItem = function (itemId) {
        if (!itemId) {
            $scope.status = false;
            return null;
        }

        FoodItemService.remove(itemId).then(function (data) {
            if (!data.data.success) {
                $scope.status = false;
            } else {
                $location.path("/allFoodItems");
            }
        });
    };
});