import Note from "./Note";
import { Note as NoteSchema, QUERY } from "../App";
import { gql, useQuery } from "@apollo/client";

export default function NoteList({
  handleNoteClick,
}: {
  handleNoteClick: (i: string) => void;
}) {
  const { loading, error, data } = useQuery<{ notes: NoteSchema[] }>(QUERY);
  if (loading) return <div>loading...</div>;
  if (error) return <div>error.</div>;
  return (
    <ul className="note_list">
      {data?.notes.map((n, i) => (
        <li key={n.id} onClick={() => handleNoteClick(n.id)}>
          <Note note={n} />
        </li>
      ))}
    </ul>
  );
}
