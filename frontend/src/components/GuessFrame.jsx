import React from "react";
import GuessList from "./GuessList";
import GuessActionBar from "./GuessActionBar";

function GuessFrame() {
  return (
    <div className="flex flex-col justify-between h-[65vh] w-[40vw] m-4">
      <div className="h-48 mb-2">
        <GuessActionBar />
      </div>
      <GuessList />
    </div>
  );
}

export default GuessFrame;
