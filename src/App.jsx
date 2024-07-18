import Navbar from "./components/Navbar.jsx"
import Home from "./components/Home.jsx"
import About from "./components/About.jsx";
import Help from "./components/Help.jsx";
import EulerPage from "./components/Euler-page.jsx";
import RungePage from "./components/Runge-page.jsx";
import AdamsPage from "./components/Adams-page.jsx";
import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <>
      <Navbar> </Navbar>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Help" element={<Help />} />
          <Route path="/Euler" element={<EulerPage />} />
          <Route path="/Runge-Kutta" element={<RungePage />} />
          <Route path="/Adams-Bashforth" element={<AdamsPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App