import { useQuery } from "@apollo/client";
import classNames from "classnames";
import { GET_NOTES } from "../client";
import "./index.css";
import { Note } from "./Note";
import NoteItem from "./NoteItem";

export default function NoteList({
  handleNoteClick,
  noteSelected,
}: {
  handleNoteClick: (i: string) => void;
  noteSelected: string;
}) {
  const { loading, error, data } = useQuery<{ notes: Note[] }>(GET_NOTES);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error.</div>;
  if (!data || !data.notes || data.notes.length <= 0)
    return (
      <>
        <div>No notes to display.</div>
      </>
    );

  return (
    <>
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
