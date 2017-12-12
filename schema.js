const { makeExecutableSchema } = require('graphql-tools');
const gql = require('./gql');

const typeDef = gql`
type Query {
  human(id: ID!): Human
}

type Human {
  id: ID!
  name: String!
  friends: [Human]
}
`;

const humans = {
  '1': {
    id: '1',
    name: 'Anakin Skywalker',
    friendIds: ['2']
  },
  '2': {
    id: '2',
    name: 'Obi-Wan Kenobi',
    friendIds: ['1', '3']
  },
  '3': {
    id: '3',
    name: 'Luke Skywalker',
    friendIds: ['2']
  },
  '4': {
    id: '4',
    name: 'Boba Fett',
    friendIds: []
  },
};

function getHumanById(id) {
  return humans[id];
}

function getManyHumanByIds(ids) {
  return ids.map(getHumanById);
}

const Resolvers = {
  Query: {
    human(_, { id }) {
      return getHumanById(id);
    },
  },
  Human: {
    id(human) {
      return human.id;
    },
    name(human) {
      return human.name;
    },
    friends(human) {
      return getManyHumanByIds(human.friendIds);
    },
  },
};

exports.graphqlSchema = makeExecutableSchema({
  typeDefs: [ typeDef ],
  resolvers: Resolvers,
});