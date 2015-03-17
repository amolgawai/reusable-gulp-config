# reusable-gulp-config
A reusable gulp configuration that can be used for various web projects.

## Requirements
1. Simple and basic
2. Support [```browserify```](https://github.com/substack/node-browserify) in a modular way, i.e. shall be able to build separate bundles for say app js and vendor js
3. Support build modes for development and production
4. Modular - may be separate files for separate tasks
5. For production mode 
   - copy files to __dist__ folder,
   - Uglify/minify
6. For dev
   - use the source folder
   - build sourcemaps?
7.  Support following Folder structure 

```
dist/               // Production destination
gulp/               // Gulp modules
    '- tasks/       // separate tasks
    '- util/        // Utilities to be used in tasks
src/
   '- app/
        '- ...      // client-side app code
   '- vendor/
          '- ...    // bower-managed libraries goes here
   '- index.html    // entry point
node_modules/       // npm-managed libraries here
       '- ...      
```
8. 

## References
1. [Gulp Starter](https://github.com/greypants/gulp-starter)
2. [Gulp recipes](https://github.com/gulpjs/gulp/tree/master/docs/recipes)
3. [Extra Gulp recipes](https://github.com/sogko/gulp-recipes)


