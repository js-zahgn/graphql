const mongoose = require('mongoose');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt
} = require('graphql');
const { InfoType } = require('./info');
const Student = mongoose.model('Student');

let StudentType = new GraphQLObjectType({
  name: 'Student',
  fields: {
    name: {
      type: GraphQLString
    },
    sex: {
      type: GraphQLString
    },
    age: {
      type: GraphQLInt
    },
    info: {
      type: InfoType
    }
  }
});

module.exports = {
  student: {
    type: new GraphQLList(StudentType),
    args: {
      age: {
        name: 'age',
        type: GraphQLInt
      }
    },
    resolve(root, params, options) {
      let res;
      if (params.age) {
        res = Student.find({ age: params.age }).populate("info").exec()
      } else {
        res = Student.find({}).exec()
      }
      return res;
    }
  }
}
