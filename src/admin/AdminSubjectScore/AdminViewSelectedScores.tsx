import React, { useEffect, useState } from "react";
import AdminLayout from "../AdminDashboard/AdminLayout";
import { styled } from "@mui/material/styles";
import Table from "react-bootstrap/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TextField } from "@mui/material";
import axios from "axios";
import Modal from "react-bootstrap/Modal";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { FaEdit, FaLock, FaTrash } from "react-icons/fa";
import Button from "@mui/material/Button";
import { BsFillBookmarkCheckFill } from "react-icons/bs";

import { Link } from "react-router-dom";
import CircularIndeterminate from "../../components/Loading/Progress";
import {
  ClassApi,
  DeactivateSubjectMarksEdithApi,
  SubjectMarksApi,
  SubjectsApi,
  UserApi,
  getAllSchools,
} from "../../APiData/Api";
import { schoolInfo } from "../../store/Info";

const AdminViewSelectedScores = () => {
  const [selectedSchool, setSelectedSchool] = React.useState<any>("");
  const [selectedClass, setSelectedClass] = React.useState<any>("");
  const [selectedYear, setSelectedYear] = React.useState<any>("");
  const [selectedTerm, setSelectedTerm] = React.useState<any>("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [filteredresultData, setFilteredResultData] = React.useState([]);
  const [subjectlist, setSubjectlist] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const [loader, setLoader] = React.useState(false);
  const [message, setMessage] = React.useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [showError, setShowError] = React.useState(false);

  // State to store the API response
  const [usersData, setUsersData] = React.useState<any>([]);
  const [classD, setClassD] = useState([]);
  const [schools, setSchools] = useState([]);
  // Function to handle the select input change
  const handleSelectSchoolChange = (e: any) => {
    setSelectedSchool(e.target.value);
  };
  const handleSelectClassChange = (e: any) => {
    setSelectedClass(e.target.value);
  };

  const [initialFetch, setInitialFetch] = React.useState(true);

  // Fetch data from API
  React.useEffect(() => {
    setLoader(true);
    setShowSuccess(true);
    setShowError(true);
    try {
      const fetchData = async () => {
        // Fetch data from your API
        const response = await fetch(SubjectMarksApi);
        const data = await response.json();

        // Set the fetched data to the state
        setUsersData(
          data.filter(
            (item: any) =>
              item?.schoolName._id === selectedSchool &&
              item?.classes._id === selectedClass &&
              item?.subjects?.map((items: any) => items?._id) &&
              item?.year === selectedYear &&
              item?.term === selectedTerm
          )
        );

        // Set the fetched data to the state

        setLoader(false);
        setTimeout(() => {
          setShowSuccess(false);
        }, 50);

        // After the initial fetch, setInitialFetch to false
        setInitialFetch(false);
      };

      // Fetch data only if it's the initial fetch or when the year and term are selected
      if (initialFetch || (selectedSchool && selectedClass)) {
        fetchData();
      }
    } catch (error) {
      setLoader(false);
      // navigate("/Basic2-result");
      setTimeout(() => {
        setShowError(false);
      }, 50);

      console.error("Error fetching data:", error);
    }
  }, [initialFetch]);
  React.useEffect(() => {
    // Retrieve selectedYear and selectedTerm from storage
    const storedSchool = localStorage.getItem("selectedSchool");
    const storedClass = localStorage.getItem("selectedClass");
    const storedYear = localStorage.getItem("selectedYear");
    const storedTerm = localStorage.getItem("selectedTerm");
    if (storedSchool) {
      setSelectedSchool(storedSchool);
    }

    if (storedClass) {
      setSelectedClass(storedClass);
    }
    if (storedYear) {
      setSelectedYear(storedYear);
    }
    if (storedTerm) {
      setSelectedTerm(storedTerm);
    }
  }, []);

  React.useEffect(() => {
    // Save selectedYear and selectedTerm to storage
    localStorage.setItem("selectedSchool", selectedSchool);
    localStorage.setItem("selectedClass", selectedClass);
    localStorage.setItem("selectedYear", selectedYear);
    localStorage.setItem("selectedTerm", selectedTerm);
  }, [selectedSchool, selectedClass, selectedYear, selectedTerm]);

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
  const fetchSubjects = async () => {
    try {
      const { data } = await axios.get(SubjectsApi);
      console.log(data);

      setSubjectlist(
        data.filter(
          (item: any) =>
            item?.schoolName?._id === selectedSchool &&
            item?.classes?._id === selectedClass
        )
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  React.useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await axios.get(SubjectsApi);
      console.log(data);

      setSubjectlist(
        data.filter(
          (item: any) =>
            item?.schoolName?._id === selectedSchool &&
            item?.classes?._id === selectedClass
        )
      );
    };

    fetchPosts();
  }, []);
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const [userId, setUseId] = React.useState(null);

  const handleShow = (_id: any) => {
    setShow(true);
    setUseId(_id);
  };
  const handleLoader = () => {
    setLoading(true);

    // Perform any other actions that need to be done when the button is clicked
  };
  const [showUp, setShowUp] = React.useState(false);
  const [deActivateResultEdith, setDeActivateResultEdith] =
    React.useState(true);
  const [term, setTerm] = React.useState("");
  const [year, setYear] = React.useState("");

  const [classes, setClasses] = React.useState("");
  const handleShowUp = () => {
    setShowUp(true);
  };
  const handleCloseShowUp = () => setShowUp(false);
  const lockResultHandler = (e: any) => {
    e.preventDefault();
    setLoading(true);
    const data: any = {
      schoolName: usersData?.schoolName?._id,
      term: term,
      classes: usersData?.classes?._id,
      year: year,
      deActivateResultEdith: deActivateResultEdith,
    };

    const headers: any = {
      "Custom-Header": "xxxx-xxxx-xxxx-xxxx",
      "Content-Type": "application/json",
      // Accept: "application/json",
      // body: JSON.stringify(data),
    };

    axios
      .put(DeactivateSubjectMarksEdithApi, data, headers)

      .then((res) => {
        console.log(res.data);
        setLoading(false);
        if (res.data) {
          //   setUser("");

          setDeActivateResultEdith(true);
          setYear("");
          setTerm("");
          setClasses("");
          console.log(res.data);
          toast.success("post sucessful");
          // navigate("/pre-nurseryResult");
          handleClose();
          window.location.reload();
        } else {
          toast.error(res.data.error);
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error(
          "Failed to create a post, check your network connection or input the correct textfields"
        );
      });
  };
  return (
    <AdminLayout>
      <div>
        <div className="user-details">
          <div className="input-box">
            {" "}
            <select value={selectedSchool} onChange={handleSelectSchoolChange}>
              <option value="">Select School</option>
              {schools
                .sort((a: any, b: any) => a.name.localeCompare(b.name))
                .map((classy: any) => (
                  <option key={classy._id} value={classy?._id}>
                    {" "}
                    {classy?.name.replace(/_/g, " ")}
                  </option>
                ))}
            </select>
          </div>
          <div className="input-box">
            <select
              value={selectedClass}
              onChange={handleSelectClassChange}
              onClick={fetchSubjects}
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
          {/* {selectedSchool && selectedClass ? (
            <div className="input-box">
              <select
                value={selectedSubject}
                onChange={(e: any) => setSelectedSubject(e.target.value)}
              >
                <option value="">Select Subject</option>
                {subjectlist
                  ?.sort((a: any, b: any) => a.name.localeCompare(b.name))
                  .map((item: any) => (
                    <option value={item?.name} key={item?._id}>
                      {item?.name.replace(/_/g, " ")}
                    </option>
                  ))}
              </select>
            </div>
          ) : (
            <></>
          )} */}

          <div className="input-box">
            <select
              value={selectedTerm}
              onChange={(e: any) => setSelectedTerm(e.target.value)}
            >
              <option value="">Term</option>

              <option value="1st_Term"> 1st Term</option>
              <option value="2nd_Term"> 2nd Term</option>
              <option value="3rd_Term"> 3rd Term</option>

              {/* Add more terms as needed */}
            </select>
          </div>
          <div className="input-box">
            <select
              value={selectedYear}
              onChange={(e: any) => setSelectedYear(e.target.value)}
            >
              <option value="">Academic Year</option>

              <option value="2023/2024"> 2023/2024</option>
              <option value="2024/2025"> 2024/2025</option>
              <option value="2025/2026"> 2025/2026</option>
              <option value="2026/2027"> 2026/2027</option>
              <option value="2027/2028"> 2027/2028</option>
              <option value="2028/2029"> 2028/2029</option>
              <option value="2029/2030"> 2029/2030</option>
              <option value="2030/2031"> 2030/2031</option>

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
            onClick={() => setInitialFetch(true)}
          >
            Fetch Result
          </button>
          {loader && <CircularIndeterminate />}
          {/* <Message type="success" message="Success! Result Found" />
            <Message type="error" message="Error! No Result" /> */}
        </>
      </div>
      <div
        style={{ marginLeft: "auto", marginRight: "auto", marginTop: "30px" }}
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
              <th>Image</th>
              <th>Student Name</th>
              <th>Subject Name </th>
              <th>Test </th>
              <th>Exam </th>
              <th>Total Score </th>
              <th>Grade </th>
              <th>Remark </th>

              <th>Year </th>
              <th>Term </th>
              <th>School Name</th>
              <th>Class</th>
              <th>Update/Edith Subject Score</th>

              <th>Lock Edit Subject Scores</th>
            </tr>
          </thead>
          <tbody>
            {usersData
              ?.sort((a: any, b: any) =>
                a.user.firstName.localeCompare(b.user.firstName)
              )
              .map((row: any) => (
                <tr key={row._id}>
                  <td style={{ width: "20px", height: "70px" }}>
                    <img
                      src={row?.user?.passportPhoto}
                      alt="img"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />{" "}
                  </td>
                  <td>
                    <span>{row?.user.firstName}</span>
                    <span>{row?.user.lasttName}</span>
                  </td>
                  <td>
                    {row?.subjects?.map((item: any) => (
                      <>{item?.subjectName} </>
                    ))}{" "}
                  </td>
                  <td>
                    {row?.subjects?.map((item: any) => (
                      <div>{item?.test} </div>
                    ))}{" "}
                  </td>
                  <td>
                    {row?.subjects?.map((item: any) => (
                      <div>{item?.exam} </div>
                    ))}{" "}
                  </td>
                  <td>
                    {row?.subjects?.map((item: any) => (
                      <>{item?.totalScore} </>
                    ))}{" "}
                  </td>
                  <td>
                    {row?.subjects?.map((item: any) => (
                      <div>{item?.grade} </div>
                    ))}{" "}
                  </td>
                  <td>
                    {row?.subjects?.map((item: any) => (
                      <>{item?.remark} </>
                    ))}{" "}
                  </td>
                  <td>{row?.year}</td>
                  <td>{row?.term}</td>
                  <td>{row?.schoolName?.name}</td>
                  <td>{row?.classes?.name}</td>
                  <td
                    style={{
                      textAlign: "center",
                      color: "red",
                      fontSize: "small",
                    }}
                  >
                    {row?.deActivateResultEdith === true ? (
                      <> Result Editing is locked by admin</>
                    ) : (
                      <>
                        <Link to={`/update-subject-scores/${row?._id}`}>
                          <Button className="btn-sm">
                            <FaEdit />{" "}
                          </Button>
                        </Link>{" "}
                      </>
                    )}
                  </td>
                  <td>
                    <Button className="btn-sm" onClick={() => handleShowUp()}>
                      <FaLock />
                    </Button>
                  </td>
                  <Modal show={showUp} onHide={handleCloseShowUp} centered>
                    <Modal.Header closeButton>
                      <Modal.Title>Lock Editing of result</Modal.Title>
                    </Modal.Header>
                    <form onSubmit={lockResultHandler}>
                      <Modal.Body>
                        <select
                          value={year}
                          onChange={(e) => setYear(e.target.value)}
                        >
                          <option value="">Academic Year</option>
                          <option value="2023/2024"> 2023/2024</option>
                          <option value="2024/2025"> 2024/2025</option>
                          <option value="2025/2026"> 2025/2026</option>
                          <option value="2026/2027"> 2026/2027</option>
                          <option value="2027/2028"> 2027/2028</option>
                          <option value="2028/2029"> 2028/2029</option>
                          <option value="2029/2030"> 2029/2030</option>
                          <option value="2030/2031"> 2030/2031</option>
                          {/* Add more years as needed */}
                        </select>
                        <select
                          value={term}
                          onChange={(e) => setTerm(e.target.value)}
                        >
                          <option value="">Select Result Term</option>
                          <option value="1st-Term">1st Term</option>
                          <option value="2nd-Term">2nd Term</option>
                          <option value="3rd-Term">3rd Term</option>

                          {/* Add more terms as needed */}
                        </select>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button onClick={handleCloseShowUp}>Close</Button>
                        {loading ? (
                          <CircularIndeterminate />
                        ) : (
                          <div
                            className="d-flex justify-content-center"

                            // onClick={handleLoader}
                          >
                            <Button
                              fullWidth
                              onSubmit={handleLoader}
                              type="submit"
                            >
                              Lock Result
                            </Button>
                            <ToastContainer />
                          </div>
                        )}
                      </Modal.Footer>
                    </form>
                  </Modal>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </AdminLayout>
  );
};

export default AdminViewSelectedScores;
