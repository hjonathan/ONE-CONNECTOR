var gulp      = require('gulp')
    ,mocha    = require('gulp-mocha')
    ,uglify   = require('gulp-uglify')
    ,shell   = require('gulp-shell')
    ,clean = require('gulp-clean')
    ,istanbul = require('gulp-istanbul');

// Clean documentation task 
// Currently the doc folder is removed from the project root.
gulp.task('cleanDoc', function () {
    return gulp
        .src([ 'doc' ], {
            read: false
        })
        .pipe(clean());
});
 
gulp.task('doc', [ 'cleanDoc' ], shell.task([
    "groc"
]));

gulp.task('test', function () {
    return gulp.src('test/**/*.js')
        .pipe(mocha({ 
            reporter: 'spec' 
        }));
});

gulp.task('test-coverage', function (cb) {
    gulp.src(['index.js'])
        .pipe(istanbul())
        .pipe(istanbul.hookRequire())
        .on('finish', function () {
            gulp.src(['test/**/*.js'])
                .pipe(mocha())
                .pipe(istanbul.writeReports())
                .pipe(istanbul.enforceThresholds({ thresholds: { global: 70 } }))
                .on('end', cb);
        });
});

gulp.task('watch', function() {
    gulp.watch(['**/*.js', 'test/**/*.js'], ['test']);
});

gulp.task('bdd', ['test', 'watch']);