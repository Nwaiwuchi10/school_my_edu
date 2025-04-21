import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "react-bootstrap/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

import { FaCheckSquare, FaEdit, FaTrash } from "react-icons/fa";
import Button from "@mui/material/Button";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import { Link } from "react-router-dom";

import { Container } from "react-bootstrap";
import { schoolInfo } from "../../store/Info";
import CircularIndeterminate from "../../components/Loading/Progress";
import AdminLayout from "../AdminDashboard/AdminLayout";
import { ScratchCardApi } from "../../APiData/Api";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
export default function AdminScratchCard() {
  const [ViewScratchCards, setViewScratchCards] = React.useState([]);
  const [Numbers, setNumbers] = React.useState<any>([]);
  const [serialNumber, setSerialNumber] = React.useState("");
  const [pin, setPin] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await axios.get(ScratchCardApi);
      console.log(data);
      // const foundData = data.find((item) => item.artist === artist);
      setViewScratchCards(
        data.filter((item: any) => item?.schoolName._id === schoolInfo)
      );
      setNumbers(Array.from({ length: data.length }, (_, index) => index + 1));
    };

    fetchPosts();
  }, []);
  const handleLoader = () => {
    setLoading(true);

    // Perform any other actions that need to be done when the button is clicked
  };
  const submitHandler = (e: any) => {
    e.preventDefault();
    setLoading(true);
    const data: any = {
      schoolName: schoolInfo,
      pin: pin,
      serialNumber: serialNumber,
    };

    const headers: any = {
      "Custom-Header": "xxxx-xxxx-xxxx-xxxx",
      "Content-Type": "application/json",
      // Accept: "application/json",
      // body: JSON.stringify(data),
    };

    axios
      .post(ScratchCardApi, data, headers)

      .then((res) => {
        console.log(res.data);
        setLoading(false);
        if (res.data) {
          //   setUser("");

          setPin(" ");
          setSerialNumber(" ");

          console.log(res.data);
          toast.success("post sucessful");
          // navigate("/pre-nurseryResult");
          // handleClose();
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
      <Container>
        <div
          style={{ marginLeft: "auto", marginRight: "auto", marginTop: "50px" }}
        >
          <form onSubmit={submitHandler}>
            {loading ? (
              <CircularIndeterminate />
            ) : (
              <Button
                className="btn-sm"
                onSubmit={handleLoader}
                type="submit"
                style={{ border: "1px solid #3c91e6", marginBottom: "20px" }}
              >
                Click To Generate Scratch Card
              </Button>
            )}
          </form>
          <Table responsive striped bordered>
            <thead
              style={{
                backgroundColor: "#3c91e6",
                color: "white",
                fontSize: "medium",
                fontWeight: "500",
              }}
            >
              <tr>
                <th>No:</th>
                <th>School Name </th>
                <th>Serial Number</th>
                <th>Pin</th>
                <th>Usage</th>
              </tr>
            </thead>
            <tbody>
              {ViewScratchCards?.map((row: any, index) => (
                <tr key={index}>
                  <td>{Numbers[index]}</td>
                  <td>{row?.schoolName.name.replace(/_/g, " ")} </td>

                  <td>{row?.serialNumber}</td>
                  <td>{row?.pin}</td>
                  <td>{row?.usageCount}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </AdminLayout>
  );
}
