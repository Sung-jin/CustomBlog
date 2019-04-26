const ftp = require('vinyl-ftp');
const minimist = require('minimist');
const args = minimist(process.argv.slice(2));

gulp.task('deploy', () => {
    const remotePath = '/';
    const conn = ftp.create({
        host: '120.50.78.185',
        user: args.user,
        password: args.password
    });
    console.log('FTP connection successful!');
    gulp.src('./')
        .pipe(conn.dest(remotePath));
});

gulp.task('build', ['html', 'images', 'sass', 'js', (args.prod ? 'production' : 'development')], () => {
    // Print build info
    console.log(packageFile.name + ' "' + packageFile.description + '" v' + packageFile.version);
});

// Runs only for production build
gulp.task('production', () => {
    console.log('This is a production build');
    console.log('Please run the following script for deployment:');
    console.log('gulp deploy --user $ftp_user --password $ftp_pw');
});

// Runs only for development build
gulp.task('development', () => {
    browsersync(browserSyncConfig);
    console.log('This is a development build');
    console.log('File changes will be watched and trigger a page reload');
    gulp.watch(html.watch, ['html', browsersync.reload]);
    gulp.watch(images.src, ['images', browsersync.reload]);
    gulp.watch(css.watch, ['sass', browsersync.reload]);
    gulp.watch(js.src, ['js', browsersync.reload]);
});
