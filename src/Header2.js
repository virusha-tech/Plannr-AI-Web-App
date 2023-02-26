import * as React from "react";
import PropTypes from "prop-types";
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
// import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { NavLink, withRouter } from "react-router-dom";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { MenuList } from "./config";
import CompanyLogo from "./assets/CompanyLogo.png";
import Select from "react-select";
import User from "./assets/User.png";
import { observer, inject } from "mobx-react";
import Button from "@mui/material/Button";

const drawerWidth = 240;
const navItems = ["Home", "About", "Contact"];

function HeaderExpand(props) {
  const location = useLocation();
  return <SuperHeader active={true}>{props.children}</SuperHeader>;
}

const customStyles = {
  control: (base, { isFocused }) => ({
    ...base,
    border: "1px solid rgba(209, 213, 219)",
    boxShadow: "none",
    height: "46px",
    "&:hover": {
      border: "1px solid rgba(156, 163, 175)",
    },
  }),
  menuPortal: (base, state) => ({
    ...base,
    zIndex: 50,
    height: "100px",
  }),

  // menu: (base, state) => ({
  //   ...base,
  //   "max-height": "200px",
  //   "overflow-y": "scroll",
  // }),

  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    // const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isFocused ? "#079196" : null,
      color: "#333333",
    };
  },
};
@inject("store")
@observer
class SidebarCompontent extends React.Component {
  constructor(props) {
    super(props);
    this.window = this.props;

    this.state = {
      isOpen: false,
      selectedOption: null,
      allPlansOptions: [],
      mobileOpen: false,
    };

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);

    if (this.props.location.pathname === "/signup") {
      this.props.history.push("/");
    }
    if (this.props.location.pathname === "/login") {
      this.props.history.push("/");
    }

    this.drawer = (
      <Box onClick={this.handleDrawerToggle} sx={{ textAlign: "center" }}>
        <Typography variant="h6" sx={{ my: 2 }}>
          MUI
        </Typography>
        <Divider />
        <List>
          {navItems.map((item) => (
            <ListItem key={item} disablePadding>
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText primary={item} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    );
  }

  handleSelect(selectedOption) {
    this.setState(
      {
        isOpen: false,
      },
      () => {
        this.props.history.push(selectedOption.value);
      }
    );
  }

  handleClickOutside(event) {
    if (this.allPlansRef && !this.allPlansRef.contains(event.target)) {
      if (this.state.isOpen) {
        this.setState({ isOpen: false });
      }
    }
  }

  toggleDropdown() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  componentDidMount() {
    document.addEventListener("keydown", this.shortcutHandler);
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.shortcutHandler);
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  // function DrawerAppBar(props) {
  // const [, setMobileOpen] = React.useState();

  handleDrawerToggle() {
    this.setState({
      mobileOpen: !this.state.mobileOpen,
    });
  }

  setWrapperRef(node) {
    this.allPlansRef = node;
  }

  render() {
    return (
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar component="nav" style={{ backgroundColor: "white" }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={this.handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </IconButton>
            
            {/* <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            
          </Typography> */}
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {navItems.map((item) => (
                <Button key={item} sx={{ color: "#fff" }}>
                  {item}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
        <Box component="nav">
          <Drawer
            container={this.container}
            variant="temporary"
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
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
            {this.drawer}
          </Drawer>
        </Box>
      </Box>
    );
  }
}

SidebarCompontent.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const SuperHeader = styled.div`
  height: 8vh;
  background: white;
  margin-top: ${(props) => (props.active ? "0px" : "-150px")};
  display: ${(props) => (props.hidden ? "hidden" : "flex")};
  /* background-image: url(${require("./pattern-dots.svg").default}); */
  /* background-size: auto 50%; */
  /* background-position: 20px 20px; */
  /* background-repeat: no-repeat; */
  /* position: relative; */
  padding: 10px 120px;
  /* width: 100vw; */
  border-bottom: 1px solid #eaecf0;
`;

const Profile = styled.div`
  img {
    position: relative;
    top: 4px;
  }
  .greeting {
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 24px;
    /* identical to box height, or 200% */

    color: #525252;
  }
  .credits {
    font-family: "Inter";
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 13px;
    /* identical to box height, or 93% */

    color: #000000;
  }
`;

const StyledNavLink = styled(NavLink)`
  width: 140px;
  height: 32px;
  margin-right: 60px;
`;

const NavList = styled.ul`
  gap: 12px;
`;

const NavListItem = styled(NavLink)`
  width: max-content;
  height: 40px;
  background: white;
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #344054;

  &.selected {
    background: rgba(116, 116, 116, 0.1);
    cursor: not-allowed;
  }

  &:hover {
    background: rgba(116, 116, 116, 0.1);
  }
`;

const NavButton = styled.button`
  width: max-content;
  height: 40px;
  background: white;
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #344054;

  /* &.selected {
    background: rgba(116, 116, 116, 0.1);
    cursor: not-allowed;
  } */

  /* &:hover,
  &:active {
    background: rgba(116, 116, 116, 0.1);
  } */
`;

const SearchableDropdown = styled.div`
  position: relative;
  display: inline-block;

  .dropdown {
    width: 100%;
    position: absolute;
    top: 115%;
    left: 15px;
    z-index: 1;
    display: none;
    width: 350%;
  }

  .dropdown.open {
    display: block;
  }
`;

// export default (SidebarCompontent);

export default withRouter(SidebarCompontent);
