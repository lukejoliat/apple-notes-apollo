import React, { PropsWithChildren } from "react";

export default function Sidebar({ children }: PropsWithChildren) {
  return <div className="sidebar">{children}</div>;
}
