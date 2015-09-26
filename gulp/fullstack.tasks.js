//adapted from https://github.com/touchstonejs/touchstonejs-tasks

var babelify = require('babelify');
var brfs = require('brfs');
var browserify = require('browserify');
var bytes = require('bytes');
var chalk = require('chalk');
var connect = require('gulp-connect');
var del = require('del');
var gutil = require('gulp-util');
var less = require('gulp-less');
var merge = require('merge-stream');
var plumber = require('gulp-plumber');
var shell = require('gulp-shell');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var watchify = require('watchify');
var xtend = require('xtend');
var nodemon = require('gulp-nodemon');
var reactify = require('reactify');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');

var LessPluginCleanCSS = require('less-plugin-clean-css'),
    LessPluginAutoPrefix = require('less-plugin-autoprefix'),
    cleancss = new LessPluginCleanCSS({ advanced: true }),
    autoprefix= new LessPluginAutoPrefix({ browsers: ['last 2 versions'] });

var client_entrypoint = 'index.jsx';

module.exports = function (gulp) {
	function doBundle (target, name, dest) {
		return target.bundle()
			.on('error', function(err) {
				var parts = err.message.split('.js: ');
				var br = '\n           ';
				var msg = parts.length === 2 ? chalk.red('Browserify Error in ') + chalk.red.underline(parts[0] + '.js') + br + parts[1] : chalk.red('Browserify Error:') + br + err.message;
				gutil.log(msg);
			})
			.pipe(source(name))
			.pipe(buffer())
			.pipe(gulpif(process.env.NODE_ENV === 'production', uglify()))
			.pipe(gulp.dest(dest))
			.pipe(connect.reload());
	}

	function watchBundle (bundle, name, dest) {
		return watchify(bundle)
			.on('log', function (message) {
				message = message.replace(/(\d+) bytes/, function() {
					return bytes.format(Number(arguments[1]));
				});
				gutil.log(chalk.grey(message));
			})
			.on('time', function (time) {
				gutil.log(chalk.green('Application built in ' + (Math.round(time / 10) / 100) + 's'));
			})
			.on('update', function (ids) {
				var changed = ids.map(function (x) {
					return chalk.blue(x.replace(__dirname, ''));
				});

				if (changed.length > 1) {
					gutil.log(changed.length + ' scripts updated:\n* ' + changed.join('\n* ') + '\nrebuilding...');
				} else {
					gutil.log(changed[0] + ' updated, rebuilding...');
				}

				doBundle(bundle, name, dest);
			});
	}

	function buildApp (entries, transforms, dest, watch) {
		var opts = xtend(watch && watchify.args, {
			entries: entries,
			debug: process.env.NODE_ENV !== 'production',
			extensions:['.jsx']
		});

		var app = browserify(opts);
		var react = browserify();

		['react', 'react/addons'].forEach(function (pkg) {
			app.exclude(pkg);
			react.require(pkg);
		});

		if (watch) {
			app = watchBundle(app, 'app.js', dest);
		}

		transforms.forEach(function (target) {
			app.transform(target);
		});

		return merge(doBundle(react, 'react.js', dest), doBundle(app, 'app.js', dest));
	}

	function plumb (src, transforms, dest) {
		var stream = gulp.src(src);

		transforms.forEach(function (transform) {
			stream = stream.pipe(transform());
		});

		return stream.pipe(gulp.dest(dest)).pipe(connect.reload());
	}

	//plumb helper with option to pass config objects into transform
	function plumb2 (src, transformConfigs, dest) {
		var stream = gulp.src(src);

		transformConfigs.forEach(function (transformConfig) {
			stream = stream.pipe(transformConfig.transform(transformConfig.config));
		});

		return stream.pipe(gulp.dest(dest)).pipe(connect.reload());
	}

	var babelifyTransform = babelify.configure({
		plugins: [require('babel-plugin-object-assign')],
		optional: 'es7.objectRestSpread'
	});

	// Build
	gulp.task('fonts', plumb.bind(null, 'client/fonts/**', [], 'dist/public/fonts'));
	gulp.task('html', plumb.bind(null, ['client/index.html', 'client/.htaccess', 'client/favicon.ico', 'client/robots.txt'], [], 'dist/public'));
	gulp.task('images', plumb.bind(null, 'client/img/**', [], 'dist/public/img'));
	gulp.task('static-data', plumb.bind(null, 'client/data/static/**', [], 'dist/public/data'));
	gulp.task('less', plumb.bind(null, 'client/css/app.less', [less], 'dist/public/css'));
	gulp.task('less-prod', plumb2.bind(null, 'client/css/app.less', [{transform:less, config:{plugins: [autoprefix, cleancss]}}], 'dist/public/css'));
	gulp.task('scripts', buildApp.bind(null, ['./client/js/'+client_entrypoint], [babelifyTransform, reactify, brfs], './dist/public/js'));
	gulp.task('scripts-watch', buildApp.bind(null, ['./client/js/'+client_entrypoint], [babelifyTransform, reactify, brfs], './dist/public/js', true));
  gulp.task('server-prod', plumb.bind(null, ['server/**'], [], 'dist/server'));
  gulp.task('server-prod-json', plumb.bind(null, ['server-npm/package.json'], [], 'dist'));

	gulp.task('clean', function () { return del(['./dist/*']); });
	gulp.task('build-assets', ['html', 'images', 'fonts', 'static-data', 'less']);
	gulp.task('build-assets-prod', ['html', 'images', 'fonts', 'static-data', 'less-prod']);
	gulp.task('build', ['build-assets', 'scripts']);
	gulp.task('build-prod', ['build-assets-prod', 'scripts', 'server-prod', 'server-prod-json']);
	gulp.task('watch', ['build-assets', 'scripts-watch'], function () {
		gulp.watch(['client/index.html'], ['html']);
		gulp.watch(['client/css/**/*.less'], ['less']);
		gulp.watch(['client/img/**/*.*'], ['images']);
		gulp.watch(['client/fonts/**/*.*'], ['fonts']);
	});

	// Development
	// fullstack serve task that we use for development
  gulp.task('serve', ['watch'], function(){
    nodemon({
    script: 'server/app.js', // the app script
    watch: ['server/**/*.js'], // file to watch for reloading
    env: {                                // any environment variables
       'PORT':8080,
       'DOMAIN': 'http://localhost:8080',
       'SESSION_SECRET':'jv-secret'
       }
    })
    .on('restart', function () {
      setTimeout(function() {connect.reload();}, 1000);
      console.log('server restarted!');
    });
  });

	gulp.task('dev', ['serve', 'watch']);

	// Cordova
	gulp.task('prepare', ['build'], function () {
		return gulp.src('').pipe(plumber()).pipe(shell(['cordova prepare'], { cwd: __dirname }));
	});
};
