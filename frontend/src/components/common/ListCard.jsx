import React from "react";

function ListCard({ children }) {
  return (
    <div className="flex flex-col shadow-inner bg-gray-50 m-1.5 p-1 rounded-md overflow-y-auto min-w-[40vw]">
      <ul>{children}</ul>
    </div>
  );
}

export default ListCard;
