import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone"
import { typeDefs } from "./schema.js";
import db from "./_db.js";

//resolver
const resolvers = {
    Query: {
        games(){
            return db.games;
        },
        game(_, args){
            return db.games.find(game => game.id === args.id);
        },
        reviews(){
            return db.reviews;
        },
        review(_, args){
            return db.reviews.find(review => review.id === args.id);
        },
        authors(){
            return db.authors;
        },
        author(_, args){
            return db.authors.find(author => author.id === args.id);
        }
    },
    Game: {
        reviews(parent) {
            return db.reviews.filter(r => r.game_id === parent.id);
        }
    },
    Review: {
        author(parent) {
            return db.authors.find(a => a.id === parent.auhtor_id);
        }
    },
    Author: {
        reviews(parent){
            return db.reviews.filter(r => r.author_id === parent.id);
        },
        games(parent) {
            var gameIds = db.reviews.filter(r => r.author_id === parent.id).map(r => r.game_id);
            return db.games.filter(g => gameIds.includes(g.id));
        }
    },
    Mutation: {
        addGame(_, args) {
            let game = {
                ...args.game,
                id: Math.floor(Math.random() * 10000).toString()
            }
            db.games.push(game);
            return game;
        },
        deleteGame(_, args) {
            db.games = db.games.filter(g => g.id !== args.id)
            return db.games;
        }
    }
}

// server setup
const server = new ApolloServer({
    typeDefs,
    resolvers
})

const {url} = await startStandaloneServer(server, {
    listen: {port: 4000}
})

console.log("Server started at 4000 port")