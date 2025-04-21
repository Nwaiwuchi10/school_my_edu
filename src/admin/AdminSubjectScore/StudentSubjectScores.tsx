import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent, selectClasses } from "@mui/material/Select";
import { Dropdown } from "react-bootstrap";
import "./subjectscore.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { TextField, Button } from "@mui/material";
import {
  GradeApi,
  SubjectMarksApi,
  SubjectsApi,
  UserApi,
} from "../../APiData/Api";
import CircularIndeterminate from "../../components/Loading/Progress";
import AdminLayout from "../AdminDashboard/AdminLayout";

const StudentSubjectScores = () => {
  const navigate = useNavigate();
  const { id, selectedSchool, selectedClass } = useParams();

  const [user, setUser] = useState(id);
  console.log(id);
  const [subjectName, setSubjectName] = useState("");
  const [term, setTerm] = useState("");
  const [year, setYear] = useState("");
  const [schoolName, setSchoolName] = useState(selectedSchool);
  const [classes, setClasses] = useState(selectedClass);
  const [subjectlist, setSubjectlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userDatas, setUserDatas] = useState<any | null>(null);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedgrades, setSelectedGrades] = useState("");
  const [selectedremarks, setSelectedRemarks] = useState("");
  const [grades, setGrades] = useState([]);

  const handleLoader = () => {
    setLoading(true);
  };
  const [subjectsData, setSubjectsData] = useState({
    subjectName: "",
    test: 0,
    exam: 0,
    totalScore: 0,
    grade: "",
    remark: "",
  });

  const handleInputChange = (
    subject: "subjectsData",

    type: "subjectName" | "test" | "exam" | "grade" | "remark",
    value: number
  ) => {
    switch (subject) {
      case "subjectsData":
        setSubjectsData((prev: any) => ({ ...prev, [type]: value }));

        break;
    }
  };

  const calculateSubjectsDataTotal = () => {
    const totalScore = subjectsData.test + subjectsData.exam;
    let grade = "";
    let remark = "";
    if (subjectsData.totalScore >= 70 && subjectsData.totalScore <= 100) {
      grade = "A";
      remark = "Excellent";
    } else if (subjectsData.totalScore >= 60 && subjectsData.totalScore <= 69) {
      grade = "B";
      remark = "Very Good";
    } else if (subjectsData.totalScore >= 50 && subjectsData.totalScore <= 59) {
      grade = "C";
      remark = "Good";
    } else if (subjectsData.totalScore >= 40 && subjectsData.totalScore <= 49) {
      grade = "D";
      remark = "Pass";
    } else if (subjectsData.totalScore >= 0 && subjectsData.totalScore <= 39) {
      grade = "F";
      remark = "Fail";
    }
    setSubjectsData({ ...subjectsData, totalScore, grade, remark });
  };

  React.useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await axios.get(UserApi + id);
      console.log(data);

      setUserDatas(data);
    };

    fetchPosts();
  }, [id]);
  React.useEffect(() => {
    calculateSubjectsDataTotal();
    const totalScore = subjectsData.test + subjectsData.exam;
    setSubjectsData({ ...subjectsData, totalScore });
  }, [calculateSubjectsDataTotal, setSubjectsData]);

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

  React.useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await axios.get(SubjectsApi);
      console.log(data);

      setSubjectlist(
        data.filter(
          (item: any) =>
            item?.schoolName?._id === selectedSchool &&
            item?.classes?._id === selectedClass
        )
      );
    };

    fetchPosts();
  }, []);
  const submitHandler = (e: any) => {
    e.preventDefault();
    setLoading(true);
    const data: any = {
      user: user,
      classes: classes,
      year: year,
      subjectName: subjectName === selectedSubject,
      schoolName: schoolName,
      term: term,

      subjects: [
        // ...English,
        {
          subjectName: selectedSubject,
          test: subjectsData.test || "",
          exam: subjectsData.exam || "",
          totalScore: subjectsData.totalScore,
          grade: selectedgrades,
          remark: selectedremarks,
        },
      ],
    };

    const headers: any = {
      "Custom-Header": "xxxx-xxxx-xxxx-xxxx",
      "Content-Type": "application/json",
      // Accept: "application/json",
      // body: JSON.stringify(data),
    };

    axios
      .post(SubjectMarksApi, data, headers)

      .then((res) => {
        console.log(res.data);
        setLoading(false);
        if (res.data) {
          setUser("");
          setTerm(" ");
          setYear(" ");
          setSubjectName("");
          setSchoolName("");
          setClasses(" ");

          console.log(res.data);
          toast.success("post sucessful");
          navigate("/view-selected-subject-marks");
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
    <>
      <AdminLayout>
        <div className="register-main">
          <div className="container">
            <div className="item-center">
              {" "}
              <div className="titler">Student Subject Score</div>
            </div>

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
                Input Subject Score of
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

              <form onSubmit={submitHandler}>
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
                  <FormControl fullWidth>
                    <InputLabel id="demo-multiple-name-label">
                      Subject
                    </InputLabel>
                    <Select
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      // multiple

                      required
                      value={selectedSubject}
                      onChange={(e: any) => setSelectedSubject(e.target.value)}
                    >
                      <MenuItem>Select subject</MenuItem>
                      {subjectlist
                        ?.sort((a: any, b: any) => a.name.localeCompare(b.name))
                        .map((item: any) => (
                          <MenuItem value={item?.name} key={item?._id}>
                            {item?.name.replace(/_/g, " ")}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                  {selectedSubject && (
                    <div>
                      <TextField
                        className="mt-2 mb-2"
                        fullWidth
                        rows={4}
                        id="outlined-required"
                        label="Test"
                        name="Test"
                        type="text"
                        value={subjectsData.test || ""}
                        onChange={(e) =>
                          handleInputChange(
                            "subjectsData",
                            "test",
                            +e.target.value
                          )
                        }
                        onBlur={calculateSubjectsDataTotal}
                      />

                      <TextField
                        fullWidth
                        className="mt-2 mb-2"
                        rows={4}
                        id="outlined-required"
                        label="Exam"
                        name="exam"
                        type="number"
                        value={subjectsData.exam || ""}
                        onBlur={calculateSubjectsDataTotal}
                        onChange={(e) =>
                          handleInputChange(
                            "subjectsData",
                            "exam",
                            +e.target.value
                          )
                        }
                      />
                      <Button
                        variant="contained"
                        className="mt-4"
                        onClick={calculateSubjectsDataTotal}
                      >
                        Click To Generate TotalScore
                      </Button>
                      <TextField
                        className="mt-2 mb-2"
                        fullWidth
                        required
                        rows={4}
                        id="outlined-required"
                        label="Total Score"
                        type="number"
                        name="totalScore"
                        value={subjectsData.totalScore}
                      />

                      <FormControl fullWidth className="mt-2 mb-2">
                        <InputLabel id="demo-multiple-name-label">
                          Grade
                        </InputLabel>
                        <Select
                          labelId="demo-multiple-name-label"
                          id="demo-multiple-name"
                          // multiple
                          value={selectedgrades}
                          onChange={(e: any) =>
                            setSelectedGrades(e.target.value)
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

                      <FormControl fullWidth className="mt-2 mb-2">
                        <InputLabel id="demo-multiple-name-label">
                          Remark
                        </InputLabel>
                        <Select
                          labelId="demo-multiple-name-label"
                          id="demo-multiple-name"
                          // multiple
                          value={selectedremarks}
                          onChange={(e: any) =>
                            setSelectedRemarks(e.target.value)
                          }
                          // input={<OutlinedInput label="Name" />}
                        >
                          {grades
                            ?.sort((a: any, b: any) =>
                              a.gradeRemark.localeCompare(b.gradeRemark)
                            )
                            .map((item: any) => (
                              <MenuItem value={item.gradeRemark}>
                                {item.gradeRemark}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </div>
                  )}
                  <FormControl fullWidth className="mt-2 mb-2">
                    <InputLabel id="demo-multiple-name-label">Term</InputLabel>
                    <Select
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      // multiple
                      required
                      value={term}
                      onChange={(e) => setTerm(e.target.value)}
                    >
                      <MenuItem value="1st Term">1st Term</MenuItem>
                      <MenuItem value="2nd Term">2nd Term</MenuItem>
                      <MenuItem value="3rd Term">3rd Term</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth className="mt-2 mb-2">
                    <InputLabel id="demo-multiple-name-label">
                      {" "}
                      Academic Year
                    </InputLabel>
                    <Select
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      // multiple
                      fullWidth
                      required
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      // input={<OutlinedInput label="Name" />}
                    >
                      {/* <MenuItem value="2023/2024">2023/2024</MenuItem> */}
                      <MenuItem value="2024/2025">2024/2025</MenuItem>
                      {/* <MenuItem value="2025/2026">2025/2026</MenuItem>
                      <MenuItem value="2026/2027">2026/2027</MenuItem>
                      <MenuItem value="2027/2028">2027/2028</MenuItem>
                      <MenuItem value="2028/2029">2028/2029</MenuItem>
                      <MenuItem value="2029/2030">2029/2030</MenuItem>
                      <MenuItem value="2030/2031">2030/2031</MenuItem> */}
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
                        Upload Score
                      </Button>
                      <ToastContainer />
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default StudentSubjectScores;
