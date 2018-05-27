const gulp = require('gulp');
const metalsmith = require('gulp-metalsmith');
const parcel = require('gulp-parcel');
const markdown = require('metalsmith-markdown');

 
gulp.task('metalsmith', function() {
  return gulp.src('src/**/*.html', {
      read: false
  })
    .pipe(metalsmith({
        use: [
            markdown()
          ]
    }))
    .pipe(parcel({
        source: "src/"
    }))
    .pipe(gulp.dest('dist'));
});