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
      <div className="App h-screen w-screen select-none bg-gradient-to-tr from-sky-400 to-sky-900">
        <Header />
        <div className="flex justify-center w-[75wh]">
          {game?.state === "running" ? <GuessFrame /> : <GamesFrame />}
        </div>
      </div>
    </GameContext.Provider>
  );
}

export default App;
