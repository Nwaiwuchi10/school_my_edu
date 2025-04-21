import React from "react";
import image from "../../assets/images/creche.jpeg";
import "./Card.css";
import { Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { RiContactsLine } from "react-icons/ri";
import { BsBookHalf, BsCheckSquare } from "react-icons/bs";
import { MdAccountBox, MdManageAccounts } from "react-icons/md";
import {
  FaCheck,
  FaBookReader,
  FaUserGraduate,
  FaCashRegister,
} from "react-icons/fa";
import { Button } from "@mui/joy";
const Card = () => {
  return (
    <div>
      <div className="card-app">
        <h1 className="text-center card-h1  ">Welcome to our e-portal</h1>

        <div className="skiller-col">
          <div className="portal-border-div">
            <div className="portal-icon">
              <BsCheckSquare />{" "}
            </div>{" "}
            <div className="portal-phase">
              <div className="portal-write">CHECK RESULT</div>
              <div className="portal-btn">
                <Link
                  to="/online-result"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {" "}
                  <button className="btn-portal">Proceed</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="portal-border-div">
            <div className="portal-icon">
              <BsBookHalf />{" "}
            </div>{" "}
            <div className="portal-phase">
              <div className="portal-write">STUDENT PORTAL</div>
              <div className="portal-btn">
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {" "}
                  <button className="btn-portal">Proceed</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="portal-border-div">
            <div className="first-portl-div-icon">
              <div className="portal-icon">
                <RiContactsLine />{" "}
              </div>
            </div>

            <div className="portal-phase">
              <div className="portal-write">SCHOOL ADMIN</div>
              <div className="portal-btn">
                <Link
                  to="/School-login"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {" "}
                  <button className="btn-portal">Proceed</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="portal-border-div">
            {" "}
            <div className="portal-icon">
              <MdManageAccounts />{" "}
            </div>
            <div className="portal-phase">
              <div className="portal-write">STAFF LOGIN</div>
              <div className="portal-btn">
                <Link
                  to="/staff-login"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <button className="btn-portal">Proceed</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
