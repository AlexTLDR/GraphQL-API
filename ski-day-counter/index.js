const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
    type SkiDay {
        id: ID!
        date: String!
        mountain: String!
    }
  type Query {
    totalDays: Int!
    allDays: [SkiDay!]!
  }
`;

const server = new ApolloServer({
    typeDefs,
    mocks: true
});

server
.listen()
.then(({url}) => 
  console.log(`Server running at ${url}`)
);
