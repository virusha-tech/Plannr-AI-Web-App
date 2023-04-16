import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { Button } from "@mui/material";
import styled from "styled-components";
import Drawer from "@mui/material/Drawer";
import PropTypes from "prop-types";
import { NavLink, withRouter } from "react-router-dom";
import Select from "react-select";
import { AdminMenuList as MenuList } from "../config";
import User from "../assets/User.png";
import CompanyLogo from "../assets/CompanyLogo.svg";
import { observer, inject } from "mobx-react";
import { computed } from "mobx";
import Collapse from "@mui/material/Collapse";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useEffect } from "react";

const drawerWidth = 240;

const ProfileMenuList = [
  {
    name: "Profile",
    isDisabled: false,
  },

  {
    name: "Billing",
    isDisabled: false,
  },
  {
    name: "Teams",
    isDisabled: true,
  },
  {
    name: "Integration",
    isDisabled: true,
  },
  {
    name: "Plugins",
    isDisabled: true,
  },
  {
    name: "Help",
    isDisabled: false,
  },
];

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

  menu: (base, state) => ({
    ...base,
    margin: "0px",
  }),

  option: (styles, { isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isFocused ? "#079196" : null,
      color: isDisabled ? "#868080" : "#333333",
      cursor: isDisabled ? "not-allowed" : "pointer",
    };
  },
};

const ProfileSection = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (ev, label) => {
    setAnchorEl(null);
    if (label === "Logout") {
      props.store.handleLogout();
    } else if (label === "Profile") {
      props.history.push(props.isFreeVersion ? "#" : "/my-profile");
    } else if (label === "Help") {
      window.gist.chat("open");
    } else if (label === "User Dashboard") {
      props.history.push("/dashboard");
    }
  };

  useEffect(() => {
    const isFound = ProfileMenuList.findIndex((menu) => {
      return menu.name == "User Dashboard";
    });
    if (isFound === -1 && props?.store.profile.accountType === "admin") {
      ProfileMenuList.splice(1, 0, {
        name: "User Dashboard",
        isDisabled: false,
      });
    }
  }, []);

  return (
    <StyledProfileBox>
      <div>
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <Profile className="flex items-center gap-x-2">
            <img
              width="36px"
              height="36px"
              src={props?.store.profile?.profilePhoto || User}
              alt="Avatar"
            />
            <div className="flex flex-col">
              <span className="greeting">Hi, {props?.store.profile.fname}</span>
              <span className="credits">
                {props?.store.profile.credits} Credits
              </span>
            </div>
          </Profile>
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
            sx: { width: anchorEl && anchorEl.offsetWidth + 50 },
          }}
        >
          {ProfileMenuList.map(({ name, isDisabled }) => {
            return (
              <StyledMenuItem
                disabled={isDisabled}
                onClick={(ev) => handleClose(ev, name)}
              >
                {name}
                {/* Desktop */}
              </StyledMenuItem>
            );
          })}
          <StyledMenuItemLogout onClick={(ev) => handleClose(ev, "Logout")}>
            Logout
          </StyledMenuItemLogout>
        </Menu>
      </div>
    </StyledProfileBox>
  );
};

const StyledProfileBox = styled(Box)`
  display: block;
  @media only screen and (max-width: 899px) {
    display: none;
  }
`;

const StyledMenuItem = styled(MenuItem)`
  margin: 0px 16px;
  box-sizing: content-box;
  &:hover {
    background-color: white;
  }
`;

const StyledMenuItemLogout = styled(StyledMenuItem)`
  color: red !important;
  &:hover {
    color: red !important;
    background-color: #f2f2f2 !important;
  }

  @media only screen and (max-width: 899px) {
    padding: 0px 6px;
    font-weight: 600;
  }
`;

