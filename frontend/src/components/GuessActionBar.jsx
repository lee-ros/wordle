import React, { useContext, useState } from "react";
import ListCard from "./common/ListCard";
import { createGuess } from "../client/requests";
import { GameContext } from "../App";
import CustomInput from "./common/CustomInput";

function GuessActionBar() {
  const [guess, setGuess] = useState("");
  const [error, setError] = useState("");
  const { game, setGame } = useContext(GameContext);

  const handleNewGuess = async () => {
    try {
      const updatedGame = await createGuess(guess, game.id);
      updatedGame && setGame(updatedGame);
    } catch ({ response }) {
      setError(response.data.detail);
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <ListCard>
      <div className="flex flex-col items-center w-full">
        <div className="flex flex-row items-center justify-around">
          <CustomInput
            type="text"
            maxLength={game.word_to_guess.length}
            value={guess}
            onChange={setGuess}
          />
          <button
            className="
            bg-blue-300
            hover:bg-blue-400
            hover:ring-2
            hover:ring-blue-500
            justify-self-center
            px-4 py-2 m-1.5
            rounded-full
          "
            onClick={handleNewGuess}
          >
            Guess!
          </button>
        </div>
        {error && <span className="text-red-600">{error}</span>}
        <div className="flex flex-row justify-start items-center">
          <span>Game ID:</span>
          <span className="rounded-md m-1.5 px-0.5 min-w-6 min-h-6 shadow-inner bg-slate-200">
            {game.id}
          </span>
          <span>Remaining Guesses:</span>
          <span className="rounded-md m-1.5 px-0.5 min-w-6 min-h-6 shadow-inner bg-slate-200">
            {game.guess_limit - game.guesses.length}
          </span>
        </div>
      </div>
    </ListCard>
  );
}

export default GuessActionBar;
