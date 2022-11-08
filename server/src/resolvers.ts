// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
export const resolvers = {
  Query: {
    books: async (parent, args, { dataSources }, info) => {
      const res = await dataSources.bookAPI.getBooks();
      return res;
    },
    book: async (parent, { id }, { dataSources }, info) => {
      const res = await dataSources.bookAPI.getBook(id);
      return res;
    },
    notes: async (parent, args, { dataSources }, info) => {
      const res = await dataSources.noteAPI.getNotes();
      return res;
    },
    note: async (parent, { id }, { dataSources }, info) => {
      const res = await dataSources.noteAPI.getNote(id);
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
    note: async (_, { note }, { dataSources }) => {
      const res = await dataSources.noteAPI.createNote(note);
      if (res) {
        return res;
      }
    },
    updateNote: async (_, { note }, { dataSources }) => {
      const res = await dataSources.noteAPI.updateNote(note);
      if (res) {
        return res;
      }
    },
    deleteNote: async (_, { id }, { dataSources }) => {
      const res = await dataSources.noteAPI.deleteNote(id);
      if (res) {
        return "success";
      }
    },
  },
};
