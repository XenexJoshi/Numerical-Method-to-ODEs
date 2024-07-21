import React, { useState } from "react";
import Plot from "react-plotly.js";
import compile from "../lib/Compiler";
import Euler from "../lib/Euler";

/** 
 * [EulerPage] is the page component corresponding to the Euler Approximation 
 * calculator. 
 */
function EulerPage() {

  /** 
   * [fx] is the string representation of the input function that is compiled
   * by the compiler to generate a usable function which allows variables to be 
   * passed upon. 
   */
  const [fx, Set_fx] = useState("");

  /** 
   * [init_t] is the t-coordinate of the initial condition of the differential 
   * equation with starting value (t, y). 
   */
  const [init_t, Set_init_t] = useState("");

  /** 
   * [init_y] is the y-coordinate of the initial condition of the differential 
   * equation with starting value (t, y). 
   */
  const [init_y, Set_init_y] = useState("");

  /** 
   * [dest] is the t-coordinate of the final point for evaluation the differential
   * eqution [fx].
   */
  const [dest, Set_dest] = useState("");

  /**
   * [step] is the interval between two successive points during the numerical
   * approximation of the differentail equation [fx.]
   */
  const [step, Set_step] = useState("");

  /** [table] is a 2d table representing the output of the numerical approximation
   * of [fx], where [table[0]] represents the t-coordinates of the graph, and 
   * [table[1]] represents the y-coordinate of the graph.
   */
  const [table, set_table] = useState([[], []]);

  /**
   * [handleFunc] handles the user input to the function textbox, and changes it
   * accordingly.
   */
  function handleFunc(event) {
    Set_fx(event.target.value);
  }

  /**
   * [handle_init_t] handles the user input to the initial t-coordinate, and 
   * changes it accordingly.
   */
  function handle_init_t(event) {
    Set_init_t(event.target.value);
  }

  /**
   * [handle_init_y] handles the user input to the initial y-coordinate, and 
   * changes it accordingly.
   */
  function handle_init_y(event) {
    Set_init_y(event.target.value);
  }

  /**
   * [handle_dest] handles the user input to the final t-coordinate, and changes 
   * it accordingly.
   */
  function handle_dest(event) {
    Set_dest(event.target.value);
  }

  /**
   * [handle_step] handles the user input to the step-size, and changes it
   * accordingly.
   */
  function handle_step(event) {
    Set_step(event.target.value);
  }

  /**
   * [reset] sets the function [fx], and user input values back to its initial
   * state.
   */
  function reset() {
    Set_fx("");
    Set_init_t("");
    Set_init_y("");
    Set_dest("");
    Set_step("");
    set_table([[], []]);
  }

  /**
   * [generateResult] user the Euler-approximation function to generate the t-coordinates
   * and y-coordinates from the approximation method, and assigns the resulting 
   * values to [table].
   */
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

    let result = Euler(fn, t0, y0, destination, step_size);
    set_table(result);
  }

  /**
   *  Generating the page layout and Euler-approximation calculator functionality 
   * within the webpage.
   */
  return (
    <>
      <div className="title">
        <h2> Euler's Method Calculator:</h2>
      </div>
      <div className="wrapper">
        <div className="handler">
          <div className="card">
            <p> This calculator generates an Euler approximate solution to the
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
              width: 580, height: 530, title: 'Euler Approximation of y(t)',
              font: "Calibri"
            }} />
        </div>
      </div>
    </>
  );
}

export default EulerPage;