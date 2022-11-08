import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

export const GET_NOTES = gql`
  query getNotes {
    notes {
      id
      title
      content
    }
  }
`;

export const CREATE_NOTE = gql`
  mutation CreateNote($note: NoteInput) {
    note(note: $note) {
      id
      title
      content
    }
  }
`;

export const UPDATE_NOTE = gql`
  mutation UpdateNote($note: NoteUpdateInput) {
    updateNote(note: $note) {
      id
      title
      content
    }
  }
`;

export const DELETE_NOTE = gql`
  mutation DeleteNote($id: String) {
    deleteNote(id: $id)
  }
`;

export const BOOKQUERY = gql`
  query getBooks {
    books {
      title
    }
  }
`;

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:4000/graphql",
  typeDefs: `
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
`,
});
