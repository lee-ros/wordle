import { useContext } from "react";
import ItemCard from "./common/ItemCard";
import { GameContext } from "../App";
import { deleteGame, fetchGames } from "../client/requests";

const coloring_data = {
  won: "bg-green-200",
  lost: "bg-red-200",
  running: "bg-slate-200",
};

function GameItem({ game, setGames }) {
  const { setGame } = useContext(GameContext);

  const handlePlay = () => {
    setGame(game);
  };

  const handleRemove = async () => {
    await deleteGame(game.id);

    const games = await fetchGames();
    setGames(games);
  };

  return (
    <ItemCard>
      {/** Game ID */}
      <div className="w-1/3 flex flex-row justify-around items-center">
        <span>Game ID:</span>
        <span className="rounded-md m-1.5 px-0.5 min-w-6 min-h-6 shadow-inner bg-slate-200">
          {game.id}
        </span>
      </div>

      {/** Game State */}
      <div className="w-1/3 flex mx-5 flex-row justify-around items-center">
        <span>Status:</span>
        <span
          className={`
                  rounded-md m-1.5 px-2 shadow-inner
                  ${coloring_data[game.state]}
                  capitalize
              `}
        >
          {game.state}
        </span>
      </div>

      {/** Game Word */}
      <div className="w-1/3 flex flex-row justify-around items-center">
        <span>Word:</span>
        {game.state === "running" ? (
          <span className="rounded-md m-1.5 px-2 shadow-inner bg-slate-200">
            {"*".repeat(game.word_to_guess.length)}
          </span>
        ) : (
          <span className="rounded-md m-1.5 px-2 shadow-inner bg-slate-200">
            {game.word_to_guess}
          </span>
        )}
      </div>

      {/** Actions */}
      <div className="flex flex-row justify-start items-center">
        {/** Remove Button */}
        <button className="group" onClick={handleRemove}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-red-400 group-hover:text-red-500"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {/** Continute Button */}
        <button
          className="group"
          disabled={game.state !== "running"}
          onClick={handlePlay}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-green-400 group-disabled:text-gray-300 group-hover:text-green-500"
          >
            <path
              fillRule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </ItemCard>
  );
}

export default GameItem;
