import React from "react";

function ItemCard({ children }) {
  return (
    <div className="flex flex-row justify-around w-auto shadow-md rounded-md m-1.5 p-4 bg-slate-50">
      {children}
    </div>
  );
}

export default ItemCard;
