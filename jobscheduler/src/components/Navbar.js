import React from "react";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">JobScheduler EDU</h2>
      <ul className="nav-links">
        <li>Home</li>
        <li>Algorithms</li>
        <li>Simulation</li>
        <li>Resources</li>
      </ul>
    </nav>
  );
}

export default Navbar;