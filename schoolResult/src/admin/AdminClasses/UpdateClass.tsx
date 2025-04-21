import React, { useState } from "react";
import AdminLayout from "../AdminDashboard/AdminLayout";
import "./AdminClass.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { schoolInfo } from "../../store/Info";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import CircularIndeterminate from "../../components/Loading/Progress";
import CircularWithValueLabel from "../../components/Loading/LoadingCircle";
import { ClassApi, UpdateClassApi, getAllSchools } from "../../APiData/Api";
const UpdateClass = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [schoolName, setSchoolName] = useState(schoolInfo);

  const [name, setName] = useState("");
  const [schools, setSchools] = useState([]);
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

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
    };

    const headers: any = {
      "Custom-Header": "xxxx-xxxx-xxxx-xxxx",
      "Content-Type": "application/json",
      // Accept: "application/json",
      // body: JSON.stringify(data),
    };

    axios
      .put(UpdateClassApi + id, data, headers)

      .then((res) => {
        console.log(res.data);
        setLoading(false);
        if (res.data) {
          setSchoolName("");
          setName("");

          console.log(res.data);
          toast.success("post sucessful");
          navigate("/view-class");
        } else {
          toast.error(res.data.error);
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Error Can't create class");
      });
  };
  React.useEffect(() => {
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
          <div className="title">Update Class</div>
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
                  <span className="details">Class Name </span>
                  <input
                    type="text"
                    placeholder="Input Name Of Class"
                    required
                    value={name}
                    onChange={(e: any) => setName(e.target.value)}
                  />
                </div>
              </div>
              {loading ? (
                <CircularWithValueLabel />
              ) : (
                <input type="submit" value="Update" />
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

export default UpdateClass;
