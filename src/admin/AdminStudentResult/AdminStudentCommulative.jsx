import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Container } from "@material-ui/core";

import Table from "react-bootstrap/Table";
import AdminLayout from "../AdminDashboard/AdminLayout";
import { schoolInfo } from "../../store/Info";
import stamp from "../../assets/images/stamp.png";
import { CommulativeApi, CutOffMarkApi, GradeApi } from "../../APiData/Api";
import "./StudentResult.css";
const AdminStudentCommulative = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [viewResult, setViewResult] = useState({});
  const [grades, setGrades] = useState([]);
  const [ranks, setRanks] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get(CommulativeApi + id);
        console.log(data);
        // const foundData = data.find((item) => item.artist === artist);
        setViewResult(data);
      } catch (error) {
        // Handle the error here
        // navigate("/Result-check");
        console.error("Result not Found:", error);
      }
    };

    fetchPosts();
  }, []);
  React.useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await axios.get(GradeApi);
      console.log(data);

      setGrades(data.filter((item) => item?.schoolName._id === schoolInfo));
    };

    fetchPosts();
  }, []);
  React.useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await axios.get(CutOffMarkApi);
      console.log(data);

      setRanks(data.filter((item) => item?.schoolName._id === schoolInfo));
    };

    fetchPosts();
  }, []);
  const checkPrint = () => {
    navigate("/online-result");
  };
  return (
    <>
      <div className="mt-4 text-center">
        <Link to="/admin">Go back</Link>
      </div>
      <div className="mt-2 mb-2">
        <Container>
          {/* {viewResult?.Position} */}
          <div className="result-main-div-section ">
            <div className="display-content-head-result">
              <div className="logo-result-div">
                <img
                  src={viewResult?.school?.schoolLogo}
                  alt="logo"
                  className="logo-result"
                />{" "}
              </div>{" "}
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
                <div className="sheet-div">
                  <div style={{ textTransform: "uppercase" }}>
                    {viewResult?.classes?.replace(/_/g, " ")} SCHOOL TERMINAL
                    RESULT SHEET
                  </div>
                </div>
              </div>
              <div className="img-passport-result-div">
                <img
                  src={viewResult?.user?.passportPhoto}
                  alt="passport"
                  className="img-passport-result"
                />
              </div>{" "}
            </div>
            <div className="user-result-detail-display">
              <div>
                <span>NAME:</span> {viewResult?.user?.firstName}{" "}
                {viewResult?.user?.lastName}
              </div>
              <div className="user-d-class">
                <span> CLASS:</span> {viewResult?.classes?.replace(/_/g, " ")}
              </div>
              <div className="mt-4">
                <span> TERM:</span> {viewResult?.term?.replace(/_/g, " ")}
              </div>
              <div className="mt-4">
                <span> YEAR:</span> {viewResult?.year}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                marginLeft: "auto",
                marginRight: "auto",
                justifyContent: "center",
                alignItems: "center",
                width: "50px",
                height: "50px",
                background: "white",
              }}
            >
              <img
                src={viewResult?.school?.schoolLogo}
                alt="logo"
                style={{
                  opacity: 0.5,
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />{" "}
            </div>{" "}
            <div className="tb-display-tables ">
              <div>
                <div className="table-div">
                  <Table responsive="sm" bordered hover>
                    <thead>
                      <tr>
                        {/* <th>#</th> */}
                        <th>SUBJECT</th>
                        <th>1st TERM TOTAL</th>
                        <th>2ND TERM TOTAL</th>
                        <th>3RD TERM TOTAL</th>
                        <th>SUBJECT TOTAL SCORE </th>
                        <th>SUBJECT TOTAL AVERAGE </th>
                        <th>SUBJECT GRADE </th>
                        <th>SUBJECT REMARK </th>
                      </tr>
                    </thead>
                    <tbody>
                      {viewResult?.subjects
                        ?.sort((a, b) =>
                          a.subjectName.localeCompare(b.subjectName)
                        )
                        .map((item) => (
                          <tr key={item._id}>
                            <td>{item?.subjectName?.replace(/_/g, " ")}</td>
                            <td>{item?.total1stTermScore}</td>
                            <td>{item?.total2ndTermScore}</td>
                            <td>{item?.total3rdTermScore}</td>
                            <td>{item?.totalScore}</td>
                            <td>
                              {!isNaN(Number(item?.totalAverage))
                                ? Number.isInteger(Number(item?.totalAverage))
                                  ? Number(item?.totalAverage)
                                  : Number(item?.totalAverage).toFixed(1)
                                : "N/A"}
                            </td>
                            {/* <td>{item?.totalAverage}</td> */}
                            <td>{item?.grade}</td>
                            <td>{item?.remark?.replace(/_/g, " ")}</td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                </div>
                <div className="table-div">
                  <Table striped bordered hover responsive="sm">
                    <thead>
                      <tr>
                        <th>TOTAL SCORE</th>
                        <th>TOTAL AVERAGE</th>
                        <th>TOTAL GRADE</th>
                        <th>POSITION</th>
                        <th>OUT OF</th>
                        <th>FORM TEACHER REMARK</th>
                        <th>HEAD TEACHER REMARK</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{viewResult?.TotalScore} </td>
                        <td>{viewResult?.TotalAverage} </td>
                        <td>{viewResult?.TotalGrade} </td>
                        <td>{viewResult?.Position} </td>
                        <td>{viewResult?.numberInClass} </td>
                        <td>{viewResult?.Remark} </td>
                        <td>{viewResult?.HmRemark?.replace(/_/g, " ")} </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>
              <div>
                <div className="table-div-2" style={{ marginTop: "-20px" }}>
                  <Table striped bordered hover responsive="sm">
                    <thead>
                      <tr>
                        <th>Grade Name</th>
                        <th>Grade Range</th>
                        <th>Grade Remark</th>
                      </tr>
                    </thead>
                    <tbody>
                      {grades
                        ?.sort((a, b) => a.gradeName.localeCompare(b.gradeName))
                        .map((item) => (
                          <tr key={item._id}>
                            <td>{item?.gradeName}</td>
                            <td>{item?.gradeRange}</td>
                            <td>{item?.gradeRemark?.replace(/_/g, " ")}</td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                </div>
                <div className="table-div-2" style={{ marginTop: "-20px" }}>
                  <Table striped bordered hover responsive="sm">
                    <thead>
                      <tr>
                        {ranks?.map((item) => (
                          <th>{item?.name}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {ranks
                          ?.sort((a, b) => a.name.localeCompare(b.name))
                          .map((item) => (
                            <td>{item?.cutOffMark}%</td>
                          ))}
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>{" "}
              <div className="stamp-div">
                <img
                  src={viewResult?.school?.schoolStamp}
                  alt="school stamp or seal"
                  className="stamp-img"
                />
              </div>
            </div>
          </div>
          <Button variant="contained" onClick={checkPrint}>
            Print Result!
          </Button>
        </Container>
      </div>
    </>
  );
};

export default AdminStudentCommulative;
