import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import types, { Sequelize } from "sequelize";
import BookAPI from "./datasources/book.js";

const createStore = () => {
  const db = new Sequelize({
    dialect: "sqlite",
    storage: "./store.sqlite",
  });

  const books = db.define("books", {
    id: { primaryKey: true, type: types.STRING },
    title: types.STRING,
    author: types.STRING,
  });

  return { db, books };
};

const store = createStore();

const books = [
  {
    id: "1",
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    id: "2",
    title: "City of Glass",
    author: "Paul Auster",
  },
];

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    id: String
    title: String
    author: String
  }

  input BookInput {
    id: String!
    title: String!
    author: String!
  }

  input BookUpdateInput {
    id: String!
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }

  type Query {
    book(id: ID!): Book
  }

  type Mutation {
    book(book: BookInput): Book
    updateBook(book: BookUpdateInput): Book
    deleteBook(id: String): String
  }
`;

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    books: async (parent, args, { dataSources }, info) => {
      const res = await dataSources.bookAPI.getBooks();
      return res;
    },
    book: async (parent, { id }, { dataSources }, info) => {
      const res = await dataSources.bookAPI.getBook(id);
      return res;
    },
  },
  Mutation: {
    book: async (_, { book }, { dataSources }) => {
      const res = await dataSources.bookAPI.createBook(book);
      if (res) {
        return res;
      }
    },
    updateBook: async (_, { book }, { dataSources }) => {
      const res = await dataSources.bookAPI.updateBook(book);
      if (res) {
        return res;
      }
    },
    deleteBook: async (_, { id }, { dataSources }) => {
      const res = await dataSources.bookAPI.deleteBook(id);
      if (res) {
        return "success";
      }
    },
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  context: async () => {
    console.log("constructor call 2");

    const store = createStore();

    return {
      dataSources: {
        bookAPI: new BookAPI({ store }),
      },
    };
  },
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
