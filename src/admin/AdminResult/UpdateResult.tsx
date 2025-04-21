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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { FaEdit, FaLock, FaTrash } from "react-icons/fa";
import Button from "@mui/material/Button";
import { BsFillBookmarkCheckFill } from "react-icons/bs";

import { Link, useNavigate, useParams } from "react-router-dom";
import CircularIndeterminate from "../../components/Loading/Progress";
import {
  ClassApi,
  GradeApi,
  ResultApi,
  SubjectMarksApi,
  UpdateResultApi,
  UserApi,
  getAllSchools,
} from "../../APiData/Api";
import { schoolInfo } from "../../store/Info";
import { Dropdown } from "react-bootstrap";
import "./CreateResult.css";
const UpdateResult = () => {
  const { id, selectedSchool, selectedClass } = useParams();
  const navigate = useNavigate();
  const [school, setSchool] = useState(selectedSchool);
  const [showResultCard, setShowResultCard] = useState(false);
  const [subjects, setSubjects] = useState("");
  const [selectedSchools, setSelectedSchools] = React.useState<any>("");
  const [selectedClasses, setSelectedClasses] = React.useState<any>("");
  const [selectedYear, setSelectedYear] = React.useState<any>("");
  const [selectedTerm, setSelectedTerm] = React.useState<any>("");
  const [user, setUser] = useState("");
  console.log(id);
  const [term, setTerm] = useState("");
  const [year, setYear] = useState("");
  const [TotalScore, setTotalScore] = useState(0);
  const [TotalAverage, setTotalAverage] = useState(0);
  //   const [Position, setPosition] = useState("");
  const [numberInClass, setNumberInClass] = useState(Number);
  const [TotalGrade, setTotalGrade] = useState("");
  //  const [Signature, setSignature]=useState('')
  const [classes, setClasses] = useState("");
  const [Remark, setRemark] = useState("");
  const [HmRemark, setHmRemark] = useState("");
  //   const[subjects, setSubjects]=useState([subjectMarksData])
  const [schoolRegNumber, setSchoolRegNumber] = useState("");
  const [filteredresultData, setFilteredResultData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [loader, setLoader] = React.useState(false);
  const [grades, setGrades] = useState([]);
  const [selectedGrades, setSelectedGrades] = useState("");
  const [message, setMessage] = React.useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [showError, setShowError] = React.useState(false);
  const [userDatas, setUserDatas] = useState<any | null>(null);
  // State to store the API response
  const [subjectMarksData, setSubjectMarksData] = React.useState<any>([]);
  const [classD, setClassD] = useState([]);
  const [schools, setSchools] = useState([]);
  // Function to handle the select input change
  const handleLoader = () => {
    setLoading(true);

    // Perform any other actions that need to be done when the button is clicked
  };
  const displayResultCard = () => {
    setShowResultCard(true);
  };

  const handleSelectSchoolChange = (e: any) => {
    setSelectedSchools(e.target.value);
  };
  const handleSelectClassChange = (e: any) => {
    setSelectedClasses(e.target.value);
  };
  const TosetInitialFetch = () => {
    setInitialFetch(true);
    displayResultCard();
  };
  const [initialFetch, setInitialFetch] = React.useState(true);

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
            response.data.filter((item: any) => item._id === selectedClass)
          );
        })
        .catch((error) => {
          console.error("Error fetching classes:", error);
        });
    }
  }, [schoolInfo]);
  React.useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await axios.get(ResultApi + id);
      console.log(data);

      setUserDatas(data);
    };

    fetchPosts();
  }, [id]);
  React.useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await axios.get(GradeApi);
      console.log(data);

      setGrades(
        data.filter((item: any) => item?.schoolName._id === schoolInfo)
      );
    };

    fetchPosts();
  }, []);
  // Function to calculate the grand total

  const calculateGrandTotal = () => {
    let grandTotal = 0; // Initialize grandTotal variable
    const total = userDatas?.subjects?.flatMap(
      (
        items: any // Use flatMap to flatten the array
      ) => items.subjects.map((item: any) => item.totalScore)
    );
    grandTotal = total.reduce((acc: number, curr: number) => acc + curr, 0); // Sum up all the scores
    setTotalScore(grandTotal); // Set the total score

    ///calculate totalAverage
    let totalAverage = grandTotal / total.length;
    // Check if the average is greater than 0.5 and round accordingly
    if (totalAverage > 0.5) {
      totalAverage = Math.round(totalAverage); // Round the average
    }
    setTotalAverage(parseFloat(totalAverage.toFixed(2))); // Set the total average
  };

  const submitHandler = (e: any) => {
    e.preventDefault();
    setLoading(true);
    const data: any = {
      user: id,

      year: year,

      // schools.map((item: any) => item?.name),
      TotalScore: TotalScore,
      TotalGrade: selectedGrades,
      TotalAverage: TotalAverage,
      //   Position: Position,
      term: term,
      Remark: Remark,
      HmRemark: HmRemark,
      numberInClass: numberInClass,
      schoolRegNumber: schoolRegNumber,
      subjects: subjectMarksData.map((item: any) => item._id),
    };

    const headers: any = {
      "Custom-Header": "xxxx-xxxx-xxxx-xxxx",
      "Content-Type": "application/json",
      // Accept: "application/json",
      // body: JSON.stringify(data),
    };

    axios
      .put(UpdateResultApi + id, data, headers)

      .then((res) => {
        console.log(res.data);
        setLoading(false);
        if (res.data) {
          setUser("");
          setTerm(" ");
          setYear(" ");
          setHmRemark("");
          setSchool("");
          setSubjects("");
          //   setPosition(" ");
          setSchoolRegNumber(" ");
          setTotalScore(Number);
          setTotalGrade(" ");
          setTotalAverage(Number);
          setClasses(" ");
          setRemark(" ");
          setNumberInClass(Number);
          console.log(res.data);
          toast.success("post sucessful");
          navigate("/viewResult");
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
      <>
        <div className="register-main">
          <div className="container">
            <div className="item-center">
              {" "}
              <div className="titler">Student Result</div>
            </div>
            <form onSubmit={submitHandler}>
              <>
                <div className="content">
                  <div
                    style={{
                      width: "100px",
                      height: "12vh",
                      display: "flex",
                      marginLeft: "auto",
                      marginRight: "auto",
                      marginBottom: "10px",
                    }}
                  >
                    <img
                      src={userDatas?.user?.passportPhoto}
                      alt="img"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />{" "}
                  </div>
                  <h6
                    className="  d-flex justify-content-center"
                    style={{ fontSize: "medium", fontWeight: "600" }}
                  >
                    Input Result of
                  </h6>
                  <div
                    className="text-center mb-4"
                    style={{ fontSize: "x-large", fontWeight: "600" }}
                  >
                    <span
                      style={{
                        marginLeft: "3px",
                        marginRight: "3px",
                        color: "#5372f0",
                      }}
                    >
                      {userDatas?.user?.firstName}{" "}
                    </span>
                    <span className="ml-3" style={{ color: "#5372f0" }}>
                      {userDatas?.user?.lastName}{" "}
                    </span>
                  </div>
                  <div
                    className="text-center "
                    style={{ color: "#5372f0", fontWeight: "600" }}
                  >
                    {userDatas?.user?.schoolRegNumber}{" "}
                  </div>
                  <p
                    className="d-flex justify-content-center"
                    style={{ marginLeft: "15px", fontSize: "medium" }}
                  >
                    *pls select your subject and input result*
                  </p>
                </div>
                {userDatas?.subjects?.map((item: any) => (
                  <div key={item._id}>
                    {item?.subjects?.map((items: any) => (
                      <>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            marginLeft: "auto",
                            marginRight: "auto",
                          }}
                        >
                          <div className="input-box">
                            <Dropdown className="dropdown-input-v">
                              <Dropdown.Toggle
                                variant="success"
                                id="dropdown-basic"
                                style={{
                                  border: "1px solid green",
                                  backgroundColor: "white",
                                  marginTop: "15px",
                                  color: "black",
                                }}
                                //   className="result-input-elect-nursery1"
                              >
                                {items?.subjectName}
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <div
                                  className="col-md-6 mb-2 mt-1 "

                                  // style={{
                                  //   marginLeft: "auto",
                                  //   marginRight: "auto",
                                  // }}
                                >
                                  <TextField
                                    style={{
                                      width: "150px",
                                      marginLeft: "4px",
                                    }}
                                    rows={4}
                                    id="outlined-required"
                                    label={items?.subjectName.replace(
                                      /_/g,
                                      " "
                                    )}
                                    name="subjectName"
                                    type="text"
                                    value={items?.subjectName}
                                  />
                                </div>

                                <div className="col-md-6 mb-2 mt-2 ">
                                  <TextField
                                    style={{
                                      width: "150px",
                                      marginLeft: "4px",
                                    }}
                                    rows={4}
                                    id="outlined-required"
                                    label="Test"
                                    type="number"
                                    name="test"
                                    value={items?.test}
                                  />
                                </div>
                                <div className="col-md-6 mb-2 mt-1">
                                  <TextField
                                    style={{
                                      width: "150px",
                                      marginLeft: "4px",
                                    }}
                                    rows={4}
                                    id="outlined-required"
                                    label="Exam"
                                    name="exam"
                                    type="number"
                                    value={items?.exam}
                                  />
                                </div>
                                <div className="col-md-6 mb-2 mt-2">
                                  <TextField
                                    style={{
                                      width: "150px",
                                      marginLeft: "4px",
                                    }}
                                    rows={4}
                                    id="outlined-required"
                                    label="Total Score"
                                    type="number"
                                    name="totalScore"
                                    value={items?.totalScore}
                                    onBlur={calculateGrandTotal}
                                  />
                                </div>
                                <div className="col-md-6 mb-2 mt-1">
                                  <TextField
                                    style={{
                                      width: "150px",
                                      marginLeft: "4px",
                                    }}
                                    rows={4}
                                    id="outlined-required"
                                    label="Grade"
                                    name="grade"
                                    type="text"
                                    value={items?.grade}
                                  />
                                </div>
                                <div className="col-md-6 mb-2 mt-1">
                                  <TextField
                                    style={{
                                      width: "150px",
                                      marginLeft: "4px",
                                    }}
                                    rows={4}
                                    id="outlined-required"
                                    name="remark"
                                    label="Remark"
                                    type="text"
                                    value={items?.remark}
                                  />
                                </div>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                          <div></div>
                        </div>
                      </>
                    ))}
                  </div>
                ))}
                <Button
                  variant="contained"
                  className="mt-4"
                  onClick={calculateGrandTotal}
                >
                  Click To Generate TotalScore & Average
                </Button>
                <div>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="TotalScore"
                    label="Total Score"
                    type="number"
                    name="TotalScore"
                    autoComplete="classes"
                    autoFocus
                    value={TotalScore}
                    onBlur={calculateGrandTotal}
                  />
                  {/* <p>{TotalScore} </p> */}
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="TotalAverage"
                    label="Total Average"
                    name="TotalAverage"
                    autoComplete="TotalAverage"
                    autoFocus
                    value={TotalAverage}
                    //   onBlur={calculateTotalGrade}
                    // onChange={(e) =>
                    //   setTotalAverage(parseInt(e.target.value, 10))
                    // }
                  />
                  {/* <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="TotalGrade"
                          label="Total Grade"
                          name="TotalGrade"
                          autoComplete="TotalGrade"
                          autoFocus
                          value={TotalGrade}
                          onChange={(e) => setTotalGrade(e.target.value)}
                        /> */}
                  <FormControl fullWidth>
                    <InputLabel id="demo-multiple-name-label">Grade</InputLabel>
                    <Select
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      // multiple
                      value={selectedGrades}
                      onChange={(e: any) => setSelectedGrades(e.target.value)}
                      // input={<OutlinedInput label="Name" />}
                    >
                      {grades
                        ?.sort((a: any, b: any) =>
                          a.gradeName.localeCompare(b.gradeName)
                        )
                        .map((item: any) => (
                          <MenuItem value={item.gradeName}>
                            {item.gradeName}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="numberInClass"
                    label="Number In Class"
                    name="numberInClass"
                    autoComplete="numberInClass"
                    type="number"
                    autoFocus
                    value={numberInClass}
                    onChange={(e) => setNumberInClass(parseInt(e.target.value))}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    multiline
                    rows={6}
                    fullWidth
                    type="text"
                    id="remark"
                    label="Form Teacher Remark"
                    name="remark"
                    autoComplete="remark"
                    autoFocus
                    value={Remark}
                    onChange={(e) => setRemark(e.target.value)}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    multiline
                    rows={6}
                    fullWidth
                    type="text"
                    id="remark"
                    label="Head Teacher Remark"
                    name="remark"
                    autoComplete="remark"
                    autoFocus
                    value={HmRemark}
                    onChange={(e) => setHmRemark(e.target.value)}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="schoolRegNumber"
                    label="School Registeration/Admission Number"
                    name="schoolRegNumber"
                    autoComplete="schoolRegNumber"
                    autoFocus
                    placeholder={
                      userDatas
                        ? ` ${userDatas?.schoolRegNumber}`
                        : "loading..."
                    }
                    style={{
                      color: "black",
                      fontSize: "x-large",
                      fontWeight: "500",
                    }}
                    value={schoolRegNumber}
                    onChange={(e) => setSchoolRegNumber(e.target.value)}
                  />
                  <FormControl fullWidth className="mt-2 mb-2">
                    <InputLabel id="demo-multiple-name-label">
                      School
                    </InputLabel>
                    <Select
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      // multiple
                      value={selectedSchools}
                      onChange={handleSelectSchoolChange}
                      // input={<OutlinedInput label="Name" />}
                    >
                      {schools?.map((item: any) => (
                        <MenuItem value={item.name}>
                          {item.name.replace(/_/g, " ")}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth className="mt-2 mb-2">
                    <InputLabel id="demo-multiple-name-label">Class</InputLabel>
                    <Select
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      // multiple
                      value={selectedClasses}
                      onChange={handleSelectClassChange}
                      // input={<OutlinedInput label="Name" />}
                    >
                      <MenuItem value={userDatas?.classes}>
                        {userDatas?.classes}
                      </MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth className="mt-2 mb-2">
                    <InputLabel id="demo-multiple-name-label">Term</InputLabel>
                    <Select
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      // multiple
                      value={term}
                      onChange={(e: any) => setTerm(e.target.value)}
                      // input={<OutlinedInput label="Name" />}
                    >
                      <MenuItem value="1st Term">1st Term</MenuItem>
                      <MenuItem value="2nd Term">2nd Term</MenuItem>
                      <MenuItem value="3rd Term">3rd Term</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth className="mt-2 mb-2">
                    <InputLabel id="demo-multiple-name-label">
                      Academic Year
                    </InputLabel>
                    <Select
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      // multiple
                      fullWidth
                      value={year}
                      onChange={(e: any) => setYear(e.target.value)}
                      // input={<OutlinedInput label="Name" />}
                    >
                      <MenuItem value="2023/2024">2023/2024</MenuItem>
                      <MenuItem value="2024/2025">2024/2025</MenuItem>
                      <MenuItem value="2025/2026">2025/2026</MenuItem>
                      <MenuItem value="2026/2027">2026/2027</MenuItem>
                      <MenuItem value="2027/2028">2027/2028</MenuItem>
                      <MenuItem value="2028/2029">2028/2029</MenuItem>
                      <MenuItem value="2029/2030">2029/2030</MenuItem>
                      <MenuItem value="2030/2031">2030/2031</MenuItem>
                    </Select>
                  </FormControl>
                  {loading ? (
                    <CircularIndeterminate />
                  ) : (
                    <div
                      className="d-flex justify-content-center"

                      // onClick={handleLoader}
                    >
                      <Button
                        fullWidth
                        variant="contained"
                        onSubmit={handleLoader}
                        type="submit"
                      >
                        Update Result
                      </Button>
                      <ToastContainer />
                    </div>
                  )}
                </div>
              </>
            </form>
          </div>
        </div>
      </>
    </AdminLayout>
  );
};

export default UpdateResult;
