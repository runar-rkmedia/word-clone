import React from "react";

import { sample } from "../../utils";
import { WORDS } from "../../data";
import Guess from "../Guess";
import Board from "../Board";
import { checkGuess } from "../../game-helpers";

function createID() {
  return window.crypto?.randomUUID?.() || Math.random();
}

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const [guesses, setGuesses] = React.useState([]);
  function handleGuess(guess) {
    if (guesses.includes(guess)) {
      return false;
    }
    const g = checkGuess(guess, answer);

    setGuesses((s) => {
      return [...s, g];
    });
    return true;
  }

  return (
    <div>
      <Board guesses={[...guesses]} answer={answer} />
      <Guess
        onGuess={handleGuess}
        minLength={5}
        maxLength={5}
        disabled={guesses.length >= 5}
        pattern="^[a-zA-Z]{5}$"
      />
    </div>
  );
}

export default Game;
