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
  DeleteClassApi,
  DeleteClassByAdminApi,
  StaffsApi,
  UserApi,
  getAllSchools,
} from "../../APiData/Api";
import { schoolInfo, userId } from "../../store/Info";

const AdminViewClasses = () => {
  const navigate = useNavigate();
  const [selectedSchool, setSelectedSchool] = React.useState<any>("");
  const [selectedClass, setSelectedClass] = React.useState<any>("");
  const [filteredresultData, setFilteredResultData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [loader, setLoader] = React.useState(false);
  const [showUp, setShowUp] = React.useState(false);
  const [message, setMessage] = React.useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [showError, setShowError] = React.useState(false);

  // State to store the API response
  const [usersData, setUsersData] = React.useState<any>([]);

  const [deleteItem, setDeleteItem] = React.useState([]);
  const handleShowUp = () => {
    setShowUp(true);
  };
  const handleCloseShowUp = () => setShowUp(false);
  // Function to handle the select input change

  useEffect(() => {
    if (schoolInfo) {
      axios
        .get(ClassApi)
        .then((response) => {
          setUsersData(
            response.data.filter(
              (item: any) => item?.schoolName._id === schoolInfo
            )
          );
        })
        .catch((error) => {
          console.error("Error fetching Schools:", error);
        });
    }
  }, [schoolInfo]);
  const [staffsData, setStaffsData] = React.useState<any>({});
  console.log(staffsData);
  useEffect(() => {
    if (schoolInfo) {
      axios
        .get(StaffsApi + userId)
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
  const handleDelete = async (id: any) => {
    setLoading(true);
    await axios.delete(`${DeleteClassByAdminApi}/${id}/${schoolInfo}`);

    setDeleteItem(deleteItem.filter((p: any, row: any) => p._id !== row._id));
    setLoading(false);
    navigate("/view-class");
    window.location.reload();
  };
  return (
    <AdminLayout>
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
              <th>School Name</th>
              <th>Class Name</th>

              <th>Update/Edith Class</th>
              <th>Delete Class</th>
            </tr>
          </thead>
          <tbody>
            {usersData
              ?.sort((a: any, b: any) => a.name.localeCompare(b.name))
              .map((row: any) => (
                <tr key={row._id}>
                  <td>{row?.schoolName?.name.replace(/_/g, " ")}</td>
                  <td>{row?.name.replace(/_/g, " ")}</td>

                  <td>
                    {" "}
                    <Link to={`/update-class/${row?._id}`}>
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
                        <div
                          className="d-flex justify-content-center"

                          // onClick={handleLoader}
                        >
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

export default AdminViewClasses;
