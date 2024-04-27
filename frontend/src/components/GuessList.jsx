import React, { Fragment, useContext } from "react";
import { GameContext } from "../App";
import GuessItem from "./GuessItem";
import ListCard from "./common/ListCard";
import ItemCard from "./common/ItemCard";

function GuessList() {
  const { game } = useContext(GameContext);
  return (
    <ListCard>
      <div className="flex flex-col justify-start h-[65vh]">
        {game.guesses.length !== 0 ? (
          game.guesses.map((guess, i) => {
            return (
              <Fragment key={i}>
                <GuessItem
                  value={guess.value}
                  coloringScheme={guess.coloring_scheme}
                />
              </Fragment>
            );
          })
        ) : (
          <ItemCard>
            <span>You haven't made any guesses yet</span>
          </ItemCard>
        )}
      </div>
    </ListCard>
  );
}

export default GuessList;
