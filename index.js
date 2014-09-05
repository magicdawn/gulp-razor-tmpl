var util = require('util');
var pathFn = require('path');

var razor = require('razor-tmpl');
var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

var PLUGIN_NAME = 'gulp-razor-tmpl';
module.exports = create_stream;

function create_stream(option) {
    option = util._extend({ //_extend(origin,add)
        ext: ".html",
        ViewBag: null
    }, option);

    if (option.ext[0] !== '.')
        option.ext = '.' + option.ext;

    var stream = through.obj(function(file, encoding, callback) {
        var result = razor.renderFileSync(file.path, option.ViewBag);
        gutil.log(PLUGIN_NAME, "success render file : ", file.relative);

        //modify ext to option.ext
        file.path = pathFn.join(
            pathFn.dirname(file.path), //dir
            pathFn.basename(file.path, pathFn.extname(file.path)) + option.ext
        );

        if (file.isBuffer() || file.isNull()) {
            file.contents = new Buffer(result);
        }
        else if (file.isStream()) {
            var cur = through();
            cur.write(result);

            file.contents.pipe(cur);
            file.contents = cur;
        }

        //output
        this.push(file);
        callback();
    });
    return stream;
}

module.exports._doc = "\
    gulp-razor-tmpl usage :\n\
    \n\
    \n\
    example1 : build all razor file in the template dir to html\n\
    \n\
    var razor = require('gulp-razor-tmpl');\n\
    gulp.task('build',function() {\n\
        return gulp.src('template/**/*.razor')\n\
            .pipe(razor())\n\
            .pipe(gulp.dest('public'));\n\
    })\n\
    \n\
    And razor() can have a optional argument\n\
            ext : target extension,default = html\n\
        ViewBag : the ViewBag data,default = null\n\
";