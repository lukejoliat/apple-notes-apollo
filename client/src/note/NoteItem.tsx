import { Note as NoteSchema } from "./Note";

export default function NoteItem({ note }: { note: NoteSchema }) {
  return (
    <div className="note_item">
      <h3>{note.title}</h3>
      <p>{note.content}</p>
    </div>
  );
}
