function About() {
  return (
    <>
      <div className="heading">
        <h2> About Us </h2>
        <p>
          <i>Tackle complex first-order differential
            equations at ease, with the numerical methods of your choice.
          </i>
        </p>
      </div>

      <div className="about">
        <p>
          Our calculator allows you to easily obtain a numerical solution to
          first-order differential equation of any kind, using the method of
          your choice. We support Euler-approximation, Runge-Kutta method, and
          Adams-Bashforth multi-step approximation to generate a numerical
          solution to differential equations of any form.
        </p>
        <br />
        <p>
          The calculator supports text input, which is parsed using a compiler
          that supports most fundamental mathematical operations and functions
          relevant for the study of differential equations. We also present a
          visualization of the solution through graph to present a more descriptive
          solution to the ODE.
        </p>
      </div>

      <div className="references">
        <h3> References</h3>
        <p> For further references on how each numerical approximation, check out: </p>
        <br />
        <ul>
          <li>
            <a href="https://en.wikipedia.org/wiki/Euler_method"> Euler method</a>
          </li>
          <li>
            <a href="https://en.wikipedia.org/wiki/Runge%E2%80%93Kutta_methods"> Runge-Kutta method</a>
          </li>
          <li>
            <a href="https://en.wikipedia.org/wiki/Linear_multistep_method"> Adams-Bashforth method</a>
          </li>
        </ul>
        <br />
        <p>
          Finally, Happy Learning.
        </p>
      </div>
    </>
  );
}

export default About;