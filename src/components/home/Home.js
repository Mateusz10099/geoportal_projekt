import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import studenci from "./studenci.png";

function Home({ text }) {
  return (
    <div className="home">
      <div className="home_top">
        <Link to="/about" className="home_top_about">
          O projekcie
        </Link>
      </div>
      <div className="home_bottom">
        <div className="home_left">
          <img className="studenci" src={studenci} alt="students" />
        </div>
        <div className="home_right">
          <div className="home_right_title">
            Zarządzanie uczelniami w mieście i studentami przypisanymi do
            kierunku studiów oraz akademika w którym mieszkają
          </div>
          <Link to="services">
            <button className="home_right_button">START</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
