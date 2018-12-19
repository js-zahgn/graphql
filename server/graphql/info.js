const mongoose = require('mongoose');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');

const Info = mongoose.model('Info');

const ObjType = new GraphQLObjectType({
  name: 'meta',
  fields: {
    createAt: {
      type: GraphQLString
    },
    updatedAt: {
      type: GraphQLString
    }
  }
});

let InfoType = new GraphQLObjectType({
  name: 'Info',
  fields: {
    ID: {
      type: GraphQLString
    },
    height: {
      type: GraphQLString
    },
    weight: {
      type: GraphQLString
    },
    hobby: {
      type: new GraphQLList(GraphQLString)
    },
    meta: {
      type: ObjType
    }
  }
});

module.exports = {
  InfoType: InfoType,
  infos: {
    type: new GraphQLList(InfoType),
    args: {},
    resolve(root, params, options) {
      return Info.find({}).exec();
    }
  },
  info: {
    type: InfoType,
    args: {
      ID: {
        name: 'ID',
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve(root, params, options) {
      return Info.findOne({ ID: params.ID }).exec();
    }
  }
}
