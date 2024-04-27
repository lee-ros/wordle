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
    <div className="flex flex-col justify-between h-[55vh] w-[40vw] m-4">
      <div className="h-48 mb-2">
        <GamesActionBar />
      </div>
      <GamesList games={games} setGames={setGames} />
    </div>
  );
}

export default GamesFrame;
