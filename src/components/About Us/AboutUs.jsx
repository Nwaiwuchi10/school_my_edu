import React from "react";
import "./AboutUs.css";

import int from "../../assets/images/restj.jpg";
import CountUp from "react-countup";

import Zoom from "react-reveal/Zoom";

import Fade from "react-reveal/Fade";
import { Link } from "react-router-dom";
const AboutUs = () => {
  const email = "uc@regiscajeinteriors.com";
  const handleGmailClick = () => {
    // Replace 'mailto' with the recipient's email
    window.location.href = `mailto:${email}`;
  };
  return (
    <div className="About-us-main-div" id="about-us">
      {/* anoda page of who we are */}
      <div className="who-we-are-display-div ">
        <div>
          <div className="about-us-div2-img">
            <Fade left>
              <img src={int} alt="int" className="who-img" />
            </Fade>
          </div>
        </div>

        <div className="who-we-are-content-div">
          <div className="who-we-are-h1">WHO WE ARE</div>
          <div className="Builders-writeup">
            My Edu Result <span className="lowercase">(myeduresult)</span>{" "}
          </div>
          <div>
            My School Result is a leading School terminal result platform that
            specializes in crafting exceptional, user friendly and accurate
            result broad sheet across countries. With a diverse portfolio
            spanning school management, e-portal, online learning etc. My School
            Result create a very vital platform where school students can check
            and print their school terminal result at their comfort zone. we
            bring innovation and expertise to this project.{" "}
          </div>
          <div className="numbers-display-div">
            <div>
              <div className="number-div">
                <CountUp end={1} duration={20} />K{" "}
              </div>

              <div>Schools</div>
            </div>
            <div className="about-us-hr"></div>
            <div>
              <div className="number-div">
                {" "}
                <CountUp end={100} duration={20} />%
              </div>

              <div>Happy Clients</div>
            </div>
            <div className="about-us-hr"></div>
            <div>
              <div className="number-div">
                <CountUp end={100} duration={20} />%{" "}
              </div>
              <span></span>
              <div>User Friendly</div>
            </div>
          </div>
          <button className="contact-btn">
            <Link
              to="/About-us"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Know More
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
