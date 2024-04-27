import { createContext, useState } from "react";

import "./App.css";
import Header from "./components/Header";
import GamesFrame from "./components/GamesFrame";
import GuessFrame from "./components/GuessFrame";

export const GameContext = createContext({
  game: {},
  setGame: () => {},
});

function App() {
  const [game, setGame] = useState({});

  return (
    <GameContext.Provider value={{ game, setGame }}>
      <div className="App select-none">
        <Header />
        <div className="flex justify-center w-[75wh]">
          {game?.state === "running" ? <GuessFrame /> : <GamesFrame />}
        </div>
      </div>
    </GameContext.Provider>
  );
}

export default App;
