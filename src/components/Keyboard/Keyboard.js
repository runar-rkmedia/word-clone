import classNames from "class-names";
import React from "react";

const keys = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNHM"].map((row) => [...row]);

function Keyboard({ keyStatuses }) {
  return (
    <div className="keyboard">
      {keys.map((row, i) => {
        return (
          <div key={i}>
            {row.map((key) => {
              return (
                <div
                  className={classNames("cell", keyStatuses[key] || "unset")}
                  key={key}
                >
                  {key}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default Keyboard;
