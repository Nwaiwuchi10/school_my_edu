import React from "react";
import "./Service.css";
import laptop from "../../assets/images/laptop.webp";
import { Checkbox } from "@mui/material";
const Service = () => {
  return (
    <div className="service-bg-div">
      <div className="containers">
        <div className="service-page-display">
          <div>
            <img src={laptop} alt="laptop" />
          </div>
          <div className="div-phase2">
            <div
              className="inline-flex items-center
             rounded-full border px-2.5 py-0.5 font-semibold 
             transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 
             text-carnation-500 mb-2 text-md c-color"
            >
              What We Offer
            </div>
            <div className="service-upload">
              Print Your School Terminal Result From AnyWhere
            </div>
            <p className="service-p-tag">
              This web Platform is created for students to be able to check and
              print their school terminal result from their comfort zone at any
              given time
            </p>
            <div>
              <Checkbox /> <span className="span-content">Terminal Result</span>{" "}
            </div>
            <div>
              <Checkbox />{" "}
              <span className="span-content">Commulative Result </span>{" "}
            </div>
            <div>
              <Checkbox />{" "}
              <span className="span-content">Commmitment To Excellence</span>{" "}
            </div>

            <div>
              <Checkbox />{" "}
              <span className="span-content">Accuracy & Effiencency</span>{" "}
            </div>

            <button className="contact-btn">
              Learn More
              {/* <IoIosArrowRoundForward />{" "} */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
