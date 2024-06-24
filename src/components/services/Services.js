import React from "react";
import "./Services.css";
import { Link } from "react-router-dom";
import pracownicyIcon from "./pracownicy.png";
import uczelnieIcon from "./uczelnie.png";
import studenciIcon from "./studenci3.png";

function Services() {
  return (
    <div className="services">
      <div className="services_title">ZARZĄDZAJ</div>
      <div className="services_bottom">
        <Link to="/employee" className="services_option">
          <div className="services_label">Pracownikami</div>
          <img
            src={pracownicyIcon}
            alt="Pracownicy"
            className="services_image"
          />
        </Link>
        <Link to="/universities" className="services_option">
          <div className="services_label">Uczelniami</div>
          <img src={uczelnieIcon} alt="Uczelnie" className="services_image" />
        </Link>
        <Link to="/students" className="services_option">
          <div className="services_label">Studentami</div>
          <img src={studenciIcon} alt="Studenci" className="services_image" />
        </Link>
      </div>
      <Link to="/" className="services_button">
        Powrót do strony głównej
      </Link>
    </div>
  );
}

export default Services;
