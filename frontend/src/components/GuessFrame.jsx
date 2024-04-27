import React from "react";
import GuessList from "./GuessList";
import GuessActionBar from "./GuessActionBar";

function GuessFrame() {
  return (
    <div className="flex flex-col justify-between h-[50%] m-4">
      <GuessActionBar />
      <GuessList />
    </div>
  )
}

export default GuessFrame;
