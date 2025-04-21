import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Container } from "@material-ui/core";
import "./ViewResult.css";

import Table from "react-bootstrap/Table";
// import stamp from "../../assets/images/stamp.png";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import TopNavBar from "../../components/TopNavBar/TopNavBar";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { schoolInfo } from "../../store/Info";
import {
  CutOffMarkApi,
  GradeApi,
  ResultApi,
  ResultCheckApi,
} from "../../APiData/Api";

export const MyResult = React.forwardRef((props, ref) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const navigate = useNavigate();
  const { selectedSchool, selectedClass, selectedYear, userId, selectedTerm } =
    useParams();
  const [viewResult, setViewResult] = useState([]);
  console.log(viewResult);
  const [ranks, setRanks] = useState([]);
  const [grades, setGrades] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get(
          ResultApi
          // ResultCheckApi +
          //   selectedSchool +
          //   selectedClass +
          //   userId +
          //   selectedYear +
          //   selectedTerm
          // `https://result.ourworldintschool.ng/api/Results/results/${selectedSchool}/${selectedClass}/${userId}/${selectedYear}/${selectedTerm}`
        );
        console.log(data);
        // const foundData = data.find((item) => item.artist === artist);
        setViewResult(
          data?.filter(
            (item) =>
              item?.school?._id === selectedSchool &&
              item?.classes === selectedClass &&
              item?.year === decodeURIComponent(selectedYear) &&
              item?.term === selectedTerm &&
              item?.user?._id === userId
          )
        );
      } catch (error) {
        // Handle the error here
        navigate("/Result-check");
        console.error("Result not Found:", error);
      }
    };

    fetchPosts();
  }, []);
  React.useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await axios.get(GradeApi);
      console.log(data);

      setGrades(data.filter((item) => item?.schoolName._id === selectedSchool));
    };

    fetchPosts();
  }, []);
  React.useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await axios.get(CutOffMarkApi);
      console.log(data);

      setRanks(data.filter((item) => item?.schoolName._id === selectedSchool));
    };

    fetchPosts();
  }, []);

  return (
    <>
      <TopNavBar />
      <Header />
      {viewResult?.map((items) => (
        <>
          <div className="mt-2 mb-2">
            <Container>
              {/* {viewResult?.Position} */}
              <div className="result-main-div-section" ref={componentRef}>
                <div className="display-content-head-result">
                  <div className="logo-result-div">
                    <img
                      src={items?.school?.schoolLogo}
                      alt="logo"
                      className="logo-result"
                    />{" "}
                  </div>{" "}
                  <div>
                    <h3
                      className="our-title-h3"
                      style={{ textTransform: "uppercase" }}
                    >
                      {items?.schoolName?.replace(/_/g, " ")}
                    </h3>
                    <div className="adress-text">
                      <div className="text-center">
                        {items?.school?.address}{" "}
                      </div>
                      <div>
                        <span>{items?.school?.state} </span>{" "}
                        <span>{items?.school?.country} </span>
                      </div>
                    </div>

                    <div className="sheet-div">
                      <div style={{ textTransform: "uppercase" }}>
                        {items?.classes?.replace(/_/g, " ")} SCHOOL TERMINAL
                        RESULT SHEET
                      </div>
                    </div>
                  </div>
                  <div className="img-passport-result-div">
                    <img
                      src={items?.user?.passportPhoto}
                      alt="passport"
                      className="img-passport-result"
                    />
                  </div>{" "}
                </div>
                <div className="user-result-detail-display">
                  <div>
                    <span>NAME:</span> {items?.user?.firstName}{" "}
                    {items?.user?.lastName}
                  </div>
                  <div className="user-d-class">
                    <span> CLASS:</span> {items?.classes?.replace(/_/g, " ")}
                  </div>
                  <div className="mt-4">
                    <span> TERM:</span> {items?.term?.replace(/_/g, " ")}
                  </div>
                  <div className="mt-4">
                    <span>ACADEMIC YEAR:</span> {items?.year}
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
                    src={items?.school?.schoolLogo}
                    alt="logo"
                    style={{
                      opacity: 0.5,
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />{" "}
                </div>{" "}
                <div className="tb-display-tables">
                  <div>
                    <div className="table-div">
                      <Table responsive="sm" bordered hover>
                        <thead>
                          <tr>
                            {/* <th>#</th> */}
                            <th>SUBJECT</th>
                            <th>CA</th>
                            <th>EXAM</th>
                            <th>TOTAL</th>
                            <th>GRADE</th>
                            <th>REMARK</th>
                          </tr>
                        </thead>
                        <tbody>
                          {items?.subjects?.map((item) => (
                            <>
                              {item?.subjects
                                ?.sort((a, b) =>
                                  a.subjectName.localeCompare(b.subjectName)
                                )
                                .map((item) => (
                                  <tr key={item._id}>
                                    <td>
                                      {item?.subjectName?.replace(/_/g, " ")}
                                    </td>
                                    <td>{item?.test}</td>
                                    <td>{item?.exam}</td>
                                    <td>{item?.totalScore}</td>
                                    <td>{item?.grade}</td>
                                    <td>{item?.remark?.replace(/_/g, " ")}</td>
                                  </tr>
                                ))}
                            </>
                          ))}{" "}
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
                            <td>{items?.TotalScore} </td>
                            <td>{items?.TotalAverage} </td>
                            <td>{items?.TotalGrade} </td>
                            <td>{items?.Position} </td>
                            <td>{items?.numberInClass} </td>
                            <td>{items?.Remark} </td>
                            <td>{items?.HmRemark?.replace(/_/g, " ")} </td>
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
                            ?.sort((a, b) =>
                              a.gradeName.localeCompare(b.gradeName)
                            )
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
                            {ranks
                              ?.sort((a, b) => a.name.localeCompare(b.name))
                              .map((item) => (
                                <th>{item?.name}</th>
                              ))}
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            {ranks?.map((item) => (
                              <td>{item?.cutOffMark}%</td>
                            ))}
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </div>
                <div className="stamp-div">
                  <img
                    src={items?.school?.schoolStamp}
                    alt="stamp"
                    className="stamp-img"
                  />
                </div>
              </div>

              <Button variant="contained" onClick={handlePrint}>
                Print Result!
              </Button>
            </Container>
          </div>
        </>
      ))}
      <Footer />
    </>
  );
});

// export default ViewResult;
