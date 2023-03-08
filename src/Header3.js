import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import styled from "styled-components";
import Drawer from "@mui/material/Drawer";
import PropTypes from "prop-types";
import { NavLink, withRouter } from "react-router-dom";
import CompanyLogo from "./assets/CompanyLogo.svg";
import Select from "react-select";
import { MenuList } from "./config";
import User from "./assets/User.png";
import { observer, inject } from "mobx-react";
import { computed } from "mobx";
import Collapse from "@mui/material/Collapse";

const drawerWidth = 240;

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
        <HeaderWrapper>
          <Toolbar
            disableGutters
            sx={{
              display: { xs: "flex" },
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
              }}
            >
              <StyledNavLink to="/" className="flex-none">
                <img src={CompanyLogo} alt="Company Logo" width="137" />
              </StyledNavLink>{" "}
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

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <NavList className="flex flex-grow">
                {MenuList.map((menuItem, index) => {
                  if (menuItem.label === "All Plans") {
                    return (
                      <SearchableDropdown
                        ref={this.setWrapperRef}
                        key={menuItem.label}
                      >
                        <NavButton
                          className="mr-2 text-center block rounded py-2 px-4"
                          onClick={() => this?.toggleDropdown("isOpen")}
                        >
                          {menuItem.label}
                        </NavButton>
                        <div
                          className={`dropdown ${
                            this?.state.isOpen ? "open" : ""
                          }`}
                        >
                          <Select
                            options={this?.AllAuthorizedPlans}
                            // value={this?.state.selectedOption}
                            onChange={this?.handleSelect}
                            autoFocus={true}
                            menuIsOpen={true}
                            classNamePrefix="select"
                            styles={customStyles}
                            isSearchable={true}
                            maxMenuHeight={200}
                            // menuPortalTarget={menuPortalTarget}
                          />
                        </div>
                      </SearchableDropdown>
                    );
                  } else if (menuItem.isButton) {
                    return (
                      <NavButton className="mr-2 text-center block rounded py-2 px-4">
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

            <Box sx={{ flexGrow: 0 }}>
              <NavLink to="/my-profile">
                <Profile className="flex items-center gap-x-1">
                  <img width="36px" height="36px" src={User} alt="Avatar" />
                  <div className="flex flex-col">
                    <span className="greeting">
                      Hi, {this?.props?.store.profile.fname}
                    </span>
                    <span className="credits">
                      {this?.props?.store.profile.credits} Credits
                    </span>
                  </div>
                </Profile>
              </NavLink>

              {/* <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu> */}
            </Box>
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
                  <StyledNavLink to="/" className="flex-none">
                    <img
                      src={CompanyLogo}
                      alt="Company Logo"
                      style={{
                        margin: "auto",
                        marginTop: "30px",
                        width: "140px",
                      }}
                    />
                  </StyledNavLink>
                </Box>
                <Divider />
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
                              {this.AllAuthorizedPlans.map(
                                ({ label, value, isDisabled }) => {
                                  return (
                                    <ListItem key={label} disablePadding>
                                      <ListItemButton
                                        sx={{ textAlign: "center" }}
                                      >
                                        <NestedNavListItem
                                          ismobile="true"
                                          to={isDisabled ? "#" : value}
                                          isDisabled={isDisabled}
                                        >
                                          {label}
                                        </NestedNavListItem>
                                      </ListItemButton>
                                    </ListItem>
                                  );
                                }
                              )}
                            </List>
                          </Collapse>
                        </div>
                      );
                    } else if (menuItem.isButton) {
                      return (
                        <div key={menuItem.label}>
                          <StyledListItemButton>
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

const HeaderWrapper = styled.div`
  border-bottom: 1px solid #eaecf0;
  padding: 15px 120px;
  height: 9vh;
  background: white;
  @media only screen and (max-width: 1200px) {
    padding: 10px 40px;
  }
`;

const StyledNavLink = styled(NavLink)`
  /* width: 140px; */
  height: 32px;
  margin-right: 60px;
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
const NavListItem = styled(NavLink)`
  width: ${(props) => (!!props.ismobile ? "100%" : "max-content")};
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

const NestedNavListItem = styled(NavLink)`
  width: ${(props) => (!!props.ismobile ? "100%" : "max-content")};
  height: min-content;
  background: white;
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
  color: ${(props) => (!!props.isDisabled ? "#868080" : "#344054")};
  cursor: ${(props) => (!!props.isDisabled ? "not-allowed" : "pointer")};

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
`;

const StyledListItemButton = styled(ListItemButton)`
  flex-direction: row;
  align-items: center;
  position: relative;
  left: 14px;
  justify-content: center;
  background: white;
  font-family: "Inter";
  height: 56px;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #344054;
`;

const StyledListItemText = styled.span`
  margin-right: 10px;
`;

const NavList = styled.ul`
  gap: 12px;
`;
