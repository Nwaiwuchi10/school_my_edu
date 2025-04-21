import React from "react";
import logo from "../../assets/images/logo.jpeg";
import "./TopNav.css";
import { BsFillTelephoneInboundFill } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";

import { FaGlobeAfrica } from "react-icons/fa";
const TopNavBar = () => {
  return (
    <div className="topnav">
      <div className="topnav-div">
        <div className="top-flex-icon">
          <FaGlobeAfrica className="topnav-icons" /> Area N, W.B.H.E New Owerri
        </div>
        <div className="top-flex-icon">
          <span>
            <AiOutlineMail className="topnav-icons" />{" "}
          </span>
          <span>myeduresult.com</span>
        </div>
        <div className="top-flex-icon">
          <span>
            <BsFillTelephoneInboundFill className="topnav-icons" />{" "}
          </span>
          <span>
            +2348136757488
            {/* or +2349077231031 */}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TopNavBar;
