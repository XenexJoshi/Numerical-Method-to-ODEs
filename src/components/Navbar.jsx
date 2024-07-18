import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="site_title"> Numerical Methods </Link>
      <ul>
        <li>
          <Link to="/About"> About </Link>
        </li>
        <li>
          <Link to="/Help"> Help </Link>
        </li>
        <li>
          <Link to="#"> Services </Link>
          <ul className="dropdown">
            <li> <Link to="/Euler"> Euler </Link> </li>
            <li> <Link to="/Runge-Kutta"> Runge-Kutta </Link> </li>
            <li> <Link to="/Adams-Bashforth"> Adams-Bashforth </Link> </li>
          </ul>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar;