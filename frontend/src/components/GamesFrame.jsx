import React, { useEffect, useState } from "react";
import { fetchGames } from "../client/requests";
import GamesList from "./GamesList";
import GamesActionBar from "./GamesActionBar";

function GamesFrame() {
  const [games, setGames] = useState([]);

  const getGames = async () => {
    const games = await fetchGames();
    games && setGames(games);
  };
  useEffect(() => {
    getGames();
  }, []);

  return (
    <div className="flex flex-row justify-between h-[50%] m-4">
      <GamesList games={games}/>
      <GamesActionBar />
    </div>
  );
}

export default GamesFrame;
