import React, { PropsWithChildren } from "react";

const DeleteIcon = () => {
  return <button>Delete</button>;
};

const Search = () => {
  return <input type={"text"} />;
};

export default function Header() {
  return (
    <div className="header">
      <div className="left_header">
        <DeleteIcon />
      </div>
      <div className="right_header">
        <Search />
      </div>
    </div>
  );
}
