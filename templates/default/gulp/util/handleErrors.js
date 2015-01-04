var notify  = require("gulp-notify"),
    plumber = require("gulp-plumber");


module.exports = function () {
  return plumber(function () {
    // Send error to notification center with gulp-notify
    notify.onError({
      title: "Compile Error",
      message: "<" + "%= error.message %" + ">"
    }).apply(this, arguments);

    // Keep gulp from hanging on this task
    this.emit('end');
  });
};
