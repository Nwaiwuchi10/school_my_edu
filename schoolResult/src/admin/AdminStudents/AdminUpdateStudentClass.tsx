import React, { useState, useEffect } from "react";
import "./Register.css";
import AdminLayout from "../AdminDashboard/AdminLayout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { schoolInfo } from "../../store/Info";
import {
  ClassApi,
  UpdateStudentClassApi,
  getAllSchools,
} from "../../APiData/Api";
import CircularWithValueLabel from "../../components/Loading/LoadingCircle";
const AdminUpdateStudentClass = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [currentClass, setCurrentClass] = useState("");

  const [classes, setClasses] = useState([]);
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
      currentClass: currentClass,
    };

    const headers: any = {
      "Custom-Header": "xxxx-xxxx-xxxx-xxxx",
      "Content-Type": "application/json",
      // Accept: "application/json",
      // body: JSON.stringify(data),
    };

    axios
      .put(UpdateStudentClassApi + id, data, headers)

      .then((res) => {
        console.log(res.data);
        setLoading(false);
        if (res.data) {
          setCurrentClass("");

          console.log(res.data);
          toast.success("post sucessful");
          navigate("/admin");
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
          setClasses(
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
          <div className="title">Update Student Current Class</div>
          <div className="content">
            <form action="#" onSubmit={submitHandler}>
              <div className="user-details">
                <div className="input-box">
                  <span className="details">Class</span>
                  <select
                    required
                    onChange={(e: any) => setCurrentClass(e.target.value)}
                    value={currentClass}
                  >
                    <option>Select Student Class</option>
                    {classes
                      .sort((a: any, b: any) => a.name.localeCompare(b.name))
                      .map((classy: any) => (
                        <option key={classy._id} value={classy._id}>
                          {" "}
                          {classy.name.replace(/_/g, " ")}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              {loading ? (
                <CircularWithValueLabel />
              ) : (
                <div className="button">
                  <input type="submit" value="Update" />
                  <ToastContainer />
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminUpdateStudentClass;
