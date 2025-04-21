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
import { ClassApi, UserApi, getAllSchools } from "../../APiData/Api";
import { schoolInfo } from "../../store/Info";

const AdminCommutative = () => {
  const [selectedSchool, setSelectedSchool] = React.useState<any>("");
  const [selectedClass, setSelectedClass] = React.useState<any>("");
  const [filteredresultData, setFilteredResultData] = React.useState([]);
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
        const response = await fetch(UserApi);
        const data = await response.json();

        // Set the fetched data to the state
        setUsersData(
          data.filter(
            (item: any) =>
              item?.schoolName._id === selectedSchool &&
              item?.currentClass._id === selectedClass
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
                  <option key={classy._id} value={classy._id}>
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
                  <option key={classy._id} value={classy._id}>
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
              <th>First Name</th>
              <th>Last Name</th>
              <th>School Name</th>
              <th>Class</th>
              <th>School Reg No</th>

              <th>Input Student Commulative Result</th>
            </tr>
          </thead>
          <tbody>
            {usersData
              ?.sort((a: any, b: any) => a.firstName.localeCompare(b.firstName))
              .map((row: any) => (
                <tr key={row._id}>
                  <td style={{ width: "20px", height: "70px" }}>
                    <img
                      src={row?.passportPhoto}
                      alt="img"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />{" "}
                  </td>
                  <td>{row?.firstName}</td>
                  <td>{row?.lastName}</td>
                  <td>{row?.schoolName?.name.replace(/_/g, " ")}</td>
                  <td>{row?.currentClass?.name.replace(/_/g, " ")}</td>
                  <td>{row?.schoolRegNumber}</td>

                  <td>
                    {" "}
                    <Link
                      to={`/student-Commutative-result-create/${row?._id}/${selectedClass}/${selectedSchool}`}
                    >
                      <Button className="btn-sm">
                        <BsFillBookmarkCheckFill />{" "}
                      </Button>
                    </Link>{" "}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </AdminLayout>
  );
};

export default AdminCommutative;
