import React, { useState, useEffect } from "react";
import AdminLayout from "../AdminDashboard/AdminLayout";
import { schoolInfo } from "../../store/Info";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

import CircularWithValueLabel from "../../components/Loading/LoadingCircle";
import { CutOffMarkApi, getAllSchools } from "../../APiData/Api";
const AdminCreateMark = () => {
  const navigate = useNavigate();

  const [schoolName, setSchoolName] = useState(schoolInfo);

  const [name, setName] = useState("");
  const [cutOffMark, setCutOffMark] = useState("");

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
      name: name,
      cutOffMark: cutOffMark,
    };

    const headers: any = {
      "Custom-Header": "xxxx-xxxx-xxxx-xxxx",
      "Content-Type": "application/json",
      // Accept: "application/json",
      // body: JSON.stringify(data),
    };

    axios
      .post(CutOffMarkApi, data, headers)

      .then((res) => {
        console.log(res.data);
        setLoading(false);
        if (res.data) {
          setSchoolName("");
          setName("");
          setCutOffMark("");

          console.log(res.data);
          toast.success("post sucessful");
          navigate("/view-marks");
        } else {
          toast.error(res.data.error);
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Error Can't create subject C/A & Exam grade");
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
          <div className="title">Create Subject C/A & Exam grade</div>
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
                  <span className="details"> Test/Exam </span>
                  <select
                    value={name}
                    onChange={(e: any) => setName(e.target.value)}
                    required
                  >
                    <option value="">Select </option>
                    <option value="Test">C.A/Test</option>
                    <option value="Exam">Exam</option>
                  </select>
                </div>
                <div className="input-box">
                  <span className="details">Grade </span>
                  <input
                    type="text"
                    placeholder="E.g 30"
                    required
                    value={cutOffMark}
                    onChange={(e: any) => setCutOffMark(e.target.value)}
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

export default AdminCreateMark;
