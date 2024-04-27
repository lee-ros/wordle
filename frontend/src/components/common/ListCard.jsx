import React from "react";

function ListCard({ children, className }) {
  return (
    <div
      className={`
        flex flex-col
        shadow-inner
        bg-gray-50
        m-1.5 p-1
        rounded-md
        overflow-y-auto
        min-w-full
        min-h-full
        ${className}
      `}
    >
      <ul>{children}</ul>
    </div>
  );
}

export default ListCard;
