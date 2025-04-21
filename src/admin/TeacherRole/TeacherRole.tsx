import React, { useState, useEffect } from "react";
import AdminLayout from "../AdminDashboard/AdminLayout";
import { schoolInfo } from "../../store/Info";
import axios from "axios";
import Table from "react-bootstrap/Table";

import Modal from "react-bootstrap/Modal";

import { FaEdit, FaLock, FaTrash } from "react-icons/fa";
import Button from "@mui/material/Button";
import { BsFillBookmarkCheckFill } from "react-icons/bs";

import { Link, useNavigate, useParams } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import CircularIndeterminate from "../../components/Loading/Progress";
import CircularWithValueLabel from "../../components/Loading/LoadingCircle";
import {
  ClassApi,
  SubjectsApi,
  TeacherRoleApi,
  getAllSchools,
} from "../../APiData/Api";
const TeacherRole = () => {
  const { id } = useParams();
  const [schoolName, setSchoolName] = useState(schoolInfo);

  const [roleName, setRoleName] = useState("");

  const [classes, setClasses] = useState("");
  const [user, setUser] = useState(id);
  const [classD, setClassD] = useState([]);
  const [schools, setSchools] = useState([]);
  const [selectedField, setSelectedField] = useState("");
  const [loading, setLoading] = useState(false);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleLoader = () => {
    setLoading(true);

    // Perform any other actions that need to be done when the button is clicked
  };

  //////

  /////
  const submitHandler = (e: any) => {
    e.preventDefault();
    setLoading(true);
    const data: any = {
      schoolName: schoolName,
      roleName: roleName,
      classes: classes,
      user: user,
    };

    const headers: any = {
      "Custom-Header": "xxxx-xxxx-xxxx-xxxx",
      "Content-Type": "application/json",
      // Accept: "application/json",
      // body: JSON.stringify(data),
    };

    axios
      .post(TeacherRoleApi, data, headers)

      .then((res) => {
        console.log(res.data);
        setLoading(false);
        if (res.data) {
          setSchoolName("");
          setRoleName("");
          setUser("");
          setClasses("");
          console.log(res.data);
          toast.success("post sucessful");

          navigate("/admin");
        } else {
          toast.error(res.data.error);
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Error Can't create Role");
      });
  };
  useEffect(() => {
    if (schoolInfo) {
      axios
        .get(getAllSchools)
        .then((response) => {
          setSchools(
            response.data.filter((item: any) => item._id === schoolInfo)
          );
        })
        .catch((error) => {
          console.error("Error fetching Schools:", error);
        });
    }
    fetchSubjects();
  }, [schoolInfo]);
  useEffect(() => {
    // Fetch classes when selectedSchoolId changes
    if (schoolInfo) {
      axios
        .get(ClassApi)
        .then((response) => {
          setClassD(
            response.data.filter(
              (item: any) => item.schoolName._id === schoolInfo
            )
          );
        })
        .catch((error) => {
          console.error("Error fetching classes:", error);
        });
    }
    fetchSubjects();
  }, [schoolInfo]);
  const navigate = useNavigate();
  const [selectedSchool, setSelectedSchool] = React.useState<any>("");
  const [selectedClass, setSelectedClass] = React.useState<any>("");
  const [filteredresultData, setFilteredResultData] = React.useState([]);
  // const [loading, setLoading] = React.useState(false);
  const [loader, setLoader] = React.useState(false);
  const [message, setMessage] = React.useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [showError, setShowError] = React.useState(false);
  const [showUp, setShowUp] = React.useState(false);
  // State to store the API response
  const [subjectData, setSubjectData] = React.useState<any>([]);
  // const [classD, setClassD] = useState([]);
  // const [schools, setSchools] = useState([]);
  // Function to handle the select input change
  const handleSelectSchoolChange = (e: any) => {
    setSelectedSchool(e.target.value);
  };
  const handleSelectClassChange = (e: any) => {
    setSelectedClass(e.target.value);
  };

  const [initialFetch, setInitialFetch] = React.useState(true);
  const [deleteItem, setDeleteItem] = React.useState([]);
  const handleShowUp = () => {
    setShowUp(true);
  };
  const handleCloseShowUp = () => setShowUp(false);
  // Fetch data from API
  const fetchSubjects = () => {
    setLoader(true);
    try {
      // Fetch data from your API

      axios.get(SubjectsApi).then((response) => {
        // Set the fetched data to the state
        setSubjectData(
          response.data.filter(
            (item: any) =>
              item?.schoolName?._id === schoolInfo &&
              item?.classes?._id === classes
          )
        );

        // Set the fetched data to the state

        setLoader(false);
      });
    } catch (error) {
      setLoader(false);

      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (schoolInfo) {
      axios
        .get(getAllSchools)
        .then((response) => {
          setSchools(
            response.data.filter((item: any) => item?._id === schoolInfo)
          );
        })
        .catch((error) => {
          console.error("Error fetching Schools:", error);
        });
    }
  }, [schoolInfo]);
  useEffect(() => {
    // Fetch classes when selectedSchoolId changes
    if (schoolInfo) {
      axios
        .get(ClassApi)
        .then((response) => {
          setClassD(
            response.data.filter(
              (item: any) => item.schoolName?._id === schoolInfo
            )
          );
        })
        .catch((error) => {
          console.error("Error fetching classes:", error);
        });
    }
  }, [schoolInfo]);

  return (
    <AdminLayout>
      <div className="register-main">
        <div className="container">
          <div className="title">Create Staff / Teacher Roles</div>
          <div className="content">
            <form action="#" onSubmit={submitHandler}>
              <div className="user-details">
                <div className="input-box">
                  <span className="details">School Name</span>
                  <select required>
                    {schools
                      .sort((a: any, b: any) => a.name.localeCompare(b.name))
                      .map((classy: any) => (
                        <option key={classy._id}>
                          {" "}
                          {classy.name.replace(/_/g, " ")}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="input-box">
                  <span className="details">Class</span>
                  <select
                    required
                    onChange={(e: any) => setClasses(e.target.value)}
                    value={classes}
                  >
                    <option>Select Class</option>
                    {classD
                      .sort((a: any, b: any) => a.name.localeCompare(b.name))
                      .map((classy: any) => (
                        <option key={classy._id} value={classy._id}>
                          {" "}
                          {classy?.name.replace(/_/g, " ")}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="input-box">
                  <span className="details">Role Name</span>
                  <select
                    required
                    onChange={(e: any) => setRoleName(e.target.value)}
                    value={roleName}
                  >
                    <option>Select Roles</option>
                    {subjectData
                      ?.sort((a: any, b: any) => a.name.localeCompare(b.name))
                      .map((classy: any) => (
                        <option key={classy._id} value={classy.name}>
                          {" "}
                          {classy.name.replace(/_/g, " ")}
                        </option>
                      ))}
                    <option value="Class Teacher"> Class Teacher</option>
                  </select>
                </div>
              </div>

              {loading ? (
                <CircularWithValueLabel />
              ) : (
                <div>
                  <input type="submit" value="Post" />
                  <ToastContainer />
                </div>
              )}
            </form>
            {/* <div className="sign-txt">
            Not yet member? <a href="#">Signup now</a>
          </div> */}
          </div>
          {/* to dsiplay uploaded subject */}
        </div>
      </div>
    </AdminLayout>
  );
};

export default TeacherRole;
