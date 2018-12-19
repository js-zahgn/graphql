const mongoose = require('mongoose');
const Course = mongoose.model('Course');

module.exports = {
  saveCourse: async (ctx, next) => {
    const opts = ctx.request.body;
    const course = new Course(opts);

    const res = await course.save();
    if (res) {
      ctx.body = {
        success: true,
        data: res
      }
    } else {
      ctx.body = {
        success: false
      };
    }
  },
  fetchCourse: async (ctx, next) => {
    const course = await Course.find({});
    if (course.length) {
      ctx.body = {
        success: true,
        data: course
      }
    } else {
      ctx.body = {
        success: false
      }
    }
  }
};
