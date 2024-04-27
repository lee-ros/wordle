import React from "react";
import GameItem from "./GameItem";
import ItemCard from "./common/ItemCard";
import ListCard from "./common/ListCard";

function GamesList({ games }) {
  return (
    <ListCard>
      <div className="flex flex-col justify-start">
        {games.length !== 0 ? (
          games.map((game) => {
            return <GameItem game={game} />;
          })
        ) : (
          <ItemCard>
            <span>No games, start a new one</span>
          </ItemCard>
        )}
      </div>
    </ListCard>
  );
}

export default GamesList;
