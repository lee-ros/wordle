import React, { useContext, useEffect, useState } from "react";
import { GameContext } from "../App";
import { fetchGames } from "../client/requests";
import GamesList from "./GamesList";
import GamesActionBar from "./GamesActionBar";

function GamesFrame() {
  const { game, setGame } = useContext(GameContext);
  const [games, setGames] = useState([]);

  const getGames = async () => {
    const games = await fetchGames();
    games && setGames(games);
  };
  useEffect(() => {
    getGames();
  }, []);

  return (
    <div className="flex flex-col justify-between w-1/3 h-[75vh] m-4">
      <GamesList games={games}/>
    </div>
  );
}

export default GamesFrame;
