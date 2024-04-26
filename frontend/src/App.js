import { createContext, useState } from "react";

import "./App.css";
import Header from "./components/Header";
import GamesFrame from "./components/GamesFrame";
import GuessFrame from "./components/GuessFrame";

export const GameContext = createContext({
  game: {},
  setGame: () => {},
});

const empty_game = {
  id: -1,
  word_to_guess: "",
  state: "",
  guess_limit: -1,
  guesses: [],
};

function App() {
  const [game, setGame] = useState(empty_game);

  return (
    <GameContext.Provider value={{ game, setGame }}>
      <div className="App">
        <Header />
        <div className="flex justify-center">
          {game.state === "running" ? (
            <GuessFrame />
          ) : (
            <GamesFrame />
          )}
        </div>
      </div>
    </GameContext.Provider>
  );
}

export default App;
