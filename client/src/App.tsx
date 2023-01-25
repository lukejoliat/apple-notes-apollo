import { ApolloProvider } from "@apollo/client";
import { useState } from "react";
import "./App.css";
import { client } from "./client";
import Header from "./layout/Header";
import MainPanel from "./layout/MainPanel";
import Sidebar from "./layout/Sidebar";
import NoteList from "./note/NoteList";
import NoteSelected from "./note/NoteSelected";

function App() {
  // make this a local field in apollo
  const [noteSelected, setNoteSelected] = useState<string>("");
  const handleNoteClick = (id: string) => setNoteSelected(id);

  return (
    <ApolloProvider client={client}>
      <div className="App">
        {/* <Header /> */}
        <div className="main_content">
          <Sidebar>
            <NoteList
              noteSelected={noteSelected}
              handleNoteClick={handleNoteClick}
            />
          </Sidebar>
          <MainPanel>
            <NoteSelected noteSelected={noteSelected} />
          </MainPanel>
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
