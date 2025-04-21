import React, { useState, useEffect } from "react";
// Import your component styles here
import "./AdminLayout.css";
import { FaArrowLeft, FaBars, FaLongArrowAltRight } from "react-icons/fa";
import person from "../../assets/images/people.png";
import AdminSideBar from "./AdminSideBar";
import { schoolInfo } from "../../store/Info";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { getAllSchools } from "../../APiData/Api";

interface Props {
  children: any;
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

export default function AdminLayout(props: Props) {
  const navigate = useNavigate();
  const [isSidebarHidden, setIsSidebarHidden] = useState(
    window.innerWidth < 768
  );
  const [isSearchFormShown, setIsSearchFormShown] = useState(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [schools, setSchools] = useState([]);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Optionally, you can save the user preference in local storage
    localStorage.setItem("darkMode", JSON.stringify(!darkMode));
  };
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await axios.get(getAllSchools);

        setSchools(
          response.data.filter((item: any) => item._id === schoolInfo)
        );
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchSchools();
  }, []);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarHidden(true);
        setIsSearchFormShown(false);
      } else {
        setIsSidebarHidden(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSidebarToggle = () => {
    setIsSidebarHidden(!isSidebarHidden);
  };

  const handleSearchButtonClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (window.innerWidth < 576) {
      setIsSearchFormShown(!isSearchFormShown);
    }
  };

  return (
    <>
      <div className={`body ${darkMode ? "dark" : "light"}`}>
        <section id="sidebar" className={isSidebarHidden ? "hide" : ""}>
          <a href="#" className="brand">
            <i className="bx bxs-smile"></i>
            <Link
              to="/admin"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <span className="text">AdminHub</span>
            </Link>
          </a>

          <ul className="side-menu top">
            <li className="active">
              <a href="#">
                <i className="bx bxs-dashboard"></i>
                <span className="text">Dashboard</span>
              </a>
            </li>
            <AdminSideBar />
          </ul>
        </section>

        {/* <!-- SIDEBAR --> */}

        {/* <!-- CONTENT --> */}
        <section id="content">
          {/* <!-- NAVBAR --> */}
          <nav>
            <div
              className="navbar-icon"
              onClick={handleSidebarToggle}
              style={{ cursor: "pointer" }}
            >
              <div>
                <FaBars className="bars" />
              </div>
            </div>
            <i className="bx bx-menu"></i>
            <a href="#" className="nav-link">
              Categories
            </a>

            <form action="#">
              <div className="form-input">
                <input type="search" placeholder="Search..." />
                <button type="submit" className="search-btn">
                  <i className="bx bx-search"></i>
                </button>
              </div>
            </form>

            <label className="labledarkmode">
              Dark Mode <FaLongArrowAltRight />
            </label>
            <input
              type="checkbox"
              id="switch-mode"
              // hidden
              onChange={toggleDarkMode}
              checked={darkMode}
            />
            <label className="switch-mode"></label>
            <a href="#" className="notification">
              <i className="bx bxs-bell"></i>
              {/* <span className="num">8</span> */}
            </a>
            <a
              href="#"
              // className="profile"
            >
              <Link to="/admin">
                {schools.map((item: any) => (
                  <div key={item._id} className="school-admin-logo">
                    <img src={item?.schoolLogo} className="admin-logo-pix" />
                  </div>
                ))}
              </Link>
            </a>
          </nav>
          {/* <!-- NAVBAR --> */}

          {/* <!-- MAIN --> */}
          <main>{props.children}</main>
        </section>
        {/* ////// */}
      </div>
    </>
  );
}
