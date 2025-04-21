import React, { useState, useEffect } from "react";
import AdminLayout from "../AdminDashboard/AdminLayout";
import { schoolInfo } from "../../store/Info";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import CircularIndeterminate from "../../components/Loading/Progress";
import CircularWithValueLabel from "../../components/Loading/LoadingCircle";
import {
  ClassApi,
  GradeApi,
  SubjectsApi,
  getAllSchools,
} from "../../APiData/Api";
const AdminCreateGrade = () => {
  const navigate = useNavigate();

  const [schoolName, setSchoolName] = useState(schoolInfo);

  const [gradeName, setGradeName] = useState("");
  const [gradeRange, setGradeRange] = useState("");
  const [gradeRemark, setGradeRemark] = useState("");
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleLoader = () => {
    setLoading(true);

    // Perform any other actions that need to be done when the button is clicked
  };

  //////

  /////
  const submitHandler = (e: any) => {
    e.preventDefault();
    setLoading(true);
    const data: any = {
      schoolName: schoolName,
      gradeName: gradeName,
      gradeRemark: gradeRemark,
      gradeRange: gradeRange,
    };

    const headers: any = {
      "Custom-Header": "xxxx-xxxx-xxxx-xxxx",
      "Content-Type": "application/json",
      // Accept: "application/json",
      // body: JSON.stringify(data),
    };

    axios
      .post(GradeApi, data, headers)

      .then((res) => {
        console.log(res.data);
        setLoading(false);
        if (res.data) {
          setSchoolName("");
          setGradeName("");
          setGradeRange("");
          setGradeRemark("");
          console.log(res.data);
          toast.success("post sucessful");
          navigate("/view-grade");
        } else {
          toast.error(res.data.error);
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Error Can't create subject");
      });
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

  return (
    <AdminLayout>
      <div className="register-main">
        <div className="container">
          <div className="title">Create Result Grades</div>
          <div className="content">
            <form action="#" onSubmit={submitHandler}>
              <div className="user-details">
                <div className="input-box">
                  <span className="details">School Name</span>
                  <select required>
                    {schools
                      .sort((a: any, b: any) => a.name.localeCompare(b.name))
                      .map((classy: any) => (
                        <option key={classy._id}>
                          {" "}
                          {classy.name.replace(/_/g, " ")}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="input-box">
                  <span className="details">Grade Name</span>
                  <input
                    type="text"
                    placeholder="E.g A"
                    required
                    value={gradeName}
                    onChange={(e: any) => setGradeName(e.target.value)}
                  />
                </div>
                <div className="input-box">
                  <span className="details">Grade Range</span>
                  <input
                    type="text"
                    placeholder="E.g 70% - 100%"
                    required
                    value={gradeRange}
                    onChange={(e: any) => setGradeRange(e.target.value)}
                  />
                </div>
                <div className="input-box">
                  <span className="details">Grade Remark</span>
                  <input
                    type="text"
                    placeholder="E.g Excellent"
                    required
                    value={gradeRemark}
                    onChange={(e: any) => setGradeRemark(e.target.value)}
                  />
                </div>
              </div>

              {loading ? (
                <CircularWithValueLabel />
              ) : (
                <div>
                  <input type="submit" value="Post" />
                  <ToastContainer />
                </div>
              )}
            </form>
            {/* <div className="sign-txt">
            Not yet member? <a href="#">Signup now</a>
          </div> */}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminCreateGrade;
