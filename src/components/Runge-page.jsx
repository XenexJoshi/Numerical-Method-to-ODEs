import React, { useState } from "react";
import Plot from "react-plotly.js";
import compile from "../lib/Compiler";
import Runge_Kutta from "../lib/Runge-Kutta";

/* [RungePage] is the page component corresponding to the Runge-Kutta 
Approximation calculator.*/
function RungePage() {
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

  function reset() {
    Set_fx("");
    Set_init_t("");
    Set_init_y("");
    Set_dest("");
    Set_step("");
    set_table([[], []]);
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

    let result = Runge_Kutta(fn, t0, y0, destination, step_size);
    set_table(result);
  }

  return (
    <>
      <div className="title">
        <h2> Runge-Kutta Method Calculator:</h2>
      </div>
      <div className="wrapper">
        <div className="handler">
          <div className="card">
            <p> This calculator generates an Runge-Kutta solution to the
              input first-order differential equation y' = f(t, y).
            </p>
            <br />

            <p>
              <i>
                Use parenthesis, if necessary, to emphasize the order of operation
                within the function. Please check the Help page for additional
                information on how to enter a valid expression into the calculator.
              </i>
            </p>
          </div>

          <div className="entry">
            <p> Enter input function f'(x): </p>
            y' = f(t, y) = <input className="fx_input" type=" text"
              placeholder="f(t, y)" value={fx} onChange={handleFunc} />
            <br />

            <p> Enter initial conditions (t, y): </p>
            t<sub>0 </sub>: <input type="text" placeholder="0" value={init_t}
              onChange={handle_init_t} />
            y<sub>0 </sub>: <input type="text" placeholder="0" value={init_y}
              onChange={handle_init_y} />
            <br />

            <p> Enter final t value: </p>
            t<sub>n </sub> : <input type="text" placeholder="0" value={dest}
              onChange={handle_dest} />
            <br />

            <p> Enter the step-size: </p>
            h: <input type="text" placeholder="0" value={step}
              onChange={handle_step} />
            <br />

            <button className="compute" onClick={generateResult} > Compute </button>
            <button className="clear" onClick={reset} > Clear </button>
          </div>
        </div>

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
              width: 580, height: 530, title: 'Runge-Kutta Approximation of y(t)',
              font: "Calibri"
            }} />
        </div>
      </div>
    </>
  );
}

export default RungePage;