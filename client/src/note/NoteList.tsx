import { useMutation, useQuery } from "@apollo/client";
import { v4 } from "uuid";
import { CREATE_NOTE, GET_NOTES } from "../client";
import { Note } from "./Note";
import NoteItem from "./NoteItem";

export default function NoteList({
  handleNoteClick,
}: {
  handleNoteClick: (i: string) => void;
}) {
  const { loading, error, data } = useQuery<{ notes: Note[] }>(GET_NOTES);
  const [mutate] = useMutation(CREATE_NOTE);
  const createNote = () => {
    mutate({
      refetchQueries: [GET_NOTES],
      variables: { note: { id: v4(), title: "", content: "" } },
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error.</div>;

  return (
    <>
      <button onClick={() => createNote()}>Create Note</button>
      <ul className="note_list">
        {data?.notes.map((n, i) => (
          <li key={n.id} onClick={() => handleNoteClick(n.id)}>
            <NoteItem note={n} />
          </li>
        ))}
      </ul>
    </>
  );
}
