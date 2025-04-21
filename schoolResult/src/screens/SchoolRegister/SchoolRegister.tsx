import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import Select from "react-select";
import { FlagIcon } from "react-flag-icon-css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { makeStyles } from "@material-ui/core/styles";
import {
  IconButton,
  OutlinedInput,
  FormLabel,
  Container,
  CssBaseline,
  Avatar,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  FormControl,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

import {
  ProductMarketerApi,
  RegisterSchool,
  countryApi,
} from "../../APiData/Api";
import CircularIndeterminate from "../../components/Loading/Progress";
import TopNavBar from "../../components/TopNavBar/TopNavBar";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import emailValidator from "email-validator";
// import {LockOutlinedIcon} from "@material-ui/icons";

const useStyles = makeStyles((theme: any) => ({
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
const countries = [
  { value: "US", label: "United States" },
  { value: "CA", label: "Canada" },
  // Add more countries as needed
];
type Props = {
  //   roles: String;
};
interface Country {
  name: string;
  flag: string;
}
const SchoolRegister = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [countries, setCountries] = useState<Country[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [schoolLogo, setSchoolLogo] = useState("");
  const [productMarketer, setProductMarketer] = useState("");
  const [productMarketers, setProductMarketers] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [schoolType, setSchoolType] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [notification, setNotification] = useState(
    "Please Contact the admin of the website to obtain your myeduresult School Reg Code"
  );
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState<boolean>(true);
  const handleLoader = () => {
    setLoading(true);

    // Perform any other actions that need to be done when the button is clicked
  };
  const uploadimage = async (e: any) => {
    const file = e.target.files[0];
    const base64: any = await convert2base64(file);
    setSchoolLogo(base64);
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
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setEmail(email);
    setIsValid(emailValidator.validate(email));
  };
  const submitHandler = (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (isValid) {
      // Proceed with the login
      console.log("Email is valid, proceed with login:", email);

      const data: any = {
        name: name,

        email: email,
        schoolLogo: schoolLogo,
        productMarketer: productMarketer,
        schoolType: schoolType,
        address: address,
        phoneNumber: phoneNumber,
        postalCode: postalCode,
        city: city,
        country: country,
        state: state,
      };

      const headers: any = {
        "Custom-Header": "xxxx-xxxx-xxxx-xxxx",
        "Content-Type": "application/json",
        // Accept: "application/json",
        // body: JSON.stringify(data),
      };

      axios
        .post(RegisterSchool, data, headers)

        .then((res) => {
          console.log(res.data);
          setLoading(false);
          if (res.data) {
            setName("");
            setSchoolType("");
            setEmail("");
            setPhoneNumber("");
            setAddress("");

            setPostalCode("");
            setState("");
            setSchoolLogo("");
            setNotification("");
            setCity("");
            setCountry("");

            // localStorage.setItem("userId", res.data._id);
            // localStorage.setItem("roles", res.data.roles);

            // localStorage.setItem("isAdmin", res.data.isAdmin);
            console.log(res.data);
            // toast.success("post sucessful");
            navigate("/School-login");
          } else {
            toast.error(res.data.error);
          }
        })
        .catch((err) => {
          setError(err.res.data.error);
          setLoading(false);
          toast.error(
            "Failed to create a post, check your network connection or input the correct textfields"
          );
        });
    } else {
      console.log("Email is not valid");
    }
  };
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(countryApi);
        const countriesData: Country[] = response.data.map((country: any) => ({
          name: country.name.common,
          flag: country.flags.png,
        }));
        setCountries(countriesData);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);
  useEffect(() => {
    const fetchproductMarketer = async () => {
      try {
        const response = await axios.get(ProductMarketerApi);
        const countriesData = response.data;
        setProductMarketers(countriesData);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchproductMarketer();
  }, []);
  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCountry(event.target.value);
  };
  return (
    <>
      <TopNavBar />
      <Header />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            School Registeration
          </Typography>
          <form className={classes.form} onSubmit={submitHandler}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="Name of school"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  value={name}
                  onChange={(e: any) => setName(e.target.value)}
                  label="Name of school"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Email Address"
                  name="lastName"
                  autoComplete="lname"
                  value={email}
                  onChange={handleEmailChange}
                />
              </Grid>
              {!isValid && (
                <span style={{ color: "red" }}>
                  This email address is not existing
                </span>
              )}
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-multiple-name-label">
                    School Type
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    // multiple

                    value={schoolType}
                    onChange={(e: any) => setSchoolType(e.target.value)}

                    // input={<OutlinedInput label="Name" />}
                    // MenuProps={MenuProps}
                  >
                    <MenuItem value="Primary"> Primary School</MenuItem>
                    <MenuItem value="Secondary"> Secondary School</MenuItem>
                    <MenuItem value="Primary & Secondary">
                      {" "}
                      Primary & Secondary School
                    </MenuItem>
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
                  onChange={(e: any) => setPhoneNumber(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="contact address"
                  label="Contact Address"
                  name="contact adress"
                  autoComplete="contact adress"
                  value={address}
                  onChange={(e: any) => setAddress(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-multiple-name-label">Country</InputLabel>
                  <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    // multiple

                    value={country}
                    onChange={(e: any) => setCountry(e.target.value)}

                    // input={<OutlinedInput label="Name" />}
                    // MenuProps={MenuProps}
                  >
                    <MenuItem value="">Select a country</MenuItem>
                    {countries
                      .sort((a: any, b: any) => a.name.localeCompare(b.name))
                      .map((country, index) => (
                        <MenuItem key={index} value={country.name}>
                          {" "}
                          {country.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
                {/* <select value={country} onChange={handleCountryChange}>
                  <option value="">Select a country</option>
                  {countries
                    .sort((a: any, b: any) => a.name.localeCompare(b.name))
                    .map((country, index) => (
                      <option key={index} value={country.name}>
                        {country.name}
                      </option>
                    ))}
                </select> */}
                {/* {country && (
                  <img
                    src={
                      countries.find((countrys) => countrys.name === country)
                        ?.flag
                    }
                    alt={`${country} flag`}
                  />
                )} */}
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="contact address"
                  label="State/County"
                  name="contact adress"
                  autoComplete="contact adress"
                  value={state}
                  onChange={(e: any) => setState(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="contact address"
                  label="City"
                  name="contact adress"
                  autoComplete="contact adress"
                  value={city}
                  onChange={(e: any) => setCity(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="postalCode"
                  label="Postal Code"
                  name="contact adress"
                  autoComplete="contact adress"
                  value={postalCode}
                  onChange={(e: any) => setPostalCode(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormLabel className="mb-2">*School Logo*</FormLabel>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="passport"
                  // label="Passport Photo"
                  id="passport"
                  autoComplete="passportPhoto"
                  type="file"
                  // accept="image/*"
                  // accept=".jpeg, .png, .jpg, "
                  onChange={uploadimage}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  fullWidth
                  //   className="input-label-input-divs"
                >
                  <InputLabel id="demo-multiple-name-label">
                    Who referred your school to Us
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    // multiple

                    value={productMarketer}
                    onChange={(e: any) => setProductMarketer(e.target.value)}

                    // input={<OutlinedInput label="Name" />}
                    // MenuProps={MenuProps}
                  >
                    <MenuItem value="none">Select Product Marketer</MenuItem>
                    {productMarketers
                      ?.sort((a: any, b: any) =>
                        a.firstName.localeCompare(b.firstName)
                      )
                      .map((item: any, index: any) => (
                        <MenuItem
                          key={index}
                          value={`${item.firstName}-${item.lastName}`}
                        >
                          {`${item.firstName}-${item.lastName}`}
                        </MenuItem>
                      ))}
                    <MenuItem value="none">None</MenuItem>
                  </Select>
                </FormControl>
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
                  label="I am pledging that all the all informations i entered is correct."
                />
              </Grid>
            </Grid>
            {error && (
              <p style={{ color: "red", textAlign: "center" }}>{error}</p>
            )}

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
                  //   className={classes.submit}
                >
                  Register
                </Button>
                <ToastContainer />
              </div>
            )}
            <Grid container justify="flex-end">
              <Grid item>
                {notification && (
                  <div
                    className="text-center, bg-green-600"
                    style={{
                      color: "white",
                      marginTop: "5px",
                      fontSize: "medium",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    {notification}
                  </div>
                )}
              </Grid>
              <Grid item>
                <Link to="/School-login">
                  Already Registered School? Sign In here
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default SchoolRegister;
