/** 
 * [Help] is the page component of the Help page that contains helpful instructions
 * on how to use the different numerical approximation methods, and input functions
 * into the textbox for the compiler to parse it successfully.
 */
function Help() {
  return (
    <>
      <div className="help">
        <h2> How To Use? </h2>
        <br />
        <p>
          Navigate to the Services option on the Navbar, and select the numerical
          approximation method of your choice among Euler method, Runge-Kutta
          approximation, and Adams-Bashforth muli-step method. Select the method
          your choice, and it will direct you to the webpage corresponding to
          the chosen method.
        </p>
        <br />
        <p>
          Type in the function in the textbox labelled f'(x) or y', and set the
          boundary conditions in the given boxes. When you input your function,
          ensure that any operation has been explicitly written out, and use
          parenthesis to define the order of operation. A few examples of proper
          input format are given below:
        </p>
        <br />
        <ul>
          <li> (2x<sup>2</sup> + 3x + 2) == (2 * (x ^ 2) + 3 * x + 2) </li>
          <li> (sin(x<sup>3</sup>)) == (sin (x ^ 3)) </li>
          <li> ((tan<sup>2 </sup>x + 2)) == ((tan x) ^ 2) </li>
          <li> (ln x<sup>2 </sup> + y - sinh x) == (ln (x ^ 2) + y - sinh x) </li>
        </ul>
        <br />
        <p>
          After pressing the submit button, the webpage will approximate a numerical
          solution to your input differential equation, which will be displayed on
          the graph alongside. If an output is not displayed, it is probably because
          the compiler could not parse the expression. In such scenario, check that
          the input has been passed on in a valid format, or check the boundary conditions
          to ensure that the function does not diverge, or remain undefined at any
          points between the initial and final t-positions.
        </p>
      </div>
    </>
  );
}

export default Help;