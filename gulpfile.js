const gulp = require('gulp');
const metalsmith = require('metalsmith');
const debug = require('metalsmith-debug');
const markdown = require('metalsmith-markdown');
const parcel = require('gulp-parcel');
const layouts = require('metalsmith-layouts');

// gulp.task('metalsmith', function() {
//   return gulp.src('src/**/*.html', {
//       read: false
//   })
//     .pipe(metalsmith({
//         use: [
//             markdown()
//           ]
//     }))
//     .pipe(parcel({
//         source: "src/"
//     }))
//     .pipe(gulp.dest('dist'));
// });

gulp.task('metalsmith', function (cb) {
	metalsmith(__dirname)
		.source('src/html/pages')
		.destination('src/html/prebuild')
		.clean(false)
		// .use(collections({
		// 	sites: {
		// 		pattern: 'sites/*.md',
		// 		sortBy: 'date',
		// 		reverse: true
		// 	}
		// }))
		.use(debug())
		.use(markdown())
		.use(layouts({
			'engine': 'nunjucks',
			'directory': 'src/html/views',
			'rename': true
		}))
		.build(function (err) {
			if (err) {
				throw err;
			}
			cb();
		});
});

gulp.task('build', ['metalsmith'], function (cb) {
	return gulp.src('src/html/prebuild/**/*.html', {
			read: false
		})
		.pipe(parcel({
            source: "src/",
            outDir: 'dist',
            publicURL: './'
		}))
		.pipe(gulp.dest('dist'));
});
