"use strict";

angular.module("FoodJournalApp").config(function ($routeProvider, $locationProvider) {

    // Food Item Routes
    $routeProvider

        .when("/", {
            templateUrl: "app/views/pages/home.html"
        })

        .when("/allFoodItems", {
            templateUrl: "app/views/pages/fooditempages/allFoodItems.html",
            controller: "allFoodItemsCtrl"
        })

        .when("/singleFoodItem/:id", {
            templateUrl: "app/views/pages/fooditempages/singleFoodItem.html",
            controller: "singleFoodItemCtrl" 
        })

        .when("/createFoodItem", {
            templateUrl: "app/views/pages/fooditempages/createFoodItem.html",
            controller: "createFoodItemCtrl" 
        })

        .when("/editFoodItem/:id", {
            templateUrl: "app/views/pages/fooditempages/editFoodItem.html",
            controller: "editFoodItemCtrl"
        });

    $routeProvider

        .when("/allJournalEntries", {
            templateUrl: "app/views/pages/journalentrypages/allJournalEntries.html",
            controller: "allJournalEntriesCtrl"
        })

        .when("/createJournalEntry", {
            templateUrl: "app/views/pages/journalentrypages/createJournalEntry.html",
            controller: "createJournalEntryCtrl"
        })

        .when("/editJournalEntry/:id", {
            templateUrl: "app/views/pages/journalentrypages/editJournalEntry.html",
            controller: "editJournalEntryCtrl"
        })

        .when("/singleJournalEntry/:id", {
            templateUrl: "app/views/pages/journalentrypages/singleJournalEntry.html",
            controller: "singleJournalEntryCtrl"
        });

    $locationProvider.html5Mode(true);

});
