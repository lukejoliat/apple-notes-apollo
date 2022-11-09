import React, { PropsWithChildren, useEffect, useRef, useState } from "react";
import "./index.css";

export default function Sidebar({ children }: PropsWithChildren) {
  const parent = useRef<HTMLDivElement>(null);
  const sidebar = useRef<HTMLDivElement>(null);
  const dragger = useRef<HTMLDivElement>(null);
  const isMouseDown = useRef<boolean>(false);
  const [hideContent, setHideContent] = useState(false);

  const mouseup = () => {
    isMouseDown.current = false;
  };

  const mousedown = () => {
    isMouseDown.current = true;
  };

  const mousemove = (e: MouseEvent) => {
    const { x: mouseX } = e;
    const { x: parentX } = parent.current?.getBoundingClientRect() as DOMRect;

    if (isMouseDown.current === true) {
      if (sidebar.current)
        sidebar.current.style.width = `${mouseX - parentX}px`;
      if (hideContent === false && sidebar.current && mouseX - parentX < 50) {
        setHideContent(true);
        if (dragger.current) dragger.current.style.marginLeft = "0";
      } else if (hideContent === true && mouseX - parentX > 55) {
        setHideContent(false);
        if (dragger.current) dragger.current.style.marginLeft = ".5rem";
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mouseup", mouseup);
    dragger.current?.addEventListener("mousedown", mousedown);
    document.addEventListener("mousemove", mousemove);

    return () => {
      document.removeEventListener("mouseup", mouseup);
      dragger.current?.removeEventListener("mousedown", mousedown);
      document.removeEventListener("mousemove", mousemove);
    };
  }, [hideContent]);

  return (
    <div className="sidebar" ref={parent}>
      <div
        className="sidebar_content"
        ref={sidebar}
        style={{ display: hideContent ? "none" : "block" }}
      >
        {children}
      </div>
      <div className="sidebar_dragger" ref={dragger} />
    </div>
  );
}
