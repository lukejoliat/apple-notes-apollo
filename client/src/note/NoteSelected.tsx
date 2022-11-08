import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import { useEffect, useMemo, useState } from "react";
import { GET_NOTES, UPDATE_NOTE, DELETE_NOTE } from "../client";
import { Note } from "./Note";

export default function NoteSelected({
  noteSelected,
}: {
  noteSelected: string;
}) {
  const client = useApolloClient();
  const { loading, error, data } = useQuery<{ notes: Note[] }>(GET_NOTES);
  const [update] = useMutation(UPDATE_NOTE);
  const [deleteNote] = useMutation(DELETE_NOTE);
  const note = data ? data.notes.find((n) => n.id === noteSelected) : null;
  const [titleValue, setTitleValue] = useState<string | undefined>(
    note ? note.title : ""
  );
  const [contentValue, setContentValue] = useState<string | undefined>(
    note ? note.content : ""
  );

  const handleNoteType = (value: string, field: string) => {
    if (note) {
      const newNotes = data?.notes.map((n, i) => {
        if (n.id === note?.id) {
          if (field === "title") {
            setTitleValue(value);
            return {
              ...data.notes[i],
              title: value ? value : note.title,
            };
          } else if (field === "content") {
            setContentValue(value);
            return {
              ...data.notes[i],
              content: value ? value : note.content,
            };
          } else return n;
        }
        return n;
      });
      client.writeQuery({
        query: GET_NOTES,
        data: { notes: newNotes },
      });
    }
  };

  const handleDelete = () => {
    deleteNote({
      refetchQueries: [GET_NOTES],
      variables: { id: note?.id },
    });
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      update({
        refetchQueries: [GET_NOTES],
        variables: {
          note: { id: note?.id, title: titleValue, content: contentValue },
        },
      });
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [titleValue, contentValue]);

  useEffect(() => {
    setTitleValue(note?.title);
    setContentValue(note?.content);
  }, [note?.id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error.</div>;

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
        <button onClick={handleDelete}>Delete Note</button>
      </div>
    );

  return <div>Note could not be retrieved.</div>;
}
