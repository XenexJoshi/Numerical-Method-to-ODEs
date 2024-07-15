import React, { useState } from "react";
import compile from "../lib/Compiler"

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
    setR(fx({ t: x }));
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