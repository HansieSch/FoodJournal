"use strict";

var gulp = require("gulp");

var ngAnnotate = require("gulp-ng-annotate"); // Sorts out angular problems when parameters are renamed.
var sourcemaps = require("gulp-sourcemaps"); // Makes debugging a lot easier. Stores file contents as comment.
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var nodemon = require("gulp-nodemon");

gulp.task("js", function () {
    // views folder will be ignored since no .js files are stored there.
    // The "public/app/app.js" part ensures the app.js file is the first file add.
    gulp.src(["public/app/app.js", "public/app/**/*.js"])
        .pipe(sourcemaps.init())
            .pipe(concat("app.js"))
            .pipe(ngAnnotate())
            .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("public/assets"));
});

// Whatches js files for any changes.
// The ["js"] argument ensures that everytime task is run the js files are rebuilt(gulp js).
gulp.task("watch:js", ["js"], function () {
    gulp.watch("public/app/**/*.js", ["js"]);
});

// Start server useing nodemon.
gulp.task("dev:server", function () {
    nodemon({
        script: "index.js",
        ext: "js",
        ignore: ["public*"]
    });
});

// Concats js files, watches angular js files for changes and starts nodemon.
gulp.task("dev", ["watch:js", "dev:server"]);