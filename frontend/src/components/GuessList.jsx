import React, { useContext } from "react";
import { GameContext } from "../App";
import ListCard from "./common/ListCard";

const coloring_data = {
  in_place: "bg-green-200",
  wrong_place: "bg-blue-200",
  no_match: "bg-slate-200",
};

function Guess({ value, coloringScheme }) {
  let letters = value.split("");

  return (
    <ListCard>
      {letters.map((letter, i) => {
        return (
          <div
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
    </ListCard>
  );
}

function GuessList() {
  const {game, setGame} = useContext(GameContext);
  return (
    <div class="flex justify-center m-4">
      {game.guesses.map((guess) => {
        return <Guess value={guess.value} coloringScheme={guess.coloring_scheme}/>;
      })}
    </div>
  );
}

export default GuessList;
