import { Note as NoteSchema } from "../App";

export default function Note({ note }: { note: NoteSchema }) {
  return (
    <div className="note_item">
      <h3>{note.title}</h3>
      <p>{note.content}</p>
    </div>
  );
}
