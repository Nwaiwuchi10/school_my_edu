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
  CommulativeApi,
  DirectorsRemarkApi,
  GradeApi,
  SubjectMarksApi,
  UserApi,
  getAllSchools,
} from "../../APiData/Api";
import { schoolInfo } from "../../store/Info";
import { Dropdown } from "react-bootstrap";
type GroupedSubjects = {
  [subjectName: string]: number[];
};

interface Props {
  groupedSubjects: GroupedSubjects;
  subjectName: string;
}
const DynamicResult: React.FC = () => {
  const { id, selectedSchool, selectedClass } = useParams();
  const navigate = useNavigate();
  const [school, setSchool] = useState(selectedSchool);
  const [showResultCard, setShowResultCard] = useState(false);
  const [subjects, setSubjects] = useState("");
  const [selectedSchools, setSelectedSchools] = React.useState<any>("");
  const [selectedClasses, setSelectedClasses] = React.useState<any>("");
  const [selectedYear, setSelectedYear] = React.useState<any>({
    year1: "",
    year2: "",
  });
  const [selectedTerm, setSelectedTerm] = React.useState<any>({
    term1: "",
    term2: "",
    term3: "",
  });
  const [user, setUser] = useState("");
  // console.log(id);
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
  const [directorsRemark, setDirectorsRemark] = useState<any>([]);
  const [showProfile, setShowProfile] = useState(false);
  const displayUserResult = () => {
    setShowProfile(true);
  };
  // State to store the API response
  const [subjectMarksData, setSubjectMarksData] = React.useState<any>([]);
  const [classD, setClassD] = useState([]);
  const [schools, setSchools] = useState([]);
  // Function to handle the select input change
  const [subjectsData, setSubjectsData] = useState({
    subjectName: "",
    total1stTermScore: 0,
    total2ndTermScore: 0,
    total3rdTermScore: 0,
    totalScore: 0,
    totalAverage: 0,
    grade: "",
    remark: "",
  });
  const [selectedRemark, setSelectedRemark] = useState("");
  const handleLoader = () => {
    setLoading(true);

    // Perform any other actions that need to be done when the button is clicked
  };
  const handleYearChange = (event: any) => {
    const { name, value } = event.target;
    setSelectedYear((prevState: any) => ({ ...prevState, [name]: value }));
  };

  const handleTermChange = (event: any) => {
    const { name, value } = event.target;
    setSelectedTerm((prevState: any) => ({ ...prevState, [name]: value }));
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
    displayResultCard();
  };

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
      const { data } = await axios.get(UserApi + id);
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
        data.filter((item: any) => item?.schoolName._id === selectedSchool)
      );
    };

    fetchPosts();
  }, []);

  // Function to calculate the grand total

  const calculateGrandTotal = () => {
    let grandTotal = 0; // Initialize grandTotal variable
    const total = subjectMarks.flatMap(
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

  /////handle input change

  const [inputScores, setInputScores] = useState<any>({});
  const [subjectGradeChange, setSubjectGradeChange] = useState<any>({});
  const [subjectRemarkChange, setSubjectRemarkChange] = useState<any>({});

  const handleGradeChange = (subjectName: string, value: number) => {
    setSubjectGradeChange((prev: any) => ({
      ...prev,
      [subjectName]: value,
    }));
  };

  const handleRemarkChange = (subjectName: string, value: number) => {
    setSubjectRemarkChange((prev: any) => ({
      ...prev,
      [subjectName]: value,
    }));
  };
  const handleInputChange = (
    subjectName: string,
    index: number,
    value: number
  ) => {
    setInputScores((prev: any) => ({
      ...prev,
      [subjectName]: {
        ...prev[subjectName],
        [`total${index + 1}TermScore`]: value,
        // [index]: value,
      },
    }));
  };

  const submitHandler = (e: any) => {
    e.preventDefault();
    setLoading(true);

    const subjectsData = Object.keys(groupedSubjects).map((subjectName) => {
      const scores = groupedSubjects[subjectName];
      return {
        subjectName: subjectName,
        total1stTermScore: scores[0] || 0,
        total2ndTermScore: scores[1] || 0,
        total3rdTermScore: scores[2] || 0,
        totalScore: subjectNameGrandTotal[subjectName],
        totalAverage: subjectNameGrandAverage[subjectName],
        grade: subjectGradeChange[subjectName] || "",
        remark: subjectRemarkChange[subjectName] || "",
      };
    });
    const data: any = {
      user: id,
      classes: selectedClasses,
      school: school,
      year: year,
      schoolName: selectedSchools,

      TotalScore: TotalScore,
      TotalGrade: selectedGrades,
      TotalAverage: TotalAverage,
      //   Position: Position,
      term: term,
      Remark: Remark,
      HmRemark: HmRemark,
      numberInClass: numberInClass,
      schoolRegNumber: userDatas?.schoolRegNumber,

      subjects: subjectsData,
    };

    const headers: any = {
      "Custom-Header": "xxxx-xxxx-xxxx-xxxx",
      "Content-Type": "application/json",
      // Accept: "application/json",
      // body: JSON.stringify(data),
    };

    axios
      .post(CommulativeApi, data, headers)

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
          navigate("/viewCommulativeResult");
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
  const [subjectMarks, setSubjectMarks] = useState<any>([]);
  const [subjectNameExtract, setSubjectNameExtract] = useState("");

  const [total2nd, setTotal2nd] = useState<any>(0);
  const [total3rd, setTotal3rd] = useState<any>(0);
  const [total1st, setTotal1st] = useState<any>(0);

  const Fetch = () => {
    setLoader(true);
    try {
      axios.get(SubjectMarksApi).then((response) => {
        // Calculate total scores for each term
        setLoader(false);

        setSubjectMarks(
          response.data.filter(
            (item: any) =>
              item?.schoolName?._id === selectedSchool &&
              item?.classes?._id === selectedClass &&
              item?.year === selectedYear &&
              item?.user?._id === id
          )
        );
      });
    } catch (error) {
      console.error(error, "Failed");
    }
    fet();
    displayUserResult();
  };
  React.useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await axios.get(DirectorsRemarkApi);
      console.log(data);

      setDirectorsRemark(
        data.filter((item: any) => item?.schoolName._id === schoolInfo)
      );
    };

    fetchPosts();
  }, []);
  const fet = () => {
    setSubjectNameExtract(
      subjectMarks?.reduce((acc: any, data: any) => {
        data.subjects.forEach((subject: any) => {
          if (!acc[subject.subjectName]) {
            acc[subject.subjectName] = [];
          }
          acc[subject.subjectName].push(subject.totalScore);
        });
        return acc;
      }, {} as Record<string, number[]>)
    );
  };
  const [subjectNameGrandTotal, setSubjectNameGrandTotal] = useState<any>({});
  const [subjectNameGrandAverage, setSubjectNameGrandAverage] = useState<any>(
    {}
  );
  useEffect(() => {
    const groupedSubjects = subjectMarks?.reduce((acc: any, data: any) => {
      data.subjects.forEach((subject: any) => {
        if (!acc[subject.subjectName]) {
          acc[subject.subjectName] = [];
        }
        acc[subject.subjectName].push(subject.totalScore);
      });
      return acc;
    }, {} as Record<string, number[]>);

    const subjectTotals: Record<string, number> = {};
    const subjectAverages: Record<string, number> = {};

    for (const subjectName in groupedSubjects) {
      const scores = groupedSubjects[subjectName];
      const total = scores.reduce((sum: any, score: any) => sum + score, 0);
      const average = total / scores.length;

      subjectTotals[subjectName] = total;
      subjectAverages[subjectName] = average;
    }
    // if (subjectAverages > 0.5) {
    //   subjectAverages = Math.round(subjectAverages);
    // }
    setSubjectNameGrandTotal(subjectTotals);
    setSubjectNameGrandAverage(subjectAverages);
  }, [subjectMarks]);
  // // Process the data to group by subject name
  const groupedSubjects = subjectMarks?.reduce((acc: any, data: any) => {
    data.subjects.forEach((subject: any) => {
      if (!acc[subject.subjectName]) {
        acc[subject.subjectName] = [];
      }
      acc[subject.subjectName].push(subject.totalScore);
      // console.log(acc);
    });
    return acc;
  }, {} as Record<string, number[]>);

  return (
    <>
      <div>
        <div className="user-details">
          <h4 className="text-center">Select Result *Year*</h4>
          <p className="text-center">Before you proceed</p>

          <div className="input-box">
            <label>Select 1st Term Result Year</label>
            <select value={selectedYear.year1} onChange={handleYearChange}>
              <option value="">Select Year</option>

              <option value="2023"> 2023</option>

              <option value="2024"> 2024</option>

              <option value="2025"> 2025</option>

              {/* Add more terms as needed */}
            </select>
          </div>
          <div className="input-box">
            <label>Select 2nd Term Result Year</label>
            <select value={selectedYear.year2} onChange={handleYearChange}>
              <option value="">Select Year</option>

              <option value="2023"> 2023</option>

              <option value="2024"> 2024</option>

              <option value="2025"> 2025</option>

              {/* Add more terms as needed */}
            </select>
          </div>
          <div className="input-box">
            <label>Select 1st term Result Term</label>
            <select value={selectedTerm.term1} onChange={handleTermChange}>
              <option value="1st_Term">1st Term</option>

              {/* Add more terms as needed */}
            </select>
          </div>
          <div className="input-box">
            <label>Select 2nd term Result Term</label>
            <select value={selectedTerm.term2} onChange={handleTermChange}>
              <option value="2nd"> 2023</option>

              <option value="2024"> 2024</option>

              <option value="2025"> 2025</option>

              {/* Add more terms as needed */}
            </select>
          </div>
          <div className="input-box">
            <label>Select 3rd term Result Term</label>
            <select value={selectedTerm.term3} onChange={handleTermChange}>
              <option value="">Select Year</option>

              <option value="2023"> 2023</option>

              <option value="2024"> 2024</option>

              <option value="2025"> 2025</option>

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
            onClick={Fetch}
          >
            Fetch To Proceed
          </button>
          {loader && <CircularIndeterminate />}
        </>
      </div>

      {showProfile && (
        <div className="register-main" style={{ paddingTop: "50px" }}>
          <div className="container">
            <div className="item-center">
              {" "}
              <div className="titler">Student Commulative Result</div>
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
                      src={userDatas?.passportPhoto}
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
                      {userDatas?.firstName}{" "}
                    </span>
                    <span className="ml-3" style={{ color: "#5372f0" }}>
                      {userDatas?.lastName}{" "}
                    </span>
                  </div>
                  <div
                    className="text-center "
                    style={{ color: "#5372f0", fontWeight: "600" }}
                  >
                    {userDatas?.schoolRegNumber}{" "}
                  </div>
                  <p
                    className="d-flex justify-content-center"
                    style={{ marginLeft: "15px", fontSize: "medium" }}
                  >
                    *pls select your subject and input result*
                  </p>
                </div>
                {subjectMarks ? (
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
                      {Object.keys(subjectNameGrandTotal)?.map(
                        (subjectName: any) => (
                          <div key={subjectName} className="input-box">
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
                                {subjectName}
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <div className="col-md-6 mb-2 mt-1 ">
                                  <TextField
                                    style={{
                                      width: "150px",
                                      marginLeft: "4px",
                                    }}
                                    required
                                    rows={4}
                                    id="outlined-required"
                                    label={subjectName.replace(/_/g, " ")}
                                    name="subjectName"
                                    type="text"
                                    value={subjectName}
                                    // onChange={handleChangeSubjectName}
                                  />
                                </div>
                                {groupedSubjects[subjectName]?.map(
                                  (totalScore: any, index: any) => (
                                    <div
                                      className="col-md-6 mb-2 mt-2 "
                                      key={index}
                                    >
                                      <TextField
                                        style={{
                                          width: "150px",
                                          marginLeft: "4px",
                                        }}
                                        required
                                        rows={4}
                                        id={`outlined-required-${index}`}
                                        label={`Term ${index + 1} TotalScore`}
                                        type="number"
                                        name={`test-${index}`}
                                        value={totalScore}
                                        // value={
                                        //   inputScores[subjectName]?.[
                                        //     `total${index + 1}TermScore`
                                        //   ] || totalScore
                                        // }

                                        // onChange={(e) =>
                                        //   handleInputChange(
                                        //     subjectName,
                                        //     index,
                                        //     parseInt(e.target.value)
                                        //   )
                                        // }
                                      />
                                    </div>
                                  )
                                )}

                                <div className="col-md-6 mb-2 mt-1">
                                  <TextField
                                    style={{
                                      width: "150px",
                                      marginLeft: "4px",
                                    }}
                                    required
                                    rows={4}
                                    id="outlined-required"
                                    label="Total Score"
                                    name="grade"
                                    type="text"
                                    value={subjectNameGrandTotal[subjectName]}
                                  />
                                </div>
                                <div className="col-md-6 mb-2 mt-1">
                                  <TextField
                                    style={{
                                      width: "150px",
                                      marginLeft: "4px",
                                    }}
                                    required
                                    rows={4}
                                    id="outlined-required"
                                    label="Average"
                                    name="grade"
                                    type="text"
                                    value={subjectNameGrandAverage[
                                      subjectName
                                    ].toFixed(2)}
                                  />
                                </div>

                                <div>
                                  <FormControl fullWidth>
                                    <InputLabel id="demo-multiple-name-label">
                                      Grade
                                    </InputLabel>
                                    <Select
                                      required
                                      labelId="demo-multiple-name-label"
                                      id="demo-multiple-name"
                                      // multiple
                                      value={
                                        subjectGradeChange[subjectName] || ""
                                      }
                                      onChange={(e) =>
                                        handleGradeChange(
                                          subjectName,
                                          e.target.value
                                        )
                                      }
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
                                </div>
                                <div>
                                  <FormControl fullWidth>
                                    <InputLabel id="demo-multiple-name-label">
                                      Remark
                                    </InputLabel>
                                    <Select
                                      required
                                      labelId="demo-multiple-name-label"
                                      id="demo-multiple-name"
                                      // multiple
                                      value={
                                        subjectRemarkChange[subjectName] || ""
                                      }
                                      onChange={(e) =>
                                        handleRemarkChange(
                                          subjectName,
                                          e.target.value
                                        )
                                      }
                                      // input={<OutlinedInput label="Name" />}
                                    >
                                      {grades
                                        ?.sort((a: any, b: any) =>
                                          a.gradeRemark.localeCompare(
                                            b.gradeRemark
                                          )
                                        )
                                        .map((item: any) => (
                                          <MenuItem value={item.gradeRemark}>
                                            {item.gradeRemark}
                                          </MenuItem>
                                        ))}
                                    </Select>
                                  </FormControl>
                                </div>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        )
                      )}
                    </div>
                  </>
                ) : (
                  <div style={{ textAlign: "center", color: "red" }}>
                    *No Subject Result for this selected Year* *Pls select the
                    right result year*
                  </div>
                )}

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
                    required
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

                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
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
                    required
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
                    required
                    multiline
                    rows={6}
                    fullWidth
                    type="text"
                    id="remark"
                    label="Form Teacher Remark"
                    name="remark"
                    autoComplete="remark"
                    placeholder="Maximium of 50 Letter words"
                    autoFocus
                    value={Remark}
                    onChange={(e) => setRemark(e.target.value)}
                  />
                  <FormControl fullWidth>
                    <InputLabel id="demo-multiple-name-label">
                      Head Teacher Remark
                    </InputLabel>
                    <Select
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      // multiple
                      value={HmRemark}
                      onChange={(e) => setHmRemark(e.target.value)}
                    >
                      {directorsRemark
                        ?.sort((a: any, b: any) =>
                          a.gradeName.localeCompare(b.gradeName)
                        )
                        .map((item: any) => (
                          <MenuItem value={item.gradeRemark}>
                            {item?.gradeRemark.replace(/_/g, " ")}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
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
                    value={userDatas?.schoolRegNumber}
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
                      {classD?.map((item: any) => (
                        <MenuItem value={item.name}>{item.name}</MenuItem>
                      ))}
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
                        Upload Result
                      </Button>
                      <ToastContainer />
                    </div>
                  )}
                </div>
              </>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default DynamicResult;
