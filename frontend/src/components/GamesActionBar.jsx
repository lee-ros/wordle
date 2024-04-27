import { useContext, useState } from "react";
import ListCard from "./common/ListCard";
import { GameContext } from "../App";
import { createGame } from "../client/requests";

function Slider({ title, min, max, value, onChange }) {
  return (
    <div className="flex flex-col flex-grow justify-center items-start m-5">
      <div className="flex justify-between items-center">
        <span>{title}</span>
        <span className="rounded-md m-1.5 px-0.5 min-w-6 min-h-6 shadow-inner bg-slate-200">
          {value}
        </span>
      </div>
      <input
        className="peer"
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

function GamesActionBar() {
  const [wordLength, setWordLength] = useState(5);
  const [guessLimit, setGuessLimit] = useState(5);
  const [error, setError] = useState("");
  const { setGame } = useContext(GameContext);

  const handleWordLength = (event) => {
    setWordLength(event.target.value);
  };

  const handleGuessLimit = (event) => {
    setGuessLimit(event.target.value);
  };

  const handleNewGame = async () => {
    try {
      const new_game = await createGame(guessLimit, wordLength);
      new_game && setGame(new_game);
    } catch ({ response }) {
      setError(response.data.detail);
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <ListCard>
      <div className="flex flex-col items-center">
        <div className="flex flex-row">
          <Slider
            title="Word Length"
            min={4}
            max={7}
            value={wordLength}
            onChange={handleWordLength}
          />
          <Slider
            title="Guess Limit"
            max={10}
            min={4}
            value={guessLimit}
            onChange={handleGuessLimit}
          />
        </div>
        {error && <span className="text-red-500">{error}</span>}
        <button
          className="
            bg-violet-300
            hover:bg-violet-400
            hover:ring-2
            hover:ring-violet-500
            justify-self-center
            px-4 py-2 m-1.5
            rounded-full
          "
          onClick={handleNewGame}
        >
          New Game
        </button>
      </div>
    </ListCard>
  );
}

export default GamesActionBar;
