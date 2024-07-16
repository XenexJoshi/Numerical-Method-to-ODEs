import React, { useState } from "react";
import compile from "../lib/Compiler"
import Euler from "../lib/Euler"
import Runge_Kutta from "../lib/Runge-Kutta";
import Adams_Bashforth from "../lib/Adams-Bashforth";

function Home() {
  const [x, setX] = useState(0.0)
  const [result, setR] = useState(0.0);
  const [f, setFunct] = useState("");

  function handleX(event) {
    setX(parseFloat(event.target.value));
  }

  function handleText(event) {
    setFunct(event.target.value);
  }

  function generateRes() {
    const fx = compile(f);
    setR(Adams_Bashforth(fx, 0, 1, 0.4, 0.1));
  }

  return (
    <div>
      <input type="text" placeholder="0" value={x} onChange={handleX} />
      <input type="text" value={f} onChange={handleText} />
      <button onClick={generateRes}> Click </button>
      <p> {result} </p>
    </div>
  )
}

export default Home;