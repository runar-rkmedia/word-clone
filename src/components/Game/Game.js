import React from "react";

import { sample } from "../../utils";
import { WORDS } from "../../data";
import Guess from "../Guess";
import Board from "../Board";
import { checkGuess } from "../../game-helpers";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";

function createID() {
  return window.crypto?.randomUUID?.() || Math.random();
}

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const [guesses, setGuesses] = React.useState([]);
  const [didGuessCorrectly, setDidGuesCorrectly] = React.useState(false);
  function handleGuess(guess) {
    if (guesses.includes(guess)) {
      return false;
    }
    if (guess === answer) {
      setDidGuesCorrectly(true);
    }
    const g = checkGuess(guess, answer);
    console.log(g, answer);

    setGuesses((s) => {
      return [...s, g];
    });
    return true;
  }

  return (
    <div>
      <Board guesses={[...guesses]} />
      <Guess
        onGuess={handleGuess}
        minLength={5}
        maxLength={5}
        disabled={guesses.length >= NUM_OF_GUESSES_ALLOWED || didGuessCorrectly}
        pattern="^[a-zA-Z]{5}$"
      />
      {didGuessCorrectly && (
        <div class="happy banner">
          <p>
            <strong>Congratulations!</strong> Got it in{" "}
            <strong>{guesses.length} guesses</strong>.
          </p>
        </div>
      )}
      {!didGuessCorrectly && guesses.length >= NUM_OF_GUESSES_ALLOWED && (
        <div class="sad banner">
          <p>
            Sorry, the correct answer is <strong>{answer}</strong>.
          </p>
        </div>
      )}
    </div>
  );
}

export default Game;
