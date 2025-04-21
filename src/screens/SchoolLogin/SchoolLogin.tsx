import React, { useState } from "react";

// import { makeStyles } from "@mui/material";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Button,
  Checkbox,
  CssBaseline,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Link, useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import CircularIndeterminate from "../../components/Loading/Progress";
import TopNavBar from "../../components/TopNavBar/TopNavBar";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { LoginSchool } from "../../APiData/Api";
import imger from "../../assets/images/student3.png";
import emailValidator from "email-validator";
const useStyles = makeStyles((theme: any) => ({
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

const SchoolLogin = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [schoolRegCode, setSchoolRegCode] = useState("");
  const [isValid, setIsValid] = useState<boolean>(true);
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setEmail(email);
    setIsValid(emailValidator.validate(email));
  };
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
    if (isValid) {
      // Proceed with the login
      console.log("Email is valid, proceed with login:", email);

      const data: any = {
        email: email,
        schoolRegCode: schoolRegCode,
      };

      const headers: any = {
        "Custom-Header": "xxxx-xxxx-xxxx-xxxx",
        "Content-Type": "application/json",
        // Accept: "application/json",
        // body: JSON.stringify(data),
      };

      axios
        .post(LoginSchool, data, headers)

        .then((res) => {
          console.log(res.data);
          setLoading(false);
          if (res.data) {
            setEmail("");
            setSchoolRegCode("");

            localStorage.setItem("schoolId", res.data._id);
            localStorage.setItem("SchoolName", res.data.name);

            localStorage.setItem("schoolType", res.data.schoolType);
            console.log(res.data);
            toast.success("post sucessful");
            //   {
            //     res.data.isAdmin == true
            //       ? navigate("/admin-layout")
            //       : res.data.roles == "Form-Teacher"
            //       ? navigate("/admin-layout")
            //       : navigate("/");
            //   }
            navigate("/admin");
          } else {
            toast.error(res.data.error);
          }
        })
        .catch((err) => {
          setLoading(false);
          // setError(err.res.data.error);
          toast.error("Invalid User credentails");
        });
    } else {
      console.log("Email is not valid");
    }
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
              Sign in School Account
            </Typography>
            <form className={classes.form} noValidate onSubmit={submitHandler}>
              {!isValid && (
                <p style={{ color: "red" }}>
                  This email address is not existing
                </p>
              )}
              <TextField
                variant="outlined"
                margin="normal"
                type="email"
                required
                fullWidth
                id="schoolRegNumber"
                label="Email"
                name="schoolRegNumber"
                autoComplete="schoolRegNumber"
                autoFocus
                value={email}
                onChange={handleEmailChange}
              />
              <FormControl
                variant="outlined"
                fullWidth
                style={{ paddingTop: "5px" }}
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  myeduresult School Reg Code
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  value={schoolRegCode}
                  onChange={(e) => setSchoolRegCode(e.target.value)}
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
                label="Remember to check your email to obtain your School Reg Code"
              />
              {error && (
                <p style={{ color: "red", textAlign: "center" }}>{error}</p>
              )}
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

              <div>
                {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
                <div className="mt-4">
                  <Link to="/reset-regCode">
                    {"Forgotten School Reg Code?. Reset Here!"}
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <Link to="/RegisterSchool" style={{ color: "green" }}>
                  {"New School?. Register Here."}
                </Link>
              </div>
              {/* <Box mt={5}>
              <MadeWithLove />
            </Box> */}
            </form>
          </div>
        </Grid>
      </Grid>
      <Footer />{" "}
    </>
  );
};

export default SchoolLogin;
