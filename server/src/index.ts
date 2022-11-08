import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import BookAPI from "./datasources/book.js";
import NoteDataSource from "./datasources/note.js";
import { resolvers } from "./resolvers.js";
import { createStore } from "./store.js";
import { typeDefs } from "./typedefs.js";

interface ContextValue {
  dataSources: {
    bookAPI: BookAPI;
    noteAPI: NoteDataSource;
  };
}

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer<ContextValue>({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  context: async () => {
    const store = createStore();
    return {
      dataSources: {
        bookAPI: new BookAPI({ store }),
        noteAPI: new NoteDataSource({ store }),
      },
    };
  },
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
