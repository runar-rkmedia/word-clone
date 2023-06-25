import React from "react";

function Guess({ onGuess, ...rest }) {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current?.focus();
  }, []);
  function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const value = data.get("guess");
    if (!value) {
      return;
    }
    if (rest.minLength && value.length < rest.minLength) {
      alert("Too short!");
      return;
    }
    if (rest.maxLength && value.length > rest.maxLength) {
      alert("Too long!");
      return;
    }
    onGuess(value.toUpperCase());
    const input = e.target.querySelector('[name="guess"]');
    if (!input) {
      return;
    }
    input.value = "";
    input.focus();
  }
  return (
    <form className="guess-input-wrapper" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="guess-input">Enter guess:</label>
        <input
          autoFocus
          id="guess-input"
          name="guess"
          type="text"
          ref={ref}
          {...rest}
        />
      </div>
    </form>
  );
}

export default Guess;
