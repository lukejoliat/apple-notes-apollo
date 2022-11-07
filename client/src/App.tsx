import { useEffect, useState } from "react";
import Sidebar from "./layout/Sidebar";
import MainPanel from "./layout/MainPanel";
import "./App.css";
import NoteList from "./note/NoteList";
import NoteSelected from "./note/NoteSelected";
import { v4 as uuid } from "uuid";
import {
  ApolloClient,
  ApolloProvider,
  gql,
  InMemoryCache,
} from "@apollo/client";

export interface Note {
  id: string;
  title: string;
  content: string;
}

export const QUERY = gql`
  query getNotes {
    notes @client
  }
`;

const NOTES: Note[] = [
  { id: uuid(), title: "My Note", content: "This is the body of my note." },
  {
    id: uuid(),
    title: "My Note #2",
    content: "This is the body of my note #2.",
  },
  {
    id: uuid(),
    title: "My Note #3",
    content: "This is the body of my note #3.",
  },
];

const client = new ApolloClient({ cache: new InMemoryCache() });
client.writeQuery({ query: QUERY, data: { notes: NOTES } });

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
