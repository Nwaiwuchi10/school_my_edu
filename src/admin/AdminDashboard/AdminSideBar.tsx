import React from "react";
import { FaArrowDown, FaShoppingBag } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";

import { Link, useNavigate } from "react-router-dom";
import { Dropdown, Menu, MenuButton, MenuItem } from "@mui/joy";

const AdminSideBar = () => {
  const navigate = useNavigate();
  const [logoutUser, setLogoutUser] = React.useState<any>();
  const logout = () => {
    setLogoutUser(localStorage.setItem("schoolId", ""));

    navigate("/");
  };
  return (
    <>
      <li
        style={{
          marginTop: "20px",
        }}
      >
        <a href="#">
          <i className="bx bxs-shopping-bag-alt"></i>
          {/* <FaShoppingBag /> */}

          <Dropdown id="sidebar">
            <MenuButton
              style={{
                border: "2px solid transparent",
                fontSize: "medium",
              }}
            >
              Register Student{" "}
              <MdKeyboardArrowDown style={{ marginLeft: "5px" }} />
            </MenuButton>
            <Menu>
              <MenuItem>
                <Link to="/register-student">Register a Student</Link>{" "}
              </MenuItem>
            </Menu>
          </Dropdown>
        </a>
      </li>

      <li style={{ marginTop: "20px" }}>
        <a href="#">
          <i className="bx bxs-shopping-bag-alt"></i>
          {/* <FaShoppingBag /> */}

          <Dropdown id="sidebar">
            <MenuButton
              style={{ border: "2px solid transparent", fontSize: "medium" }}
            >
              Students <MdKeyboardArrowDown style={{ marginLeft: "5px" }} />
            </MenuButton>
            <Menu>
              <MenuItem>
                <Link to="/view-student">View Students</Link>
              </MenuItem>
            </Menu>
          </Dropdown>
        </a>
      </li>
      <li style={{ marginTop: "20px" }}>
        <a href="#">
          <i className="bx bxs-shopping-bag-alt"></i>
          {/* <FaShoppingBag /> */}

          <Dropdown id="sidebar">
            <MenuButton
              style={{ border: "2px solid transparent", fontSize: "medium" }}
            >
              Staffs <MdKeyboardArrowDown style={{ marginLeft: "5px" }} />
            </MenuButton>
            <Menu>
              <MenuItem>
                {" "}
                <Link to="/view-staffs">View Staffs</Link>
              </MenuItem>
            </Menu>
          </Dropdown>
        </a>
      </li>
      <li style={{ marginTop: "20px" }}>
        <a href="#">
          <i className="bx bxs-shopping-bag-alt"></i>
          {/* <FaShoppingBag /> */}

          <Dropdown id="sidebar">
            <MenuButton
              style={{ border: "2px solid transparent", fontSize: "medium" }}
            >
              Class <MdKeyboardArrowDown style={{ marginLeft: "5px" }} />
            </MenuButton>
            <Menu>
              <MenuItem>
                {" "}
                <Link to="/create-class">Create Class</Link>{" "}
              </MenuItem>
              <MenuItem>
                {" "}
                <Link to="/view-class">View Classes</Link>{" "}
              </MenuItem>
            </Menu>
          </Dropdown>
        </a>
      </li>
      <li style={{ marginTop: "20px" }}>
        <a href="#">
          <i className="bx bxs-shopping-bag-alt"></i>
          {/* <FaShoppingBag /> */}

          <Dropdown id="sidebar">
            <MenuButton
              style={{ border: "2px solid transparent", fontSize: "medium" }}
            >
              Subjects <MdKeyboardArrowDown style={{ marginLeft: "5px" }} />
            </MenuButton>
            <Menu>
              <MenuItem>
                <Link to="/create-subject">Create Subject</Link>
              </MenuItem>
              <MenuItem>
                {" "}
                <Link to="/view-subjects">View Subjects</Link>
              </MenuItem>
            </Menu>
          </Dropdown>
        </a>
      </li>

      <li style={{ marginTop: "20px" }}>
        <a href="#">
          <i className="bx bxs-shopping-bag-alt"></i>
          {/* <FaShoppingBag /> */}

          <Dropdown id="sidebar">
            <MenuButton
              style={{ border: "2px solid transparent", fontSize: "medium" }}
            >
              Subject Score Sheet{" "}
              <MdKeyboardArrowDown style={{ marginLeft: "5px" }} />
            </MenuButton>
            <Menu>
              <MenuItem>
                {" "}
                <Link to="/subject-score">Upload Student Subject Score</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/view-subject-marks">View subject Scores</Link>
              </MenuItem>
              {/* <MenuItem>
                {" "}
                <Link to="/view-selected-subject-marks">
                  View Student Subject Score
                </Link>
              </MenuItem> */}
            </Menu>
          </Dropdown>
        </a>
      </li>
      <li style={{ marginTop: "20px" }}>
        <a href="#">
          <i className="bx bxs-shopping-bag-alt"></i>
          {/* <FaShoppingBag /> */}

          <Dropdown id="sidebar">
            <MenuButton
              style={{ border: "2px solid transparent", fontSize: "medium" }}
            >
              Result <MdKeyboardArrowDown style={{ marginLeft: "5px" }} />
            </MenuButton>
            <Menu>
              <MenuItem>
                {" "}
                <Link to="/create-result">Upload Result</Link>
              </MenuItem>
              <MenuItem>
                {" "}
                <Link to="/viewResult">View Result</Link>
              </MenuItem>
            </Menu>
          </Dropdown>
        </a>
      </li>
      <li style={{ marginTop: "20px" }}>
        <a href="#">
          <i className="bx bxs-shopping-bag-alt"></i>
          {/* <FaShoppingBag /> */}

          <Dropdown id="sidebar">
            <MenuButton
              style={{ border: "2px solid transparent", fontSize: "medium" }}
            >
              Result Master Sheet
              <MdKeyboardArrowDown style={{ marginLeft: "5px" }} />
            </MenuButton>
            <Menu>
              <MenuItem>
                {" "}
                <Link to="/viewResultBooklet">
                  View & Print Result Master Sheet
                </Link>
              </MenuItem>
            </Menu>
          </Dropdown>
        </a>
      </li>
      <li style={{ marginTop: "20px" }}>
        <a href="#">
          <i className="bx bxs-shopping-bag-alt"></i>
          {/* <FaShoppingBag /> */}

          <Dropdown id="sidebar">
            <MenuButton
              style={{ border: "2px solid transparent", fontSize: "medium" }}
            >
              Commulative Result{" "}
              <MdKeyboardArrowDown style={{ marginLeft: "5px" }} />
            </MenuButton>
            <Menu>
              <MenuItem>
                <Link to="/create-commutative">Upload Commulative Result</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/view-commulative">View Commulative Result</Link>
              </MenuItem>
            </Menu>
          </Dropdown>
        </a>
      </li>
      <li style={{ marginTop: "20px" }}>
        <a href="#">
          <i className="bx bxs-shopping-bag-alt"></i>
          {/* <FaShoppingBag /> */}

          <Dropdown id="sidebar">
            <MenuButton
              style={{ border: "2px solid transparent", fontSize: "medium" }}
            >
              Commulative Result Master Sheet
              <MdKeyboardArrowDown style={{ marginLeft: "5px" }} />
            </MenuButton>
            <Menu>
              <MenuItem>
                <Link to="/view-commulative-booklet">
                  View & Print Commulative Result Master Sheet
                </Link>
              </MenuItem>
            </Menu>
          </Dropdown>
        </a>
      </li>
      <li style={{ marginTop: "20px" }}>
        <a href="#">
          <i className="bx bxs-shopping-bag-alt"></i>
          {/* <FaShoppingBag /> */}

          <Dropdown id="sidebar">
            <MenuButton
              style={{ border: "2px solid transparent", fontSize: "medium" }}
            >
              Director's Result Remark{" "}
              <MdKeyboardArrowDown style={{ marginLeft: "5px" }} />
            </MenuButton>
            <Menu>
              <MenuItem>
                {" "}
                <Link to="/create-result-remark">Upload Result Remark</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/view-result-remark">View Result Remarks</Link>
              </MenuItem>
            </Menu>
          </Dropdown>
        </a>
      </li>
      <li style={{ marginTop: "20px" }}>
        <a href="#">
          <i className="bx bxs-shopping-bag-alt"></i>
          {/* <FaShoppingBag /> */}

          <Dropdown id="sidebar">
            <MenuButton
              style={{ border: "2px solid transparent", fontSize: "medium" }}
            >
              Grade Marks <MdKeyboardArrowDown style={{ marginLeft: "5px" }} />
            </MenuButton>
            <Menu>
              <MenuItem>
                {" "}
                <Link to="/create-grade">Upload Result Grades</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/view-grade">View Result Grades</Link>
              </MenuItem>
            </Menu>
          </Dropdown>
        </a>
      </li>
      <li style={{ marginTop: "20px" }}>
        <a href="#">
          <i className="bx bxs-shopping-bag-alt"></i>
          {/* <FaShoppingBag /> */}

          <Dropdown id="sidebar">
            <MenuButton
              style={{ border: "2px solid transparent", fontSize: "medium" }}
            >
              C.A/Exam Grades{" "}
              <MdKeyboardArrowDown style={{ marginLeft: "5px" }} />
            </MenuButton>
            <Menu>
              {" "}
              <MenuItem>
                {" "}
                <Link to="/create-marks">Upload C/A & Exam Marks</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/view-marks">View Marks</Link>
              </MenuItem>
            </Menu>
          </Dropdown>
        </a>
      </li>
      <li style={{ marginTop: "20px" }}>
        <a href="#">
          <i className="bx bxs-shopping-bag-alt"></i>
          {/* <FaShoppingBag /> */}

          <Dropdown id="sidebar">
            <MenuButton
              style={{ border: "2px solid transparent", fontSize: "medium" }}
            >
              School Scratch Card{" "}
              <MdKeyboardArrowDown style={{ marginLeft: "5px" }} />
            </MenuButton>
            <Menu>
              <MenuItem>
                <Link to="/generate-card">Generate Scratch Card</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/disable-scratchCard">Disable Scratch Card </Link>
              </MenuItem>
            </Menu>
          </Dropdown>
        </a>
      </li>
      <ul>
        <li onClick={logout}>
          <a href="#" className="logout">
            <i className="bx bxs-log-out-circle"></i>
            <span className="text">Logout</span>
          </a>
        </li>
      </ul>
    </>
  );
};

export default AdminSideBar;
