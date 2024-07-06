import React from "react";
import './Navbar.css'

function Navbar() {
  return (
    <nav class="navbar">
      <div class="navbar-content">
        <button class="navbar-btn">Home</button>
        <button class="navbar-btn">About</button>
        <button class="navbar-btn">Contacts</button>
        <button class="navbar-btn">Junkyard</button>
        <button class="navbar-btn">Register</button>
        <button class="navbar-btn">Login</button>
        <button class="navbar-btn">Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
