import React from "https://esm.sh/react";
import { StrictMode } from "https://esm.sh/react";
import { createRoot } from "https://esm.sh/react-dom/client";

function Square(props) {
  return (
    <button className="square">
      {props.value}
    </button>
  );
}

function Board() {
  return (
    <>
      <div className="board-row">
        <Square value="1" />
        <Square value="1" />
        <Square value="1" />
      </div>

      <div className="board-row">
        <Square value="1" />
        <Square value="1" />
        <Square value="1" />
      </div>

      <div className="board-row">
        <Square value="1" />
        <Square value="1" />
        <Square value="1" />
      </div>
    </>
  );
}

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <Board />
  </StrictMode>
);