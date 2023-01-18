const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  scalar Date  

  """
    An object that describes the characteristics of a ski day
  """

    type SkiDay {
            "A ski day's unique identifier"
        id: ID!
            "The date of the ski day"
        date: Date!
            "The location of the ski day"
        mountain: String!
            "The shape of the snow on the ski day"
        conditions: Conditions
    }

    enum Conditions {
        POWDER
        HEAVY
        ICE
        THIN
        DRY
    }

  type Query {
    totalDays: Int!
    allDays: [SkiDay!]!
  }

  input AddDayInput {
    date: Date!
    mountain: String!
    conditions: Conditions
  }

  type RemoveDayPayload {
    day: SkiDay!
    removed: Boolean
    totalBefore: Int
    totalAfter: Int
  }

  type Mutation {
    addDay(input: AddDayInput!): SkiDay
    removeDay(id: ID!): RemoveDayPayload!
  }

  type Subscription {
    newDay: SkiDay!
  }
`;

const mocks = {
    Date: () => "1/2/2023",
    String: () => "Mountain Dew",
    // Query: () => ({
    //     allDays: () => new MockList([1,15])
    // })
};

const server = new ApolloServer({
    typeDefs,
    mocks
});

server
.listen()
.then(({url}) => 
  console.log(`Server running at ${url}`)
);
