import { useMutation, useQuery } from "@apollo/client";
import { v4 } from "uuid";
import { CREATE_NOTE, GET_NOTES } from "../client";
import { Note } from "./Note";
import NoteItem from "./NoteItem";
import classNames from "classnames";
import "./index.css";

export default function NoteList({
  handleNoteClick,
  noteSelected,
}: {
  handleNoteClick: (i: string) => void;
  noteSelected: string;
}) {
  const { loading, error, data } = useQuery<{ notes: Note[] }>(GET_NOTES);
  const [mutate] = useMutation(CREATE_NOTE);
  const createNote = () => {
    const id = v4();
    mutate({
      refetchQueries: [GET_NOTES],
      variables: { note: { id, title: "", content: "" } },
      onCompleted: () => {
        handleNoteClick(id);
      },
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error.</div>;
  if (!data || !data.notes || data.notes.length <= 0)
    return (
      <>
        <button className="create_note_button" onClick={() => createNote()}>
          Create Note
        </button>
        <div>No notes to display.</div>
      </>
    );

  return (
    <>
      <button className="create_note_button" onClick={() => createNote()}>
        Create Note
      </button>
      <ul className="note_list">
        {data?.notes.map((n, i) => (
          <li
            key={n.id}
            onClick={() => handleNoteClick(n.id)}
            className={classNames({ active: n.id === noteSelected })}
          >
            <NoteItem note={n} />
          </li>
        ))}
      </ul>
    </>
  );
}
