const gulp = require('gulp');
const metalsmith = require('metalsmith');
const debug = require('metalsmith-debug');
const markdown = require('metalsmith-markdown');
const parcel = require('gulp-parcel');
const layouts = require('metalsmith-layouts');
const del = require('del');


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

exports.metalsmith = function (cb) {
	metalsmith(__dirname)
		.source('src/html/pages')
		.destination('src/build')
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
};

exports.css = function() {
	gulp.src('src/css/**/*')
		.pipe(gulp.dest('src/build/css'));
};

exports.js = function() {
	gulp.src('src/js/**/*')
		.pipe(gulp.dest('src/build/js'));
};

exports.clean = function() {
	return del([
		'src/build/**/*',
		'dist/**/*'
	  ]);
};

exports.bundle = function () {
	return gulp.src('src/build/*.html', {
			read: false
		})
		.pipe(parcel({
            outDir: 'dist',
			publicURL: './'
		}))
		.pipe(gulp.dest('dist'));
};

// const build = gulp.series('clean','metalsmith', 'css', 'js', 'bundle');

// gulp.task('build', build);