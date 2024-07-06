import React from "react";
import './Navbar.css'

function Navbar() {
  return (
    <nav class="navbar">
      <div class="navbar-content">
        <button className="navbar-btn">Home</button>
        <button className="navbar-btn">About</button>
        <button className="navbar-btn">Contacts</button>
        <button className="navbar-btn">Junkyard</button>
        <button className="navbar-btn">Register</button>
        <button className="navbar-btn">Login</button>
        <button className="navbar-btn">Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
