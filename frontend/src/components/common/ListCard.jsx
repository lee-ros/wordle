import React from "react";

function ListCard({ children }) {
  return (
    <div className="flex flex-col shadow-inner h-[75vh] bg-gray-50 m-1.5 p-1 overflow-y-auto">
      <ul>{children}</ul>
    </div>
  );
}

export default ListCard;
