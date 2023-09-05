export const typeDefs = `#graphql
    type Game {
        id: ID!
        title: String!
        platform: [String!]!
        reviews: [Review!]
    }
    type Review {
        id: ID!
        rating: Int!
        content: String!
        author: Author!
    }
    type Author {
        id: ID!
        name: String!
        verified: Boolean!
        reviews: [Review!]
        games: [Game!]
    }
    type Query {
        games: [Game],
        game(id: ID!): Game,
        reviews: [Review],
        review(id: ID!): Review
        authors: [Author],
        author(id: ID!): Author
    }
`