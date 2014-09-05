var gulp = require('gulp')
var razor = require('../');

gulp.task("default",function() {
    return gulp.src('template/**/*.razor')
        .pipe(razor({
            ext : 'htm'
        }))
        .pipe(gulp.dest('output'));
})