import React, { useEffect, useRef, useState } from "react";
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
  CommulativeApi,
  ResultApi,
  ResultDeactivateEditApi,
  ResultPositionApi,
  SubjectMarksApi,
  SubjectsApi,
  UserApi,
  getAllSchools,
} from "../../APiData/Api";
import { schoolInfo } from "../../store/Info";
import { useReactToPrint } from "react-to-print";

const AdminCommulativeBucklet = () => {
  const [selectedSchool, setSelectedSchool] = React.useState<any>("");
  const [selectedClass, setSelectedClass] = React.useState<any>("");
  const [selectedYear, setSelectedYear] = React.useState<any>("");
  const [selectedTerm, setSelectedTerm] = React.useState<any>("");

  const [filteredresultData, setFilteredResultData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [loader, setLoader] = React.useState(false);
  const [message, setMessage] = React.useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [showError, setShowError] = React.useState(false);
  const [Numbers, setNumbers] = React.useState<any>([]);

  // State to store the API response
  const [usersData, setUsersData] = React.useState<any>([]);
  console.log(usersData);
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
        const response = await fetch(CommulativeApi);
        const data = await response.json();

        // Set the fetched data to the state
        setUsersData(
          data
            .sort((a: any, b: any) => b.TotalAverage - a.TotalAverage)
            .filter(
              (item: any) =>
                item?.schoolName === selectedSchool &&
                item?.classes === selectedClass &&
                item?.year === selectedYear &&
                item?.term === selectedTerm
            )
        );
        setNumbers(
          Array.from({ length: data.length }, (_, index) => index + 1)
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
  const [show, setShow] = React.useState(false);

  const [Position, setPosition] = React.useState("");

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

  /////to lock result edit
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
      schoolName: usersData?.schoolName,
      term: term,
      classes: usersData?.classes,
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
      .put(ResultDeactivateEditApi, data, headers)

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
  const handleOverallPosition = (e: any) => {
    e.preventDefault();
    setLoading(true);
    const data: any = {
      schoolName: usersData?.map((item: any) => item?.schoolName),
      term: usersData?.map((item: any) => item?.term),
      classes: usersData?.map((item: any) => item?.classes),
      year: usersData?.map((item: any) => item?.year),
    };

    const headers: any = {
      "Custom-Header": "xxxx-xxxx-xxxx-xxxx",
      "Content-Type": "application/json",
      // Accept: "application/json",
      // body: JSON.stringify(data),
    };

    axios
      .post(ResultPositionApi, data, headers)

      .then((res) => {
        console.log(res.data);
        setLoading(false);
        if (res.data) {
          //   setUser("");

          // setDeActivateResultEdith(true);
          // setYear("");
          // setTerm("");
          // setClasses("");
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
  const componentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
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
                  <option key={classy._id} value={classy.name}>
                    {" "}
                    {classy.name.replace(/_/g, " ")}
                  </option>
                ))}
            </select>
          </div>
          <div className="input-box">
            <select value={selectedClass} onChange={handleSelectClassChange}>
              <option value="">Select Class</option>

              {classD
                .sort((a: any, b: any) => a.name.localeCompare(b.name))
                .map((classy: any) => (
                  <option key={classy._id} value={classy.name}>
                    {" "}
                    {classy.name.replace(/_/g, " ")}
                  </option>
                ))}

              {/* Add more terms as needed */}
            </select>
          </div>
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
        ref={componentRef}
      >
        <div className="display-content-head-result">
          {usersData?.map((viewResult: any) => (
            <>
              <div>
                <h3
                  className="our-title-h3"
                  style={{ textTransform: "uppercase" }}
                >
                  {viewResult?.schoolName?.replace(/_/g, " ")}
                </h3>
                <div className="adress-text">
                  <div className="text-center">
                    {viewResult?.school?.address}{" "}
                  </div>
                  <div>
                    <span>{viewResult?.school?.state} </span>{" "}
                    <span>{viewResult?.school?.country} </span>
                  </div>
                </div>
                <div className="sheet-div mb-5">
                  <div style={{ textTransform: "uppercase" }}>
                    {viewResult?.classes?.replace(/_/g, " ")}{" "}
                    <span style={{ marginRight: "5px" }}>
                      {viewResult?.term.replace(/_/g, " ")}
                    </span>{" "}
                    SCHOOL TERMINAL RESULT SHEET
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
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
              {/* <th>Image</th> */}
              <th>First Name</th>
              <th>Last Name</th>
              <th>Class</th>
              <th>School Reg No</th>
              <th>School Name</th>
              {usersData?.map((items: any) => (
                <>
                  {items?.subjects
                    ?.sort((a: any, b: any) =>
                      a.subjectName.localeCompare(b.subjectName)
                    )
                    .map((list: any) => (
                      <>
                        <th>
                          <span className="flex justify-center align-center mb-2 text-center">
                            {list?.subjectName?.replace(/_/g, " ")}
                          </span>

                          <div
                            style={{
                              display: "flex",
                              gap: "10px",
                              color: "whitesmoke",
                            }}
                          >
                            <th>1st Term Total </th>
                            <th>2nd Term Total</th>
                            <th>3rd Term Total</th>
                            <th>TotalScore</th>
                            <th>TotalAverage</th>
                            <th>Grade</th>
                            <th>Remark</th>
                          </div>
                        </th>
                      </>
                    ))}
                </>
              ))}
              <th>Term</th>
              <th>Academic Year</th>
              <th>Total Score</th>
              <th>Total Average</th>
              <th>Total Grade</th>
              <th>Position</th>
              <th>Number In Class</th>
              <th>Form Teacher Remark</th>
              <th>Head Teacher</th>
            </tr>
          </thead>
          <tbody>
            {usersData
              ?.sort((a: any, b: any) =>
                a.user.firstName.localeCompare(b.user.firstName)
              )
              .map((row: any, index: any) => (
                <tr key={index}>
                  <td>{Numbers[index]}</td>
                  {/* <td style={{ width: "20px", height: "70px" }}>
                    <img
                      src={row?.user?.passportPhoto}
                      alt="img"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />{" "}
                  </td> */}
                  <td>{row?.user?.firstName}</td>
                  <td>{row?.user?.lastName}</td>
                  <td>{row?.classes?.replace(/_/g, " ")} </td>
                  <td>{row?.schoolRegNumber} </td>
                  <td>{row?.schoolName.replace(/_/g, " ")} </td>
                  {usersData?.map((items: any) => (
                    <>
                      {items?.subjects?.map((list: any) => (
                        <>
                          <td>
                            <div
                              style={{
                                display: "flex",
                                gap: "62px",
                              }}
                            >
                              <td>{list?.total1stTermScore}</td>
                              <td>{list?.total2ndTermScore}</td>
                              <td>{list?.total3rdTermScore}</td>
                              <td>{list?.totalScore}</td>
                              <td>
                                {!isNaN(Number(list?.totalAverage))
                                  ? Number.isInteger(Number(list?.totalAverage))
                                    ? Number(list?.totalAverage)
                                    : Number(list?.totalAverage).toFixed(1)
                                  : "N/A"}
                              </td>

                              {/* <td>{list?.totalAverage}</td> */}
                              <td> {list?.grade}</td>
                              <td>{list?.remark?.replace(/_/g, " ")}</td>
                            </div>
                          </td>
                        </>
                      ))}
                    </>
                  ))}
                  <td>{row?.term.replace(/_/g, " ")}</td>
                  <td>{row?.year}</td>
                  <td>{row?.TotalScore}</td>
                  <td>{row?.TotalAverage}</td>
                  <td>{row?.TotalGrade}</td>
                  <td>{row?.Position}</td>

                  <td>{row?.numberInClass} </td>
                  <td>{row?.Remark}</td>
                  <td>{row?.HmRemark?.replace(/_/g, " ")}</td>
                </tr>
              ))}
          </tbody>
        </Table>
        <div className="stamp-div mt-5">
          {usersData?.map((viewResult: any) => (
            <>
              <img
                src={viewResult?.school?.schoolStamp}
                alt="stamp"
                className="stamp-img"
              />
            </>
          ))}
        </div>
      </div>
      <Button variant="contained" onClick={handlePrint}>
        Print Result!
      </Button>
    </AdminLayout>
  );
};

export default AdminCommulativeBucklet;
