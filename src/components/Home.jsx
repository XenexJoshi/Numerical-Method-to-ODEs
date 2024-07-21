import { Link } from "react-router-dom";

/** 
 * [Home] is the page component of the loading-page of the website that contains
 * an introductory visual, and animation component for the front page of the 
 * program.
 */
function Home() {
  return (
    <>
      <div className="container">
        <div className="bubbles">
          <span style={{ "--i": 11 }}></span>
          <span style={{ "--i": 24 }}></span>
          <span style={{ "--i": 13 }}></span>
          <span style={{ "--i": 30 }}></span>
          <span style={{ "--i": 22 }}></span>
          <span style={{ "--i": 19 }}></span>
          <span style={{ "--i": 16 }}></span>
          <span style={{ "--i": 24 }}></span>
          <span style={{ "--i": 23 }}></span>
          <span style={{ "--i": 43 }}></span>
          <span style={{ "--i": 33 }}></span>
          <span style={{ "--i": 21 }}></span>
          <span style={{ "--i": 15 }}></span>
          <span style={{ "--i": 16 }}></span>
          <span style={{ "--i": 27 }}></span>
          <span style={{ "--i": 32 }}></span>
          <span style={{ "--i": 16 }}></span>
          <span style={{ "--i": 30 }}></span>
          <span style={{ "--i": 20 }}></span>
          <span style={{ "--i": 43 }}></span>
          <span style={{ "--i": 9 }}></span>
          <span style={{ "--i": 20 }}></span>
          <span style={{ "--i": 31 }}></span>
          <span style={{ "--i": 11 }}></span>
          <span style={{ "--i": 15 }}></span>
          <span style={{ "--i": 19 }}></span>
          <span style={{ "--i": 24 }}></span>
          <span style={{ "--i": 32 }}></span>
          <span style={{ "--i": 16 }}></span>
          <span style={{ "--i": 9 }}></span>
          <span style={{ "--i": 22 }}></span>
          <span style={{ "--i": 37 }}></span>
          <span style={{ "--i": 18 }}></span>
          <span style={{ "--i": 19 }}></span>
          <span style={{ "--i": 35 }}></span>
          <span style={{ "--i": 9 }}></span>
          <span style={{ "--i": 12 }}></span>
          <span style={{ "--i": 15 }}></span>
          <span style={{ "--i": 24 }}></span>
          <span style={{ "--i": 25 }}></span>
        </div>
      </div >

      <div className="home_header">
        <h3> Numerical Methods to First-Order Differential Equations </h3>
        <br />
        <p>
          <i>
            Tackle complex first-order differential equations with ease.
          </i>
        </p>
        <br />
        <ul>
          <li>
            <li> <Link to="/Euler"> Euler Approximation </Link> </li>
            <li> <Link to="/Runge-Kutta"> Runge-Kutta Method</Link> </li>
            <li> <Link to="/Adams-Bashforth"> Adams-Bashforth  Multistep Method</Link> </li>
          </li>
        </ul>
      </div>


    </>
  )
}

export default Home;