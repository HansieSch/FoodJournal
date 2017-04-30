"use strict";

angular.module("FoodJournalApp").factory("JournalEntryService", function ($http) {

    return {

        // Returns all journal entries currently in database.
        getAll: function () {
            return $http.get("/api/journalentry");
        },

        // Create a new journal entry. Save to database.
        create: function (entryData) {
            return $http.post("/api/journalentry", entryData);
        },

        // Get specific journal entry using id provided.
        get: function (entryId) {
            return $http.get("/api/journalentry/" + entryId);
        },

        // Save changes made to a particular journal entry.
        update: function (entryId, entryData) {
            return $http.put("/api/journalentry/" + entryId, entryData);
        },

        // Delete a specific journal entry.
        remove: function (entryId) {
            return $http.delete("/api/journalentry/" + entryId);
        }
    };

});