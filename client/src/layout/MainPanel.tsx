import React, { PropsWithChildren } from "react";

export default function MainPanel({ children }: PropsWithChildren) {
  return <div className="main-panel">{children}</div>;
}
