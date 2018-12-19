const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const InfoSchema = new Schema({
  hobby: [String],
  height: String,
  weight: Number,
  ID: String,
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

InfoSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updatedAt = Date.now();
  } else {
    this.meta.updatedAt = Date.now();
  }
  this.ID = mongoose.Types.ObjectId();
  next();
})

mongoose.model('Info', InfoSchema);
