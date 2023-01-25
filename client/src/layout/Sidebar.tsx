import React, { PropsWithChildren, useEffect, useRef, useState } from "react";
import { useResize } from "./hooks/use-resize";
import "./index.css";
import { v4 } from "uuid";
import { ReactComponent as NoteEdit } from "../note-edit.svg";
import { useMutation } from "@apollo/client";
import { CREATE_NOTE, GET_NOTES } from "../client";
export default function Sidebar({ children }: PropsWithChildren) {
  const { parent, dragger, sidebar, hideContent } = useResize();
  const [mutate] = useMutation(CREATE_NOTE);

  const createNote = () => {
    const id = v4();
    mutate({
      refetchQueries: [GET_NOTES],
      variables: { note: { id, title: "", content: "" } },
      // onCompleted: () => {
      //   handleNoteClick(id);
      // },
    });
  };

  return (
    <div className="sidebar" ref={parent}>
      <div
        className="sidebar_content"
        ref={sidebar}
        style={{ display: hideContent ? "none" : "block" }}
      >
        <div className="sidebar_header">
          <NoteEdit fill={"white"} onClick={createNote} />
        </div>
        {children}
      </div>
      <div className="sidebar_dragger" ref={dragger} />
    </div>
  );
}
