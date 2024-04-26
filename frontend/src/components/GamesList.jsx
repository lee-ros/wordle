import React from "react";
import GameItem from "./GameItem";
import ListCard from "./common/ListCard";

function GamesList({ games }) {
  return (
    <div className="shadow-inner h-full bg-gray-50 p-1">
      {games.length === 0 ? (
        games.map((game) => {
          return <GameItem game={game} />;
        })
      ) : (
        <ListCard>
          <span>No games, start a new one</span>
        </ListCard>
      )}
    </div>
  );
}

export default GamesList;
