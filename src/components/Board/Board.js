import React from "react";
import classNames from "class-names";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants.js";

function Board({ guesses = [] }) {
  const empty = new Array(NUM_OF_GUESSES_ALLOWED - guesses.length).fill(
    "     "
  );
  return (
    <div className="guess-results">
      {guesses.map((g, i) => {
        return (
          <p key={i} className="guess">
            {g.map((s, j) => (
              <span key={j} className={classNames("cell", s.status)}>
                {s.letter}
              </span>
            ))}
          </p>
        );
      })}
      {empty.map((g, i) => {
        return (
          <p key={g + i} className="guess">
            {[...g].map((s, j) => (
              <span key={i + j} className="cell">
                {s}
              </span>
            ))}
          </p>
        );
      })}
    </div>
  );
}

export default Board;
