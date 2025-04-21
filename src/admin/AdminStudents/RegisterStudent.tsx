import React, { useState, useEffect } from "react";
import "./Register.css";
import AdminLayout from "../AdminDashboard/AdminLayout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { schoolInfo } from "../../store/Info";
import { ClassApi, RegisterStudentApi, getAllSchools } from "../../APiData/Api";
import CircularWithValueLabel from "../../components/Loading/LoadingCircle";
const RegisterStudent = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [passportPhoto, setPassportPhoto] = useState("");
  const [lastName, setLastName] = useState("");
  const [schoolName, setSchoolName] = useState(schoolInfo);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [schoolRegNumber, setSchoolRegNumber] = useState("");
  const [contactAdress, setContactAdress] = useState("");
  const [currentClass, setCurrentClass] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("Student");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [classes, setClasses] = useState([]);
  const [schools, setSchools] = useState([]);
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
  const uploadimage = async (e: any) => {
    const file = e.target.files[0];
    const base64: any = await convert2base64(file);
    setPassportPhoto(base64);
    // setImage({ ...image, image: base64 });
    console.log(base64);
    // const reader = new FileReader();
  };
  const convert2base64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  //////

  /////
  const submitHandler = (e: any) => {
    e.preventDefault();
    setLoading(true);
    const data: any = {
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      contactAdress: contactAdress,
      schoolRegNumber: schoolRegNumber,
      passportPhoto: passportPhoto,
      schoolName: schoolName,
      userType: userType,
      currentClass: currentClass,
      password: password,
      confirmPassword: confirmPassword,
    };

    const headers: any = {
      "Custom-Header": "xxxx-xxxx-xxxx-xxxx",
      "Content-Type": "application/json",
      // Accept: "application/json",
      // body: JSON.stringify(data),
    };

    axios
      .post(RegisterStudentApi, data, headers)

      .then((res) => {
        console.log(res.data);
        setLoading(false);
        if (res.data) {
          setFirstName("");
          setSchoolRegNumber("");
          setLastName("");
          setPhoneNumber("");
          setContactAdress("");
          setPassportPhoto("");
          setUserType("");
          setSchoolName("");
          setPassword("");
          setConfirmPassword("");
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
          <div className="title">Registration</div>
          <div className="content">
            <form action="#" onSubmit={submitHandler}>
              <div className="user-details">
                <div className="input-box">
                  <span className="details">First Name</span>
                  <input
                    type="text"
                    placeholder="Enter your first name"
                    required
                    value={firstName}
                    onChange={(e: any) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="input-box">
                  <span className="details">Other Names</span>
                  <input
                    type="text"
                    placeholder="Enter your other names"
                    required
                    value={lastName}
                    onChange={(e: any) => setLastName(e.target.value)}
                  />
                </div>
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

                <div className="input-box">
                  <span className="details">
                    <span style={{ color: "green", marginRight: "10px" }}>
                      *Optional*
                    </span>
                    SChool Reg Number
                  </span>

                  <input
                    type="text"
                    placeholder="Enter your school reg number"
                    value={schoolRegNumber}
                    onChange={(e: any) => setSchoolRegNumber(e.target.value)}
                  />
                </div>
                <div className="input-box">
                  <span className="details">Phone Number</span>
                  <input
                    type="text"
                    placeholder="Enter your number"
                    required
                    value={phoneNumber}
                    onChange={(e: any) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div className="input-box">
                  <span className="details">Contact Address</span>
                  <input
                    type="text"
                    placeholder="Enter Student Address"
                    required
                    value={contactAdress}
                    onChange={(e: any) => setContactAdress(e.target.value)}
                  />
                </div>

                <div className="input-box">
                  <span className="details">Passport</span>
                  <input type="file" required onChange={uploadimage} />
                </div>
              </div>
              {loading ? (
                <CircularWithValueLabel />
              ) : (
                <div className="button">
                  <input type="submit" value="Register" />
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

export default RegisterStudent;
