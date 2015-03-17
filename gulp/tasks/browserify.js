/* browserify task
   ---------------
   Bundle javascripty things with browserify!

   This task is set up to generate multiple separate bundles, from
   different sources.
*/

//TODO :- Reformat the browserify task with reference from gulp-starter

'use strict';

var _ = require('lodash');
var fs = require('fs');
var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var bowerResolve = require('bower-resolve');
var nodeResolve = require('resolve');
var getPackageIds = require('../util/getPackageIds');

gulp.task('build-vendor', function() {

    // this task will go through ./bower.json and
    // uses bower-resolve to resolve its full path.
    // the full path will then be added to the bundle using require()

    var b = browserify({
        // generate source maps in non-production environment
        debug: !production
    });

    // get all bower components ids and use 'bower-resolve' to resolve
    // the ids to their full path, which we need for require()
    getPackageIds.getBowerPackageIds().forEach(function(id) {

        var resolvedPath = bowerResolve.fastReadSync(id);

        b.require(resolvedPath, {

            // exposes the package id, so that we can require() from our code.
            // for eg:
            // require('./vendor/angular/angular.js', {expose: 'angular'}) enables require('angular');
            // for more information: https://github.com/substack/node-browserify#brequirefile-opts
            expose: id

        });
    });

    // do the similar thing, but for npm-managed modules.
    // resolve path using 'resolve' module
    getPackageIds.getNPMPackageIds().forEach(function(id) {
        b.require(nodeResolve.sync(id), {
            expose: id
        });
    });

    var stream = b.bundle().pipe(source('vendor.js'));

    // pipe additional tasks here (for eg: minifying / uglifying, etc)
    // remember to turn off name-mangling if needed when uglifying

    stream.pipe(gulp.dest('./public/dist'));

    return stream;
});

gulp.task('build-app', function() {

    var b = browserify('./public/src/app/app.js', {
        // generate source maps in non-production environment
        debug: !production
    });

    // mark vendor libraries defined in bower.json as an external library,
    // so that it does not get bundled with app.js.
    // instead, we will load vendor libraries from vendor.js bundle
    getPackageIds.getBowerPackageIds().forEach(function(lib) {
        b.external(lib);
    });


    // do the similar thing, but for npm-managed modules.
    // resolve path using 'resolve' module
    getPackageIds.getNPMPackageIds().forEach(function(id) {
        b.external(id);
    });

    var stream = b.bundle().pipe(source('app.js'));

    // pipe additional tasks here (for eg: minifying / uglifying, etc)
    // remember to turn off name-mangling if needed when uglifying

    stream.pipe(gulp.dest('./public/dist'));

    return stream;

});

gulp.task('browserify', browserifyTask);

// Exporting the task so we can call it directly in our watch task, with the 'devMode' option
module.exports = browserifyTask;