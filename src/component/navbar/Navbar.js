import React from "react";
import "./Navbar.css";
import GravitiLogo from "../assets/GravitiLogo.svg";
const Navbar = () => {
  return (
    <div className="Navbar">
      <div className="imageContainer">
        <img src={GravitiLogo} alt="❣️" />
      </div>
    </div>
  );
};

export default Navbar;
