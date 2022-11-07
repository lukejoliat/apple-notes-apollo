import { useApolloClient, useQuery } from "@apollo/client";
import { useEffect, useMemo, useState } from "react";
import { Note, QUERY } from "../App";

export default function NoteSelected({
  noteSelected,
}: {
  noteSelected: string;
}) {
  const client = useApolloClient();
  const { loading, error, data } = useQuery<{ notes: Note[] }>(QUERY);
  const note = data ? data.notes.find((n) => n.id === noteSelected) : null;
  const [titleValue, setTitleValue] = useState<string | undefined>(
    note ? note.title : ""
  );
  const [contentValue, setContentValue] = useState<string | undefined>(
    note ? note.content : ""
  );
  const handleNoteType = (value: string, field: string) => {
    setTitleValue(value);
    if (note) {
      const newNotes = data?.notes.map((n, i) => {
        if (n.id === note?.id) {
          return {
            ...data.notes[i],
            title: value ? value : note.title,
          };
        }
        return n;
      });
      client.writeQuery({
        query: QUERY,
        data: { notes: newNotes },
      });
    }
  };

  useEffect(() => {
    setTitleValue(note?.title);
    setContentValue(note?.content);
  }, [note?.id]);

  if (note)
    return (
      <div className="note_selected">
        <input
          className="note_title_input"
          value={titleValue}
          onChange={(e) => handleNoteType(e.target.value, "title")}
        />
        <div>
          <textarea
            className="note_content_input"
            value={contentValue}
            onChange={(e) => handleNoteType(e.target.value, "content")}
          ></textarea>
        </div>
      </div>
    );

  return <></>;
}
