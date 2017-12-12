const { makeExecutableSchema } = require('graphql-tools');
const gql = require('./gql');

exports.graphqlSchema = makeExecutableSchema({
  typeDefs: [ ?? ],
  resolvers: ??,
});