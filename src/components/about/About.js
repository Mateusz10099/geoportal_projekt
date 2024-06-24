import React from "react";
import { Link } from "react-router-dom";
import "./About.css";
import mapka from "./mapka.png";
import studenci2 from "./studenci2.png";

function About() {
  return (
    <div className="about">
      <h1 className="about_title">O Projekcie</h1>
      <div className="about_content">
        <div className="about_text">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            viverra urna vel nulla molestie ornare. Sed fringilla urna eu sem
            facilisis, eget luctus diam hendrerit. Duis mattis elit eget magna
            commodo, sit amet laoreet arcu ullamcorper. Curabitur sapien nunc,
            eleifend quis ex sed, commodo gravida sapien. Curabitur eu nulla
            interdum, rhoncus hendrerit odio, luctus velit. Duis lectus odio,
            venenatis nec finibus in, egestas vel velit. Nunc sed tincidunt
            nunc. Integer vehicula, arcu nec mattis cursus, nunc ligula blandit
            rhoncus. Nunc consectetur felis et tellus luctus fermentum. Mauris
            ac augue quis ligula blandit rhoncus.
          </p>
          <p>
            Praesent at mattis tortor. Etiam sem tellus, fermentum vitae enim
            id, consequat hendrerit eros. Duis id consequat dui, nec condimentum
            ipsum. Maecenas in arcu a erat commodo aliquet eu quis purus. Fusce
            ullamcorper ornare purus, in auctor arcu placerat in. Aenean
            accumsan elit in felis, et tincidunt ligula ornare lacinia. Aenean
            ornare enim id quam rhoncus id volutpat ac, lacinia eget nisi.
            Integer posuere arcu neque, id vestibulum sem tempus vitae. Sed
            finibus, erat eu commodo gravida, dolor magna mattis mauris, dui
            ultricies tortor justo id dolor. Suspendisse quis sem in justo
            aliquet pretium non a nisl. Nunc laoreet ligula ac suscipit diam.
          </p>
          <p>
            Nam non sem ante. Aliquam molestie luctus est, sed ullamcorper diam
            ultricies in. Integer ultricies mattis tortor, a facilisis nisi
            rhoncus in faucibus. Nulla viverra pulvinar odio, eu gravida lacus.
            Cras in lorem in turpis pulvinar vestibulum. Duis nec ex a eros
            rhoncus finibus. Duis ex ex eleifend, accumsan purus ac, suscipit
            nibh.
          </p>
        </div>
        <div className="about_images">
          <img src={mapka} alt="mapka" className="about_image" />
          <p>
            Pellentesque et lorem ipsum. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. In dignissim nisi sed turpis tincidunt, id volutpat
            diam luctus. In hac habitasse platea.
          </p>
          <img src={studenci2} alt="studenci" className="about_image" />
        </div>
      </div>
      <Link to="/" className="about_button">
        Powrót do strony głównej
      </Link>
    </div>
  );
}

export default About;
