import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CheckResult.css";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Button } from "@material-ui/core";
import TopNavBar from "../../components/TopNavBar/TopNavBar";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const SelectResultCheck = () => {
  const [personName, setPersonName] = React.useState<string[]>([]);
  const [selectedValue, setSelectedValue] = React.useState<string>("");

  const handleSelectChange = (event: any) => {
    setSelectedValue(event.target.value);
  };
  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    if (userId) {
      navigate("/check-result");
    } else {
      navigate("/login");
    }
  }, [userId]);
  const ScratchCardId = localStorage.getItem("ScratchCardId");
  useEffect(() => {
    if (ScratchCardId) {
      navigate("/check-result");
    } else {
      navigate("/online-result");
    }
  }, [userId]);
  const handleButtonClick = () => {
    // You can define your navigation logic based on the selectedValue here
    if (selectedValue === "Result") {
      navigate("/Result-check"); // Navigate to a specific route based on the selected value
    } else if (selectedValue === "commutative-Result") {
      navigate("/commutative-Result-check");
    }
  };
  const [hasReloaded, setHasReloaded] = useState<boolean>(false);

  useEffect(() => {
    const hasReloadedFromStorage = sessionStorage.getItem("hasReloaded");
    if (!hasReloadedFromStorage) {
      // Perform the reload
      sessionStorage.setItem("hasReloaded", "true");
      window.location.reload();
    } else {
      // Update the state to avoid further reloads
      setHasReloaded(true);
    }
  }, []);
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
              <h2>Select Result Type</h2>
              <div className="form-control-div">
                {/* <div className="input-box">
                {" "}
                <select
                   onChange={handleSelectChange}
                >
                  <option value="Result">Result</option>
                 
                      <option value="commutative-Result">
                        {" "}
                        Commulative Result
                      </option>
                   
                </select>
              </div> */}{" "}
                <FormControl sx={{ m: 1, width: 300 }}>
                  <InputLabel id="demo-multiple-name-label">Select</InputLabel>
                  <Select
                    // labelId="demo-multiple-name-label"
                    // id="demo-multiple-name"
                    onChange={handleSelectChange}
                  >
                    <MenuItem value="Result">Result</MenuItem>
                    <MenuItem value="commutative-Result">
                      commutative Result
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>
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
                  onClick={handleButtonClick}
                >
                  Proceed
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />{" "}
    </>
  );
};

export default SelectResultCheck;
