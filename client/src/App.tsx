import {
  ApolloClient,
  ApolloProvider,
  gql,
  InMemoryCache,
} from "@apollo/client";
import { useState } from "react";
import "./App.css";
import MainPanel from "./layout/MainPanel";
import Sidebar from "./layout/Sidebar";
import NoteList from "./note/NoteList";
import NoteSelected from "./note/NoteSelected";

export interface Note {
  id: string;
  title: string;
  content: string;
}

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

const client = new ApolloClient({
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

function App() {
  const [noteSelected, setNoteSelected] = useState<string>("");
  const handleNoteClick = (id: string) => setNoteSelected(id);

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Sidebar>
          Side-Bar
          <NoteList handleNoteClick={handleNoteClick} />
        </Sidebar>
        <MainPanel>
          Main Panel
          <NoteSelected noteSelected={noteSelected} />
        </MainPanel>
      </div>
    </ApolloProvider>
  );
}

export default App;
