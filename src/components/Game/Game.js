import React from "react";

import { sample } from "../../utils";
import { WORDS } from "../../data";
import Guess from "../Guess";
import Board from "../Board";
import Keyboard from "../Keyboard";
import { checkGuess } from "../../game-helpers";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";
// Pick a random word on every pageload.
const ans = sample(WORDS);

function Game() {
  const [answer, setAnswer] = React.useState(ans);
  React.useEffect(() => {
    console.info({ answer });
  }, [answer]);
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

    setGuesses((s) => {
      return [...s, g];
    });
    return true;
  }

  function restart() {
    setGuesses([]);
    setDidGuesCorrectly(false);
    setAnswer(sample(WORDS));
    document.querySelectorAll("[name]").forEach((el) => {
      el.value = "";
      el.focus();
    });
  }

  const keyStatuses = guesses.reduce((r, g) => {
    for (const gs of g) {
      r[gs.letter] = gs.status;
    }
    return r;
  }, {});

  return (
    <div>
      <Board guesses={[...guesses]} />
      <button onClick={restart}>Restart</button>
      <Guess
        onGuess={handleGuess}
        minLength={5}
        maxLength={5}
        disabled={guesses.length >= NUM_OF_GUESSES_ALLOWED || didGuessCorrectly}
        pattern="^[a-zA-Z]{5}$"
      />
      {didGuessCorrectly && (
        <div className="happy banner">
          <p>
            <strong>Congratulations!</strong> Got it in{" "}
            <strong>{guesses.length} guesses</strong>.
          </p>
        </div>
      )}
      {!didGuessCorrectly && guesses.length >= NUM_OF_GUESSES_ALLOWED && (
        <div className="sad banner">
          <p>
            Sorry, the correct answer is <strong>{answer}</strong>.
          </p>
        </div>
      )}
      <Keyboard keyStatuses={keyStatuses} />
    </div>
  );
}

export default Game;
