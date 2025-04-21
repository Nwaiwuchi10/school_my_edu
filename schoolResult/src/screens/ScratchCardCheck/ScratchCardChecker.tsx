import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Theme, useTheme } from "@mui/material/styles";

import MenuItem from "@mui/material/MenuItem";

import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Button } from "@material-ui/core";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  IconButton,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  FormLabel,
  Grid,
} from "@mui/material";
import CircularIndeterminate from "../../components/Loading/Progress";

import TopNavBar from "../../components/TopNavBar/TopNavBar";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import {
  ScratchCardLoginApi,
  UserApi,
  scratchCardUsageApi,
} from "../../APiData/Api";

const ScratchCardChecker: React.FC = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const theme = useTheme();
  // State to store the selected option
  // const [user, setUser] = useState(userId);
  const [serialNumber, setSerialNumber] = useState("");
  const [pin, setPin] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [usageCount, setUsageCount] = useState<any>(0);
  const [showPassword, setShowPassword] = React.useState(false);
  // State to store the API response
  const [apiData, setApiData] = useState(null);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const [userData, setUserData] = React.useState<any>({});

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await axios.get(UserApi + userId);
      console.log(data);
      // const foundData = data.find((item) => item.artist === artist);
      setUserData(data);
    };

    fetchPosts();
  }, [userId]);
  // useEffect(() => {
  //   if (!userData?.password) {
  //     navigate("/update-user-profile");
  //   } else if (userData?.password) {
  //     navigate("/online-result");
  //   }
  // }, []);
  useEffect(() => {
    if (userId) {
      navigate("/online-result");
    } else {
      navigate("/login");
    }
  }, [userId]);
  //   const DisplayData = apiData;
  // Function to handle the select input change

  // Function to make the API GET request
  const submitHandler = (e: any) => {
    e.preventDefault();
    setLoading(true);
    handleUsageCount();
    const data: any = {
      schoolName: userData?.schoolName?._id,
      serialNumber: serialNumber,
      pin: pin,
    };

    const headers: any = {
      "Custom-Header": "xxxx-xxxx-xxxx-xxxx",
      "Content-Type": "application/json",
      // Accept: "application/json",
      // body: JSON.stringify(data),
    };

    axios
      .post(ScratchCardLoginApi, data, headers)

      .then((res) => {
        console.log(res.data);
        setLoading(false);

        if (res.data) {
          setSerialNumber("");
          setPin("");

          localStorage.setItem("ScratchCardId", res.data._id);

          console.log(res.data);
          toast.success("post sucessful");
          navigate("/check-result");
        } else {
          toast.error(res.data.error);
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error(
          "Invalid Scratch Card Details or Exceeded Card 3 times limit"
        );
      });
  };

  const handleUsageCount = async () => {
    const data: any = {
      usageCount: usageCount,
    };
    await axios
      .put(scratchCardUsageApi + pin, data)
      .then((response: any) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
    setUsageCount("");
  };
  return (
    <>
      <TopNavBar />
      <Header />
      <div>
        <div className="check-result-flex-div">
          <div className="check-result-col-div">
            <div className="guideline-div">
              <h3 className="tip-h3">Tips</h3>
              <ul className="ul-list-style">
                <li>
                  Obtain your Registration Code from your schools / Director
                </li>
                <li>
                  Obtain a scratch card from your school or a verified vendor
                </li>
                <li>
                  Scratch off the covered / sealed area to reveal the card pin
                </li>
                <li>
                  Enter the Pin and Serial number and other details required
                </li>
                <li>
                  Click on the » Check result button (located at the bottom)
                </li>
              </ul>
            </div>
          </div>
          <div className="select-check-div">
            <div>
              <h2>Result Checker</h2>
              <form onSubmit={submitHandler}>
                {/* <div className="form-control-div"> */}
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControl
                      sx={{ m: 1, width: 300 }}
                      // fullWidth
                      // sx={{ m: 1 }}
                      variant="outlined"
                      // className="input-label-input-divs"
                    >
                      <InputLabel htmlFor="outlined-adornment-password">
                        Scratch Card Serial Number
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? "text" : "password"}
                        value={serialNumber}
                        onChange={(e) => setSerialNumber(e.target.value)}
                        fullWidth
                        required
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Scratch Card Password"
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl
                      sx={{ m: 1, width: 300 }}
                      // fullWidth
                      // sx={{ m: 1 }}
                      variant="outlined"
                      // className="input-label-input-divs"
                    >
                      <InputLabel htmlFor="outlined-adornment-password">
                        Scratch Card Pin
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? "text" : "password"}
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        fullWidth
                        required
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Ppin"
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                {/* </div> */}

                {loading ? (
                  <CircularIndeterminate />
                ) : (
                  <div>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      style={{
                        color: "white",
                        backgroundColor: "green",
                        border: "greenyellow",
                        width: "45%",
                        marginTop: "25px",
                      }}
                      className="proceed-btn"
                    >
                      Proceed
                    </Button>
                    <ToastContainer />
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />{" "}
    </>
  );
};

export default ScratchCardChecker;
