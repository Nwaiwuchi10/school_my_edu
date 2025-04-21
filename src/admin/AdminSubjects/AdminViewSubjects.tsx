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

import { Link, useNavigate } from "react-router-dom";
import CircularIndeterminate from "../../components/Loading/Progress";
import {
  ClassApi,
  DeleteSubjectsApi,
  StaffsApi,
  SubjectsApi,
  UserApi,
  getAllSchools,
} from "../../APiData/Api";
import { schoolInfo } from "../../store/Info";

const AdminViewSubjects = () => {
  const navigate = useNavigate();
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
  const [showUp, setShowUp] = React.useState(false);
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
  const [deleteItem, setDeleteItem] = React.useState([]);
  const [Numbers, setNumbers] = React.useState<any>([]);
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
  const [staffsData, setStaffsData] = React.useState<any>([]);
  console.log(staffsData);
  useEffect(() => {
    if (schoolInfo) {
      axios
        .get(StaffsApi)
        .then((response) => {
          setStaffsData(
            response.data.filter(
              (item: any) => item?.schoolName._id === schoolInfo
            )
          );
        })
        .catch((error) => {
          console.error("Error fetching Staffs:", error);
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
                  <option key={classy._id} value={classy?._id}>
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
                    <Button className="btn-sm" onClick={() => handleShowUp()}>
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
    </AdminLayout>
  );
};

export default AdminViewSubjects;
