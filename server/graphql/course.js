const mongoose = require('mongoose');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt
} = require('graphql');

let CourseType = new GraphQLObjectType({
  name: 'course',
  fields: {
    title: {
      type: GraphQLString
    },
    desc: {
      type: GraphQLString
    },
    page: {
      type: GraphQLInt
    },
    author: {
      type: GraphQLString
    }
  }
});

module.exports = {
  course: {
    type: new GraphQLList(CourseType),
    args: {},
    resolve(root, params, options) {
      const Course = mongoose.model('Course');
      return Course.find({}).exec()
    }
  }
}
