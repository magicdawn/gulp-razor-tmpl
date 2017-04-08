#gulp-razor-tmpl

[![Greenkeeper badge](https://badges.greenkeeper.io/magicdawn/gulp-razor-tmpl.svg)](https://greenkeeper.io/)
gulp plugin for [razor-tmpl](https://github.com/magicdawn/razor-tmpl)

#Install
	$ npm i gulp-razor-tmpl --save-dev

#Usage
in gulpfile.js
```js
var razor = require('gulp-razor-tmpl');
gulp.task('build',function() {
	return gulp.src('template/**/*.razor')
		.pipe(razor())
		.pipe(gulp.dest('output'));
})
```
this will render `template/**/*.razor` to the `html` ext,this exmaple locates in the `test` folder

##Options
razor([option]) the option argument is optional
- ext : target extension,default = html
- ViewBag : the ViewBag data,default = null

##Tips
just as what I have done to razor-tmpl,you can use `_doc` property in repl
```shell
$ node
> razor = require('gulp-razor-tmpl')
> console.log(razor._doc)
```


#License
MIT