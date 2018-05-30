const gulp = require('gulp');
const metalsmith = require('metalsmith');
const debug = require('metalsmith-debug');
const markdown = require('metalsmith-markdown');
const parcel = require('gulp-parcel');
const layouts = require('metalsmith-layouts');
const del = require('del');
const shell = require('gulp-shell')


function html (cb) {
	metalsmith(__dirname)
		.source('src/html/pages')
		.destination('src/build')
		.clean(false)
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

function css () {
	return gulp.src('src/css/**/*')
		.pipe(gulp.dest('src/build/css'));
};

function js() {
	return gulp.src('src/js/**/*')
		.pipe(gulp.dest('src/build/js'));
};

function clean() {
	return del([
		'src/build/**/*',
		'dist/**/*'
	  ]);
};

exports.clean = clean;
exports.js = js;
exports.css = css;
exports.html = html;

// function bundle() {
// 	return gulp.src('src/build/*.html', {
// 			read: false
// 		})
// 		.pipe(parcel({
//             outDir: 'dist',
// 			publicURL: './'
// 		}))
// 		.pipe(gulp.dest('dist'));
// };

function bundle() {
	return gulp.src('src/build/**/*.html', { read: false })
	.pipe(shell([
		'./node_modules/parcel-bundler/bin/cli.js <%= file.path %> --public-url ./ --out-dir dist'
	]));
}

let build = gulp.series(clean, html, css, js, bundle);

gulp.task('build', build);