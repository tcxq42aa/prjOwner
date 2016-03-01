var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var spriter = require('gulp-css-spriter');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglifyjs');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var htmlmin = require('gulp-htmlmin');

gulp.task('clean', function(){
    return gulp.src(['public/dest/fonts','public/dest/images','public/dest/javascripts','public/dest/stylesheets'])
        .pipe(clean());
});

gulp.task('css', function(){
    return gulp.src(['public/stylesheets/normalize.min.css','public/stylesheets/font.css','public/stylesheets/style.css'])
        //.pipe(spriter({
        // The path and file name of where we will save the sprite sheet
        //'spriteSheet': 'public/images/spritesheet.png',
        // Because we don't know where you will end up saving the CSS file at this point in the pipe,
        // we need a litle help identifying where it will be.
        //'pathToSpriteSheetFromCSS': 'public/images/spritesheet.png'
        //}))
        .pipe(autoprefixer())
        //.pipe(cleanCSS())
        .pipe(concat('all.css'))
        .pipe(gulp.dest('public/dest/stylesheets'));
});

gulp.task('copyCss', function(){
    return gulp.src(['public/stylesheets/promise.css','public/stylesheets/sale.css','public/stylesheets/replace.css', 'public/stylesheets/pageSlider.css', 'public/stylesheets/feedback.css'])
        .pipe(autoprefixer())
        .pipe(gulp.dest('public/dest/stylesheets'));
});

gulp.task('js:lib', function(){
    return gulp.src(['public/javascripts/jquery.min.js', 'public/javascripts/echarts.min.js', 'public/javascripts/pageSlider.min.js', 'public/javascripts/pageSlider.js'])
        .pipe(gulp.dest('public/dest/javascripts'));
});

gulp.task('copyJs', function(){
    return gulp.src(['public/javascripts/main.js','public/javascripts/promise.js'])
        .pipe(gulp.dest('public/dest/javascripts'));
});
//gulp.task('js', function(){
//    return gulp.src(['public/javascripts/promise.js'])
//        .pipe(concat('all.js'))
//        .pipe(uglify())
//        .pipe(gulp.dest('public/dest/javascripts'));
//});

gulp.task('img', function(){
    return gulp.src('public/images/**.*')
        .pipe(gulp.dest('public/dest/images'));
});
gulp.task('font', function(){
    return gulp.src('public/fonts/**.*')
        .pipe(gulp.dest('public/dest/fonts'));
});

//gulp.task('html', function(){
//    gulp.src('public/404.html')
//        .pipe(htmlmin({collapseWhitespace: true}))
//        .pipe(gulp.dest('public/dest'));
//    return gulp.src('views/index2.ejs')
//        .pipe(htmlmin({collapseWhitespace: true}))
//        .pipe(gulp.dest('views/build'));
//});

gulp.task('default',['clean'],  function () {
    gulp.run(['css','copyCss','js:lib','copyJs','img', 'font']);
    gulp.watch('public/stylesheets/**.css', ['copyCss', 'css']);
    gulp.watch('public/javascripts/**.js', ['copyJs']);
    return;
});


