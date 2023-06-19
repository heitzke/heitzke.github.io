 var gulp         = require('gulp'),
     sass         = require('gulp-sass')(require('sass')),
     plumber      = require('gulp-plumber'),
     notify       = require('gulp-notify');

 var config = {
     src           : './sass/*.scss',
     dest          : './css/'
 };

 // Error message
 var onError = function (err) {
     notify.onError({
         title   : 'Gulp',
         subtitle: 'Failure!',
         message : 'Error: <%= error.message %>',
         sound   : 'Beep'
     })(err);

     this.emit('end');
 };

 // Compile CSS
   gulp.task('styles', function () {
       var stream = gulp
           .src([config.src])
           .pipe(plumber({errorHandler: onError}))
           .pipe(sass().on('error', sass.logError));

       return stream
           .pipe(gulp.dest('./css/'));
   });


gulp.task('watch', () => {
    gulp.watch('sass/*.scss', (done) => {
        gulp.series(['styles'])(done);
    });
});