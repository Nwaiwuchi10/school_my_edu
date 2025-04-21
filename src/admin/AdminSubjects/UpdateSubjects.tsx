import React, { useState, useEffect } from "react";
import AdminLayout from "../AdminDashboard/AdminLayout";
import { schoolInfo } from "../../store/Info";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import CircularIndeterminate from "../../components/Loading/Progress";
import CircularWithValueLabel from "../../components/Loading/LoadingCircle";
import {
  ClassApi,
  SubjectsApi,
  UpdateSubjectsApi,
  getAllSchools,
} from "../../APiData/Api";
const UpdateSubjects = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [schoolName, setSchoolName] = useState(schoolInfo);

  const [name, setName] = useState("");
  const [classes, setClasses] = useState("");
  const [classD, setClassD] = useState([]);
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
      classes: classes,
    };

    const headers: any = {
      "Custom-Header": "xxxx-xxxx-xxxx-xxxx",
      "Content-Type": "application/json",
      // Accept: "application/json",
      // body: JSON.stringify(data),
    };

    axios
      .put(UpdateSubjectsApi + id, data, headers)

      .then((res) => {
        console.log(res.data);
        setLoading(false);
        if (res.data) {
          setSchoolName("");
          setName("");
          setClasses("");
          console.log(res.data);
          toast.success("post sucessful");
          navigate("/view-subjects");
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
  useEffect(() => {
    // Fetch classes when selectedSchoolId changes
    if (schoolInfo) {
      axios
        .get(ClassApi)
        .then((response) => {
          setClassD(
            response.data.filter(
              (item: any) => item.schoolName._id === schoolInfo
            )
          );
        })
        .catch((error) => {
          console.error("Error fetching classes:", error);
        });
    }
  }, [schoolInfo]);
  return (
    <AdminLayout>
      <div className="register-main">
        <div className="container">
          <div className="title">Update/Edith Subject</div>
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
                  <span className="details">Class</span>
                  <select
                    required
                    onChange={(e: any) => setClasses(e.target.value)}
                    value={classes}
                  >
                    <option>Select Class</option>
                    {classD
                      .sort((a: any, b: any) => a.name.localeCompare(b.name))
                      .map((classy: any) => (
                        <option key={classy._id} value={classy._id}>
                          {" "}
                          {classy.name.replace(/_/g, " ")}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="input-box">
                  <span className="details">Subject Name</span>
                  <input
                    type="text"
                    placeholder="Enter your other names"
                    required
                    value={name}
                    onChange={(e: any) => setName(e.target.value)}
                  />
                </div>
              </div>

              {loading ? (
                <CircularWithValueLabel />
              ) : (
                <div>
                  <input type="submit" value="Update" />
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

export default UpdateSubjects;
