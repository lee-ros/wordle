import React from "react";

function ListCard({ children }) {
  return (
    <div className="flex flex-row justify-around w-auto shadow-md rounded-md m-4 p-4 bg-slate-50">
      {children}
    </div>
  );
}

export default ListCard;
