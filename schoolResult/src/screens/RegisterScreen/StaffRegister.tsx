import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import {
  IconButton,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  FormLabel,
  Select,
  MenuItem,
} from "@mui/material";
import CircularIndeterminate from "../../components/Loading/Progress";
import TopNavBar from "../../components/TopNavBar/TopNavBar";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import {
  RegisterStaffApi,
  RegisterStudentApi,
  getAllSchools,
} from "../../APiData/Api";

function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Built with love by the "}
      <Link color="inherit" href="https://material-ui.com/">
        Material-UI
      </Link>
      {" team."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: "white",
    borderColor: "greenyellow",
    backgroundColor: "green",
  },
}));
type Props = {
  //   roles: String;
};
const StaffRegister: React.FC<Props> = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [passportPhoto, setPassportPhoto] = useState("");
  const [lastName, setLastName] = useState("");
  const [schoolName, setSchoolName] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [userType, setUserType] = useState("staff");
  const [schoolRegNumber, setSchoolRegNumber] = useState("null");
  const [contactAdress, setContAdress] = useState("");
  const [password, setPassword] = useState("");
  const [schools, setSchools] = useState([]);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await axios.get(getAllSchools);
        const schoolData = response.data.map((school: any) => ({
          name: school.name,
          id: school._id,
        }));
        setSchools(schoolData);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchSchools();
  }, []);
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
      userType: userType,
      schoolRegNumber: schoolRegNumber,
      passportPhoto: passportPhoto,
      schoolName: schoolName,
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
      .post(
        RegisterStaffApi,
        // RegisterStudentApi,
        data,
        headers
      )

      .then((res) => {
        console.log(res.data);
        setLoading(false);
        if (res.data) {
          setFirstName("");
          setUserType("");
          setLastName("");
          setPhoneNumber("");
          setContAdress("");
          setSchoolName("");
          setSchoolRegNumber("");
          setPassportPhoto("");

          setPassword("");
          setConfirmPassword("");

          localStorage.setItem("userId", res.data._id);
          localStorage.setItem("roles", res.data.roles);

          localStorage.setItem("isAdmin", res.data.isAdmin);
          console.log(res.data);
          toast.success("post sucessful");
          navigate("/");
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
  return (
    <>
      <TopNavBar /> <Header />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} onSubmit={submitHandler}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  sx={{ m: 1, width: 320 }}
                  //   className="input-label-input-divs"
                >
                  <InputLabel id="demo-multiple-name-label">
                    School Name
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    // multiple

                    value={schoolName || ""}
                    onChange={(e: any) => setSchoolName(e.target.value)}

                    // input={<OutlinedInput label="Name" />}
                    // MenuProps={MenuProps}
                  >
                    <MenuItem value="">Select your School</MenuItem>
                    {schools
                      .sort((a: any, b: any) => a.name.localeCompare(b.name))
                      .map((school: any, index: any) => (
                        <MenuItem key={school._id} value={school.id}>
                          {" "}
                          {school.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="phoneNumber"
                  label="Contact Phone Number"
                  name="phoneNumber"
                  autoComplete="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="contact address"
                  label="Contact Adress"
                  name="contact adress"
                  autoComplete="contact adress"
                  value={contactAdress}
                  onChange={(e) => setContAdress(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <FormLabel className="mb-2">*Passport Photograph*</FormLabel>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="passport"
                  // label="Passport Photo"
                  id="passport"
                  autoComplete="passportPhoto"
                  // type={showPassword ? "text" : "password"}
                  // value={passportPhoto}
                  type="file"
                  // accept="image/*"
                  // accept=".jpeg, .png, .jpg, "
                  onChange={uploadimage}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value="allowExtraEmails"
                      color="primary"
                      required
                    />
                  }
                  label="I am pledging that all the informations i entered is correct."
                />
              </Grid>
            </Grid>

            {loading ? (
              <CircularIndeterminate />
            ) : (
              <div>
                <Button
                  type="submit"
                  onSubmit={handleLoader}
                  fullWidth
                  variant="contained"
                  // color="primary"
                  className={classes.submit}
                >
                  Sign Up
                </Button>
                <ToastContainer />
              </div>
            )}
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/staff-login" variant="body2">
                  Are you a staff? Sign In Here!
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
      <Footer />{" "}
    </>
  );
};
export default StaffRegister;