@inject("store")
@observer
class ResponsiveAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isOpenAllPlansInMobile: false,
      //   selectedOption: null,
      //   allPlansOptions: [],
      mobileOpen: false,
    };

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
    this.renderListItemsInDrawer = this.handleDrawerToggle.bind(this);

    if (this.props.location.pathname === "/signup") {
      this.props.history.push("/");
    }
    if (this.props.location.pathname === "/login") {
      this.props.history.push("/");
    }
    this.container =
      this.props.window !== undefined
        ? () => this.props.window().document.body
        : undefined;
  }

  handleClickOutside(event) {
    if (this.allPlansRef && !this.allPlansRef.contains(event.target)) {
      if (this.state.isOpen) {
        this.setState({ isOpen: false });
      }
    }
  }

  @computed get AllAuthorizedPlans() {
    const allPlans = [];
    this.props.store.tools.forEach((tool) => {
      let autorisedtool = tool.permissions.some((r) =>
        this.props.store.profile.permissions.includes(r)
      );
      if (autorisedtool) {
        allPlans.push({
          label: `${tool.title} / ${tool.category}`,
          value: `${tool.to}`,
          isDisabled: tool.isComingSoon ? true : false,
        });
      }
    });
    return allPlans;
  }
  componentDidMount() {
    document.addEventListener("keydown", this.shortcutHandler);
    document.addEventListener("mousedown", this.handleClickOutside);
  }
  setWrapperRef(node) {
    this.allPlansRef = node;
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.shortcutHandler);
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleDrawerToggle = () => {
    this.setState((prevState) => ({
      mobileOpen: !prevState.mobileOpen,
    }));
  };

  handleClose = (ev, label) => {
    if (label === "Logout") {
      this.props.store.handleLogout(this.props.history);
    } else if (label === "Profile") {
      this.props.history.push(this.props.isFreeVersion ? "#" : "/my-profile");
    } else if (label === "Help") {
      window.gist.chat("open");
    }
  };

  toggleDropdown(key) {
    window.gtag("event", "click", {
      event_category: "Button",
      event_label: `All Plans`,
    });
    this.setState((prevState) => {
      return {
        [key]: !prevState[key],
      };
    });
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

  render() {
    return (
      <AppBar position="static">
        {/* {this.props.isFreeVersion ? (
          <Alert severity="info">
            Explore our complete product to check all PlannrAI Services &nbsp;
            <a
              href={config.baseDomain}
              style={{ color: "red", textDecoration: "underline" }}
            >
              Click
            </a>
          </Alert>
        ) : null} */}

        <HeaderWrapper>
          <Toolbar
            variant="dense"
            disableGutters
            sx={{
              display: { xs: "flex" },
              justifyContent: "space-between",
              minHeight: "initial",
              height: "6vh",
              gap: "5%",
            }}
          >
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                height: "40px",
                "align-items": "center",
              }}
            >
              <StylNavLink to="/" className="flex-none">
                <StyledImg src={CompanyLogo} alt="Company Logo" />
              </StylNavLink>{" "}
            </Box>

            <IconButton
              aria-label="open drawer"
              onClick={this.handleDrawerToggle}
              sx={{
                mr: 2,
                display: { xs: "block", md: "none" },
                // flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "black",
                textDecoration: "none",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="black"
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

            {!this.props.isFreeVersion ? (
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                <NavList className="flex flex-grow">
                  {MenuList.map((menuItem, index) => {
                    console.log(menuItem);
                    if (menuItem.label === "Help") {
                      return (
                        <NavButton
                          className="mr-2 text-center block rounded py-2 px-4"
                          onClick={() => {
                            // window.Intercom("show");
                            window.gist.chat("open");
                          }}
                          key={menuItem.label}
                        >
                          {menuItem.label}
                        </NavButton>
                      );
                    } else if (menuItem.label === "Support") {
                      return (
                        <NavButton
                          className="mr-2 text-center block rounded py-2 px-4"
                          key={menuItem.label}
                        >
                          <a
                            href="https://plannr-help.freshdesk.com/support/home"
                            target="_blank"
                            rel="noreferrer"
                          >
                            {menuItem.label}
                          </a>
                        </NavButton>
                      );
                    } else if (menuItem.isButton) {
                      return (
                        <NavButton
                          className="mr-2 text-center block rounded py-2 px-4"
                          key={menuItem.label}
                        >
                          {menuItem.label}
                        </NavButton>
                      );
                    } else {
                      return (
                        <NavListItem
                          to={menuItem.to}
                          key={menuItem.label}
                          exact={menuItem.exact}
                          className="mr-2 text-center block rounded py-2 px-4"
                          activeClassName="selected"
                        >
                          {menuItem.label}
                        </NavListItem>
                      );
                    }
                  })}
                </NavList>
              </Box>
            ) : null}

            <ProfileSection
              isFreeVersion={this.props.isFreeVersion}
              store={this.props.store}
              history={this.props.history}
            />

            <StyledNavLink to="/" className="flex-none">
              <img
                src={CompanyLogo}
                alt="Company Logo"
                style={{
                  width: "98px",
                }}
              />
            </StyledNavLink>
          </Toolbar>
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
                display: { xs: "block", md: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
            >
              <Box
                onClick={this.handleDrawerToggle}
                sx={{ textAlign: "center" }}
              >
                <Box>
                  <MobileProfile className="flex items-center gap-x-4">
                    <img
                      width="60px"
                      height="60px"
                      src={this.props?.store.profile?.profilePhoto || User}
                      alt="Avatar"
                    />
                    <div className="flex flex-col">
                      <span className="greeting">
                        Hi, {this.props?.store.profile.fname}
                      </span>
                      <span className="credits">
                        {this.props?.store.profile.credits} Credits
                      </span>
                    </div>
                  </MobileProfile>
                  {/* <StyledNavLink to="/" className="flex-none">
                    <img
                      src={CompanyLogo}
                      alt="Company Logo"
                      style={{
                        margin: "auto",
                        marginTop: "30px",
                        width: "140px",
                      }}
                    />
                  </StyledNavLink> */}
                </Box>
                <Divider />
                {!this.props.isFreeVersion ? (
                  <List>
                    {MenuList.map((menuItem) => {
                      if (menuItem.label === "All Plans") {
                        return (
                          <div key={menuItem.label}>
                            <StyledListItemButton
                              onClick={(ev) => {
                                ev.stopPropagation();
                                this.toggleDropdown("isOpenAllPlansInMobile");
                              }}
                            >
                              <StyledListItemText>
                                {menuItem.label}
                              </StyledListItemText>
                              {this.state.isOpenAllPlansInMobile ? (
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
                                    d="M4.5 15.75l7.5-7.5 7.5 7.5"
                                  />
                                </svg>
                              ) : (
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
                                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                  />
                                </svg>
                              )}
                            </StyledListItemButton>
                            <Collapse
                              in={this.state.isOpenAllPlansInMobile}
                              timeout="auto"
                              unmountOnExit
                            >
                              <List component="div" disablePadding>
                                {this.AllAuthorizedPlans.filter(
                                  ({ isDisabled }) => !isDisabled
                                ).map(({ label, value, isDisabled }) => {
                                  return (
                                    <ListItem key={label} disablePadding>
                                      <ListItemButton
                                        sx={{ textAlign: "center" }}
                                      >
                                        <NestedNavListItem
                                          style={{
                                            padding: "0px 16px",
                                            "text-align": "left",
                                          }}
                                          ismobile="true"
                                          to={isDisabled ? "#" : value}
                                          isdisabled={isDisabled}
                                        >
                                          {label}
                                        </NestedNavListItem>
                                      </ListItemButton>
                                    </ListItem>
                                  );
                                })}
                              </List>
                            </Collapse>
                          </div>
                        );
                      } else if (menuItem.label === "Logout") {
                        return (
                          <StyledMenuItemLogout
                            onClick={(ev) => this.handleClose(ev, "Logout")}
                          >
                            Logout
                          </StyledMenuItemLogout>
                        );
                      } else if (menuItem.label === "Support") {
                        return (
                          <NavButton
                            className="mr-2 text-center block rounded py-2 px-4"
                            key={menuItem.label}
                          >
                            <a
                              href="https://plannr-help.freshdesk.com/support/home"
                              target="_blank"
                              rel="noreferrer"
                              style={{ padding: "0px 8px" }}
                            >
                              {menuItem.label}
                            </a>
                          </NavButton>
                        );
                      } else if (menuItem.isButton) {
                        return (
                          <div key={menuItem.label}>
                            <StyledListItemButton
                              onClick={(ev) =>
                                this.handleClose(ev, menuItem.label)
                              }
                            >
                              <StyledListItemText>
                                {menuItem.label}
                              </StyledListItemText>
                            </StyledListItemButton>
                          </div>
                        );
                      } else {
                        return (
                          <ListItem key={menuItem.label} disablePadding>
                            <ListItemButton sx={{ textAlign: "center" }}>
                              <NavListItem
                                ismobile="true"
                                to={menuItem?.to || "test"}
                              >
                                {menuItem.label}
                              </NavListItem>
                            </ListItemButton>
                          </ListItem>
                        );
                      }
                    })}
                  </List>
                ) : null}
              </Box>
              {/* {this.renderListItemsInDrawer()} */}
            </Drawer>
          </Box>
        </HeaderWrapper>
      </AppBar>
    );
  }
}
export default withRouter(ResponsiveAppBar);

ResponsiveAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const StyledImg = styled.img`
  height: 30px;
  display: flex;
  align-items: flex-end;
  @media only screen and (max-width: 1200px) {
    height: 24px;
  }
`;

const Profile = styled.div`
  img {
    position: relative;
    top: 4px;
    border: 1px solid lightgrey;
    border-radius: 50%;
  }
  .greeting {
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 24px;
    width: 100px;
    text-align: left;
    color: #525252;
  }
  .credits {
    height: 13px;
    font-family: "Inter";
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 13px;
    text-align: left;
    color: #000000;
  }
`;

const MobileProfile = styled.div`
  padding: 16px;
  img {
    position: relative;
    top: 4px;
    border: 1px solid lightgrey;
    border-radius: 50%;
  }
  .greeting {
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 24px;
    width: 100px;
    text-align: left;
    color: #525252;
  }
  .credits {
    height: 13px;
    font-family: "Inter";
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 13px;
    text-align: left;
    color: #000000;
  }
`;

const HeaderWrapper = styled.div`
  border-bottom: 1px solid #eaecf0;
  padding: 8px 80px;
  height: 8vh;
  background: ${({ theme }) => {
    return theme.primary;
  }};
  position: fixed;
  z-index: 100;
  top: 0px;
  right: 0px;
  left: 0px;
  @media only screen and (max-width: 899px) {
    padding: 1vh 4%;
  }
`;

const StyledNavLink = styled(NavLink)`
  display: none;
  @media only screen and (max-width: 899px) {
    display: block;
  }
`;

const StylNavLink = styled(NavLink)``;

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
const NavListItem = styled(NavLink)`
  width: ${(props) => (!!props.ismobile ? "100%" : "max-content")};
  background: white;
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 40px;
  color: #344054;
  padding: 0px 8px;
  text-align: left;
  &.selected {
    background: white !important;
    border: 2px solid black !important;
    cursor: not-allowed;
  }

  &:hover {
    background: white !important;
  }
`;

const NestedNavListItem = styled(NavLink)`
  width: ${(props) => (!!props.ismobile ? "100%" : "max-content")};
  height: min-content;
  background: white;
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
  color: ${(props) => (!!props.isdisabled ? "#868080" : "#344054")};
  cursor: ${(props) => (!!props.isdisabled ? "not-allowed" : "pointer")};

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
  background: white;
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 40px;
  color: #344054;
  /* padding: 0px; */
`;

const StyledListItemButton = styled(ListItemButton)`
  flex-direction: row;
  align-items: center;
  position: relative;
  left: 14px;
  justify-content: flex-start;
  background: white;
  font-family: "Inter";
  height: 56px;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #344054;
  padding: 0px 8px;
`;

const StyledListItemText = styled.span`
  margin-right: 10px;
  text-align: left;
`;

const NavList = styled.ul`
  gap: 12px;
  align-items: center;
`;
