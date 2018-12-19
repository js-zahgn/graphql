const mongoose = require('mongoose');
const Student = mongoose.model('Student');

module.exports = {
  saveStudent: async (ctx, next) => {
    const opts = ctx.request.body;
    
    const student = new Student(opts);
    const saveStudent = await student.save();
  
    let res;
    if (saveStudent) {
      res = {
        success: true,
        info: saveStudent
      }
    } else {
      res = {
        success: false
      }
    }
    ctx.body = res
  },
  
  fetchStudent: async (ctx, next) => {
    const students = await Student.find({});
  
    let res;
    if (students.length) {
      res = {
        success: true,
        data: students
      }
    } else {
      res = {
        success: false
      }
    }
    ctx.body = res;
  },
  getStudentInfo: async (ctx, next) => {
    const { age } = ctx.request.body;
    console.log(age)
    const res = await Student.findOne({ age: age })
      .populate({ path: 'info', select: 'hobby height weight' }).exec();
    ctx.body = {
      success: true,
      data: res
    };
  },
  fetchStudentDetail: async (ctx, next) => {
    const students = await Student.find({}).populate({
      path: 'info',
      select: 'hobby height weight'
    }).exec();
  
    let res;
    if (students.length) {
      res = {
        success: true,
        data: students
      }
    } else {
      res = {
        success: false
      }
    }
    ctx.body = res;
  }
}
