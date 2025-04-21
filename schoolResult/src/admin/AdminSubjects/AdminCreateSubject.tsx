import React, { useState, useEffect } from "react";
import AdminLayout from "../AdminDashboard/AdminLayout";
import { schoolInfo } from "../../store/Info";
import axios from "axios";
import Table from "react-bootstrap/Table";

import Modal from "react-bootstrap/Modal";

import { FaEdit, FaLock, FaTrash } from "react-icons/fa";
import Button from "@mui/material/Button";
import { BsFillBookmarkCheckFill } from "react-icons/bs";

import { Link, useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import CircularIndeterminate from "../../components/Loading/Progress";
import CircularWithValueLabel from "../../components/Loading/LoadingCircle";
import {
  ClassApi,
  DeleteSubjectsApi,
  SubjectsApi,
  getAllSchools,
} from "../../APiData/Api";
const AdminCreateSubject = () => {
  const [schoolName, setSchoolName] = useState(schoolInfo);

  const [name, setName] = useState("");
  const [classes, setClasses] = useState("");
  const [classD, setClassD] = useState([]);
  const [schools, setSchools] = useState([]);
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
      name: name,
      classes: classes,
    };

    const headers: any = {
      "Custom-Header": "xxxx-xxxx-xxxx-xxxx",
      "Content-Type": "application/json",
      // Accept: "application/json",
      // body: JSON.stringify(data),
    };

    axios
      .post(SubjectsApi, data, headers)

      .then((res) => {
        console.log(res.data);
        setLoading(false);
        if (res.data) {
          setSchoolName("");
          setName("");
          setClasses("");
          console.log(res.data);
          toast.success("post sucessful");
          window.location.reload();
          navigate("/create-subject");
        } else {
          toast.error(res.data.error);
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Error Can't create subject");
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
  const [Numbers, setNumbers] = React.useState<any>([]);
  const [usersData, setUsersData] = React.useState<any>([]);
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
        setUsersData(
          response.data.filter(
            (item: any) =>
              item?.schoolName?._id === selectedSchool &&
              item?.classes?._id === selectedClass
          )
        );
        setNumbers(
          Array.from({ length: response.data.length }, (_, index) => index + 1)
        );

        // Set the fetched data to the state

        setLoader(false);
      });
    } catch (error) {
      setLoader(false);

      console.error("Error fetching data:", error);
    }
  };
  React.useEffect(() => {
    // Retrieve selectedYear and selectedTerm from storage
    const storedYear = localStorage.getItem("selectedSchool");
    const storedTerm = localStorage.getItem("selectedClass");

    if (storedYear) {
      setSelectedSchool(storedYear);
    }

    if (storedTerm) {
      setSelectedClass(storedTerm);
    }
  }, []);

  React.useEffect(() => {
    // Save selectedYear and selectedTerm to storage
    localStorage.setItem("selectedSchool", selectedSchool);
    localStorage.setItem("selectedClass", selectedClass);
  }, [selectedSchool, selectedClass]);
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
  const handleDelete = async (id: any) => {
    setLoading(true);
    await axios.delete(DeleteSubjectsApi + id);

    setDeleteItem(deleteItem.filter((p: any, row: any) => p._id !== row._id));
    setLoading(false);

    navigate("/view-subjects");
    window.location.reload();
  };
  return (
    <AdminLayout>
      <div className="register-main">
        <div className="container">
          <div className="title">Create Subject</div>
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
                          {classy.name.replace(/_/g, " ")}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="input-box">
                  <span className="details">Subject Name</span>
                  <input
                    type="text"
                    placeholder="Enter your other names"
                    required
                    value={name}
                    onChange={(e: any) => setName(e.target.value)}
                  />
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
          <div className="mt-16">
            <div className="user-details">
              <div className="input-box">
                {" "}
                <select
                  value={selectedSchool}
                  onChange={handleSelectSchoolChange}
                >
                  <option value="">Select School</option>
                  {schools
                    .sort((a: any, b: any) => a.name.localeCompare(b.name))
                    .map((classy: any) => (
                      <option key={classy._id} value={classy?._id}>
                        {" "}
                        {classy.name.replace(/_/g, " ")}
                      </option>
                    ))}
                </select>
              </div>
              <div className="input-box">
                <select
                  value={selectedClass}
                  onChange={handleSelectClassChange}
                >
                  <option value="">Select Class</option>

                  {classD
                    .sort((a: any, b: any) => a.name.localeCompare(b.name))
                    .map((classy: any) => (
                      <option key={classy._id} value={classy?._id}>
                        {" "}
                        {classy.name.replace(/_/g, " ")}
                      </option>
                    ))}

                  {/* Add more terms as needed */}
                </select>
              </div>
            </div>
            <>
              <button
                style={{
                  border: "1px solid red",
                  width: "150px",
                  height: "50px",
                  borderRadius: "6px",
                  marginLeft: "5px",
                }}
                onClick={fetchSubjects}
                // onClick={() => setInitialFetch(true)}
              >
                Fetch Result
              </button>
              {loader && <CircularIndeterminate />}
              {/* <Message type="success" message="Success! Result Found" />
            <Message type="error" message="Error! No Result" /> */}
            </>
          </div>
          <div
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "30px",
            }}
          >
            <Table responsive striped bordered>
              <thead
                style={{
                  backgroundColor: "#5372f0",
                  color: "white",
                  fontSize: "medium",
                  fontWeight: "500",
                }}
              >
                <tr>
                  <th>No:</th>
                  <th>School Name</th>
                  <th>Class</th>
                  <th>Subject Name</th>

                  <th>Update/Edith Subject</th>
                  <th>Delete Subject</th>
                </tr>
              </thead>
              <tbody>
                {usersData
                  ?.sort((a: any, b: any) => a.name.localeCompare(b.name))
                  .map((row: any, index: any) => (
                    <tr key={index}>
                      <td>{Numbers[index]}</td>
                      <td>{row?.schoolName?.name.replace(/_/g, " ")}</td>
                      <td>{row?.classes?.name.replace(/_/g, " ")}</td>
                      <td>{row?.name.replace(/_/g, " ")}</td>

                      <td>
                        {" "}
                        <Link to={`/update-subject/${row?._id}`}>
                          <Button className="btn-sm">
                            <FaEdit />{" "}
                          </Button>
                        </Link>{" "}
                      </td>
                      <td>
                        {" "}
                        <Button
                          className="btn-sm"
                          onClick={() => handleShowUp()}
                        >
                          <FaTrash color="red" />{" "}
                        </Button>
                      </td>
                      <Modal show={showUp} onHide={handleCloseShowUp} centered>
                        <Modal.Header closeButton>
                          <Modal.Title>Delete Class</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                          <h6 className="text-center">
                            Do you really want to delete?
                          </h6>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button onClick={handleCloseShowUp}>Close</Button>
                          {loading ? (
                            <CircularIndeterminate />
                          ) : (
                            <div className="d-flex justify-content-center">
                              <Button
                                fullWidth
                                onClick={() => handleDelete(row?._id)}
                                type="submit"
                              >
                                <FaTrash color="red" /> Delete
                              </Button>
                              <ToastContainer />
                            </div>
                          )}
                        </Modal.Footer>
                      </Modal>
                      {/* modal */}
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminCreateSubject;
