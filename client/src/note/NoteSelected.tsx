import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import { useEffect, useMemo, useState } from "react";
import { Note, GET_NOTES, UPDATE_NOTE, DELETE_NOTE } from "../App";

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
      console.log(titleValue);
      update({
        refetchQueries: [GET_NOTES],
        variables: { note: { id: note?.id, title: titleValue } },
      });
      // Send Axios request here
    }, 3000);

    return () => clearTimeout(delayDebounceFn);
  }, [titleValue]);

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
        <button onClick={handleDelete}>Delete Note</button>
      </div>
    );

  return <></>;
}
