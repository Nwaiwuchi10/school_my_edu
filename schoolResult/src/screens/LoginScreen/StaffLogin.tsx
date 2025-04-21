import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import imgLogin from "../../assets/images/build.jpeg";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import CircularIndeterminate from "../../components/Loading/Progress";
import TopNavBar from "../../components/TopNavBar/TopNavBar";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { StaffLoginApi } from "../../APiData/Api";
import imger from "../../assets/images/student3.png";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    marginBottom: "50px",
    marginTop: "5px",
  },
  image: {
    marginTop: "50px",
    backgroundImage: `url(${imger})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    color: "white",
    margin: theme.spacing(3, 0, 2),
    borderColor: "greenyellow",
    backgroundColor: "green",
  },
}));

const StaffLogin = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [phoneNumber, setPhoneNumber] = useState("");

  const [password, setPassword] = useState("");

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
      phoneNumber: phoneNumber,
      password: password,
    };

    const headers: any = {
      "Custom-Header": "xxxx-xxxx-xxxx-xxxx",
      "Content-Type": "application/json",
      // Accept: "application/json",
      // body: JSON.stringify(data),
    };

    axios
      .post(StaffLoginApi, data, headers)

      .then((res) => {
        console.log(res.data);
        setLoading(false);
        if (res.data) {
          setPhoneNumber("");
          setPassword("");

          localStorage.setItem("userId", res.data._id);
          localStorage.setItem("roles", res.data.roles);

          localStorage.setItem("isAdmin", res.data.isAdmin);
          console.log(res.data);
          toast.success("post sucessful");
          {
            // res.data.isAdmin == true
            //   ? navigate("/admin")
            res.data.userType == "staff"
              ? navigate("/admin")
              : navigate("/admin");
          }
        } else {
          toast.error(res.data.error);
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Invalid User credentails");
      });
  };
  return (
    <>
      <TopNavBar />
      <Header />
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} noValidate onSubmit={submitHandler}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="phoneNumber"
                label="Phone Number"
                name="phoneNumber"
                autoComplete="phoneNumber"
                autoFocus
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              {loading ? (
                <CircularIndeterminate />
              ) : (
                <div>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    // color="primary"
                    className={classes.submit}
                  >
                    Sign In
                  </Button>
                  <ToastContainer />
                </div>
              )}

              <Grid container>
                <Grid item>
                  <Link href="/staff-register" variant="body2">
                    {"Register New Staff"}
                  </Link>
                </Grid>
                {/* <Grid item>
                  <Link href="/update-user-profile" variant="body2">
                    {"Generate your Login Password Here"}
                  </Link>
                </Grid> */}
              </Grid>
            </form>
          </div>
        </Grid>
      </Grid>
      <Footer />{" "}
    </>
  );
};

export default StaffLogin;
