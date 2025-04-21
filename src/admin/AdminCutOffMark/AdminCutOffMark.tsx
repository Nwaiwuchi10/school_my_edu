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
  CutOffMarkApi,
  UserApi,
  getAllSchools,
} from "../../APiData/Api";
import { schoolInfo } from "../../store/Info";

const AdminCutOffMark = () => {
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
        .get(CutOffMarkApi)
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
              <th>Name</th>
              <th>CutOffMark</th>

              <th>Update/Edith Marks </th>
              <th>Delete Marks </th>
            </tr>
          </thead>
          <tbody>
            {usersData
              ?.sort((a: any, b: any) => a.name.localeCompare(b.name))
              .map((row: any) => (
                <tr key={row._id}>
                  <td>{row?.schoolName?.name.replace(/_/g, " ")}</td>
                  <td>{row?.name}</td>
                  <td>{row?.cutOffMark}</td>

                  <td>
                    {" "}
                    {/* <Link to={`/update-ranks/${row?._id}`}> */}
                    <Button className="btn-sm">
                      <FaEdit />{" "}
                    </Button>
                    {/* </Link>{" "} */}
                  </td>
                  <td>
                    {" "}
                    {/* <Link to={`/delete-ranks/${row?._id}`}> */}
                    <Button className="btn-sm">
                      <FaTrash color="red" />{" "}
                    </Button>
                    {/* </Link>{" "} */}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </AdminLayout>
  );
};

export default AdminCutOffMark;
