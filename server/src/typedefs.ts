// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
export const typeDefs = `#graphql
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

  type Note {
    id: String
    title: String
    content: String
  }

  input NoteInput {
    id: String!
    title: String!
    content: String!
  }

  input NoteUpdateInput {
    id: String!
    title: String
    content: String
  }

  type Query {
    notes: [Note]
  }

  type Query {
    note(id: ID!): Note
  }

  type Mutation {
    note(note: NoteInput): Note
    updateNote(note: NoteUpdateInput): Note
    deleteNote(id: String): String
  }
`;
