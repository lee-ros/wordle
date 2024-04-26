import ListCard from "./common/ListCard";

const coloring_data = {
  won: "bg-green-200",
  lost: "bg-red-200",
  running: "bg-slate-200",
};

function GameItem({ game }) {
  return (
    <ListCard>
      {/** Game ID */}
      <div className="w-1/3 flex flex-row justify-around items-center">
        <span>Game ID:</span>
        <span className="rounded-md m-3 p-1 min-w-6 min-h-6 shadow-inner bg-slate-200">
          {game.id}
        </span>
      </div>

      {/** Game State */}
      <div className="w-1/3 flex mx-5 flex-row justify-around items-center">
        <span>Status:</span>
        <span
          className={`
                  rounded-md m-3 p-1 shadow-inner
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
          <span className="rounded-md m-3 p-1 shadow-inner bg-slate-200">
            {"*".repeat(game.word_to_guess.length)}
          </span>
        ) : (
          <span className="rounded-md m-3 p-1 shadow-inner bg-slate-200">
            {game.word_to_guess}
          </span>
        )}
      </div>
    </ListCard>
  );
}

export default GameItem;
