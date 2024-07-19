import React, { useState } from "react";
import Plot from "react-plotly.js";
import compile from "../lib/Compiler";
import Adams_Bashforth from "../lib/Adams-Bashforth";

function AdamsPage() {
  const [fx, Set_fx] = useState("");
  const [init_t, Set_init_t] = useState("");
  const [init_y, Set_init_y] = useState("");
  const [dest, Set_dest] = useState("");
  const [step, Set_step] = useState("");
  const [table, set_table] = useState([[], []]);

  function handleFunc(event) {
    Set_fx(event.target.value);
  }

  function handle_init_t(event) {
    Set_init_t(event.target.value);
  }

  function handle_init_y(event) {
    Set_init_y(event.target.value);
  }

  function handle_dest(event) {
    Set_dest(event.target.value);
  }

  function handle_step(event) {
    Set_step(event.target.value);
  }

  function generateResult() {
    let t0_fn = compile(init_t);
    let y0_fn = compile(init_y);
    let dest_fn = compile(dest);
    let step_fn = compile(step);

    const fn = compile(fx);
    const t0 = t0_fn({ t: 0 });
    const y0 = y0_fn({ t: 0 });
    const destination = dest_fn({ t: 0 });
    const step_size = step_fn({ t: 0 });

    let result = Adams_Bashforth(fn, t0, y0, destination, step_size);
    set_table(result);
  }

  return (
    <>
      <div className="title">
        <h2> Adams-Bashforth Multi-step Method:</h2>
      </div>
      <div className="wrapper">
        <div className="Euler-handler">
          <h3> Enter input function f'(x): </h3>
          y' : <input className="fx_input" type=" text" placeholder="f(t, y)" value={fx} onChange={handleFunc} />
          <br />
          <p>
            <i> (Use parenthesis, if necessary, to emphasize the order of operation within
              the function. Additionally, the parameters of the function are set to
              t and y. Please check the Help page for additional information on how
              to enter a valid expression into the calculator.)</i>
          </p>
          <h3> Enter initial conditions (t, y): </h3>
          t: <input type="text" placeholder="0" value={init_t} onChange={handle_init_t} />
          y: <input type="text" placeholder="0" value={init_y} onChange={handle_init_y} />
          <br />
          <h3> Enter final t value: </h3>
          t<sub>f</sub> : <input type="text" placeholder="0" value={dest} onChange={handle_dest} />
          <br />
          <h3> Enter the step size for computation: </h3>
          h: <input type="text" placeholder="0" value={step} onChange={handle_step} />
          <br />
          <button className="compute" onClick={generateResult} > Compute </button>
        </div>
        <br />
        <div className="plot">
          <Plot data={[
            {
              x: table[0],
              y: table[1],
              type: 'scatter',
              mode: 'lines+markers',
              marker: { color: 'blue' },
            }
          ]}
            layout={{
              width: 530, height: 530, title: 'Adams-Bashforth Approximation of y(t)',
              xaxis_title: "t", yaxis_title: "y", font: "Times New Roman"
            }} />
        </div>
      </div>
    </>
  );
}

export default AdamsPage;