import React from "react";
import ItemCard from "./common/ItemCard";

const coloring_data = {
  in_place: "bg-green-200",
  wrong_place: "bg-yellow-200",
  no_match: "bg-slate-200",
};

function GuessItem({ ikey, value, coloringScheme }) {
  const letters = value.split("");

  return (
    <ItemCard>
      {letters.map((letter, i) => {
        return (
          <div
            key={i}
            className={`w-8 h-8 mx-2 px-2
                  text-xl
                  rounded-md shadow-inner
                  ${coloring_data[coloringScheme[i]]}
                  `}
          >
            {letter}
          </div>
        );
      })}
    </ItemCard>
  );
}

export default GuessItem;
