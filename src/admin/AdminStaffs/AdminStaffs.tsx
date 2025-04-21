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
import { ClassApi, StaffsApi, UserApi, getAllSchools } from "../../APiData/Api";
import { schoolInfo } from "../../store/Info";

const AdminViewStaffs = () => {
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

  // Function to handle the select input change

  useEffect(() => {
    if (schoolInfo) {
      axios
        .get(StaffsApi)
        .then((response) => {
          setUsersData(
            response.data.filter(
              (item: any) =>
                item?.schoolName._id === schoolInfo &&
                item?.userType === "staff"
            )
          );
        })
        .catch((error) => {
          console.error("Error fetching Schools:", error);
        });
    }
  }, [schoolInfo]);
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
              <th>Image</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>School Name</th>
              <th>User Category</th>
              <th>User Role</th>

              <th>Phone Number</th>
              <th>Contact Address</th>

              <th>Update Staff Role</th>
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
                  <td>{row?.userType}</td>
                  <td>
                    {row?.roles?.map((item: any) => (
                      <>{item} </>
                    ))}{" "}
                  </td>
                  <td>{row?.phoneNumber}</td>
                  <td>{row?.contactAdress}</td>

                  <td>
                    {" "}
                    <Link to={`/update-user-role-by-admin/${row?._id}`}>
                      <Button className="btn-sm">
                        <FaEdit />{" "}
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

export default AdminViewStaffs;
