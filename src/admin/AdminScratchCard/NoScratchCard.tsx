import React, { useState, useEffect } from "react";

import AdminLayout from "../AdminDashboard/AdminLayout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { schoolInfo } from "../../store/Info";
import {
  ClassApi,
  DeactivateScratchCradApi,
  UpdateStudentClassApi,
  getAllSchools,
} from "../../APiData/Api";
import CircularWithValueLabel from "../../components/Loading/LoadingCircle";
import { Checkbox, FormControl, FormControlLabel, Grid } from "@mui/material";
const NoScratchCard = () => {
  const navigate = useNavigate();

  const [deActivateSell, setDeActivateSell] = useState(false);

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
      deActivateSell: deActivateSell,
      schoolName: schoolInfo,
    };

    const headers: any = {
      "Custom-Header": "xxxx-xxxx-xxxx-xxxx",
      "Content-Type": "application/json",
      // Accept: "application/json",
      // body: JSON.stringify(data),
    };

    axios
      .post(DeactivateScratchCradApi, data, headers)

      .then((res) => {
        console.log(res.data);
        setLoading(false);
        if (res.data) {
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

  return (
    <AdminLayout>
      <div className="register-main">
        <div className="container">
          <div className="title">Deactivate ScratchCard sells</div>
          <div className="content">
            <form action="#" onSubmit={submitHandler}>
              <div className="user-details">
                <div className="input-box">
                  <FormControl fullWidth>
                    <div className="form-outline mb-4">
                      <label className="form-label">
                        Deactivate ScratchCard sells
                      </label>
                      <Checkbox
                        checked={deActivateSell}
                        onChange={(e) => setDeActivateSell(e.target.checked)}
                      ></Checkbox>
                    </div>
                  </FormControl>
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

export default NoScratchCard;
