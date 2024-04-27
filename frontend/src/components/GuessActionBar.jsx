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

  const handleBack = () => {
    setGame({})
  }

  return (
    <ListCard>
      <div className="relative flex flex-col items-center w-full">
        <button className="absolute left-2 top-2" onClick={handleBack}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
            />
          </svg>
        </button>
        <div className="flex flex-row items-center justify-around">
          <CustomInput
            type="text"
            maxLength={game.word_to_guess.length}
            value={guess}
            onChange={setGuess}
          />
          {/** TODO: Disable button if guess isn't full */}
          <button
            className="
              bg-sky-400
              border-b-4
              border-b-sky-600
              hover:bg-sky-500
              hover:border-b-sky-700
              disabled:bg-sky-200
              disabled:border-b-sky-400
              shadow-md
              px-6 py-2 m-1.5
              rounded-md
              font-bold
              uppercase
              text-white
            "
            onClick={handleNewGuess}
            disabled={guess.length !== game.word_to_guess.length}
          >
            guess
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
