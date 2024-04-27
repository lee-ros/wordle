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

const mock_game = {
  id: 1,
  word_to_guess: "world",
  state: "running",
  guess_limit: 5,
  guesses: [
    {
      value: "hello",
      coloring_scheme: ["no_match", "no_match", "no_match", "in_place", "wrong_place"]
    },
    {
      value: "hello",
      coloring_scheme: ["no_match", "no_match", "no_match", "in_place", "wrong_place"]
    },
  ],
};

function App() {
  const [game, setGame] = useState(mock_game);

  return (
    <GameContext.Provider value={{ game, setGame }}>
      <div className="App select-none">
        <Header />
        <div className="flex justify-center w-[75wh]">
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
