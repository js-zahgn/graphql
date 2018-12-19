const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const StudentSchema = new Schema({
  name: String,
  sex: String,
  age: Number,
  info: {
    type: ObjectId,
    ref: 'Info'
  },
  meta: {
    createAt: {
      type: Date,
      default: Date.now() 
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    }
  }
})

StudentSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updatedAt = Date.now();
  } else {
    this.meta.updatedAt = Date.now();
  }
  next();
})

mongoose.model('Student', StudentSchema);
