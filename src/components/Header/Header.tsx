import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import "./Header.css";
import { Container } from "@mui/material";
import logo from "../../assets/images/bluelogo.png";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import { Dropdown } from "@mui/joy";
// import IconButton from "@mui/joy/IconButton";
import { Menu } from "@mui/joy";
import { MenuButton } from "@mui/joy";
import { MenuItem } from "@mui/joy";
import MoreVert from "@mui/icons-material/MoreVert";
import { UserApi } from "../../APiData/Api";
interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 240;
// const navItems = ["Home", "About", "Contact"];

export default function Header(props: Props) {
  const [userData, setUserData] = React.useState<any>({});
  const [logoutUser, setLogoutUser] = React.useState<any>();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  React.useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await axios.get(UserApi + userId);
      console.log(data);
      // const foundData = data.find((item) => item.artist === artist);
      setUserData(data);
    };

    fetchPosts();
  }, [userId]);

  const logout = () => {
    setLogoutUser(localStorage.setItem("userId", ""));

    navigate("/");
  };

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        textAlign: "center",
        // backgroundColor: "darkorange",
        backgroundColor: "  #040536",
        color: "white",
        height: "140vh",
      }}
    >
      <Typography variant="h6" sx={{ my: 2 }}>
        My Edu Result (myeduresult)
      </Typography>
      <Divider />
      <List
        style={{
          display: "block",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <ul
          style={{
            display: "block",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            lineHeight: "50px",
          }}
        >
          <ListItem>
            <Link
              to="/online-result"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {" "}
              Check Result
            </Link>
          </ListItem>

          <ListItem>
            {" "}
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              Contact Us
            </Link>
          </ListItem>
          <ListItem>
            {" "}
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {" "}
              Login
            </Link>
          </ListItem>
          <ListItem>
            {" "}
            <Link
              to="/staff-login"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {" "}
              Staff Login
            </Link>
          </ListItem>
          <ListItem>
            {" "}
            <Link
              to="/School-login"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {" "}
              School Login
            </Link>
          </ListItem>

          {userData ? (
            <div>
              <ListItem>
                <div>
                  {userData?.firstName} {userData?.lastName}{" "}
                </div>
              </ListItem>
              <ListItem>
                <Link
                  to="/update-user-profile"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Update User Profile
                </Link>{" "}
              </ListItem>
              <ListItem>
                {" "}
                <div onClick={logout} style={{ cursor: "pointer" }}>
                  Logout{" "}
                </div>
              </ListItem>
            </div>
          ) : (
            <>
              <ListItem>
                {" "}
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {" "}
                  Login
                </Link>
              </ListItem>
            </>
          )}
        </ul>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar
        component="nav"
        className="app-bar"
        sx={{
          bgcolor: "white",
          color: "black",
          //   position: "static",

          //   width: "100%",
        }}
      >
        <Toolbar>
          <IconButton
            className="header-iconbtn"
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon className="menu-icon" />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { sm: "block" } }}
          >
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              {/* {userData?.schoolName?.schoolLogo? (
              <div className="logo-div-img">
                <img
                  src={userData?.schoolName?.schoolLogo}
                  alt="be"
                  className="logo-img"
                />
              </div>
              ) : ( */}
              <div className="logo-div-img">
                <img src={logo} alt="be" className="logo-img" />
              </div>
              {/* )} */}
            </Link>
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <List>
              <ul
                style={{
                  display: "flex",

                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                  textAlign: "right",
                }}
              >
                <ListItem>
                  {" "}
                  <Link
                    to="/online-result"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <span>Check</span>
                    <span style={{ marginLeft: "5px" }}>Result</span>
                  </Link>
                </ListItem>

                <ListItem>
                  <Link
                    to="/"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <span>Contact</span>
                    <span style={{ marginLeft: "5px" }}>Us</span>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link
                    to="/login"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <span>Login</span>
                  </Link>
                </ListItem>

                <ListItem>
                  <Link
                    to="/staff-login"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {" "}
                    <span>Staff</span>
                    <span style={{ marginLeft: "5px" }}>Login</span>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link
                    to="/School-login"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {" "}
                    <span>School</span>
                    <span style={{ marginLeft: "5px" }}>Login</span>
                  </Link>
                </ListItem>
                {/* <ListItem>
                  <Link
                    to="/register"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {" "}
                    <span>Sign</span>
                  </Link>
                  <span style={{ marginLeft: "5px" }}>Up</span>
                </ListItem> */}
                {userData ? (
                  <div>
                    <Dropdown>
                      <MenuButton
                        slots={{ root: IconButton }}
                        slotProps={{
                          root: { variant: "outlined", color: "neutral" },
                        }}
                      >
                        <MoreVert />
                      </MenuButton>
                      <Menu>
                        <MenuItem>
                          <span>{userData?.firstName}</span>
                          <span>{userData?.lastName}</span>
                        </MenuItem>
                        <MenuItem>
                          <Link
                            to="/update-user-profile"
                            style={{ textDecoration: "none", color: "initial" }}
                          >
                            Update User Profile
                          </Link>{" "}
                        </MenuItem>
                        <MenuItem onClick={logout}>Logout</MenuItem>
                      </Menu>
                    </Dropdown>
                  </div>
                ) : (
                  <></>
                )}
              </ul>
            </List>
          </Box>
        </Toolbar>
      </AppBar>

      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box
        component="main"
        // sx={{ p: 3 }}
      >
        <Toolbar />
        {/* <Typography>
         
        </Typography> */}
      </Box>
    </Box>
  );
}
