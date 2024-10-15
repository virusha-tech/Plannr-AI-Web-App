import React, { Component } from "react";
import styled from "styled-components";
import { observer, inject } from "mobx-react";
import { computed } from "mobx";
import { NavLink } from "react-router-dom";
// import {
//   SwitchHorizontalIcon,
//   ScaleIcon,
//   DatabaseIcon,
//   UserCircleIcon,
// } from "@heroicons/react/outline";

// import { IconDashboard } from "./Icons";
import { useLocation } from "react-router-dom";
import { withRouter } from "react-router-dom";
import User from "./assets/User.png";
import { MenuList } from "./config";
import CompanyLogo from "./assets/CompanyLogo.png";
import Select from "react-select";

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

function HeaderExpand(props) {
  const location = useLocation();
  return <SuperHeader active={true}>{props.children}</SuperHeader>;
}

@inject("store")
@observer
class SidebarCompontent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      selectedOption: null,
      allPlansOptions: [],
    };

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleSelect = this.handleSelect.bind(this);

    if (this.props.location.pathname === "/signup") {
      this.props.history.push("/");
    }
    if (this.props.location.pathname === "/login") {
      this.props.history.push("/");
    }
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
        });
      }
    });
    // console.log(allPlans, "allPlans");
    return allPlans;
  }

  componentDidMount() {
    document.addEventListener("keydown", this.shortcutHandler);
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.shortcutHandler);
    document.removeEventListener("mousedown", this.handleClickOutside);
  }
  shortcutHandler = (e) => {
    if (e.keyCode === 75 && e.ctrlKey) {
      e.preventDefault();
      // select all text in input with id q
      document.getElementById("q").focus();
      document.getElementById("q").select();
    }
  };

  onKeyUp = (e) => {
    if (this.props.location.pathname !== "/search") {
      this.props.history.push("/search");
    }
    if (e.keyCode === 8) {
      if (this.props.store.toolsKeyword === "") {
        this.props.history.push("/");
      }
    }
  };

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

  toggleDropdown() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  @computed get fromColor() {
    if (this.props.store.profile.credits <= 0) {
      return "bg-red-200 text-red-600";
    }
    if (this.props.store.profile.status === "trialing") {
      return "";
    }
    if (this.props.store.profile.status === "active") {
      return "";
    }
    if (this.props.store.profile.status === "incomplete") {
      return "";
    }
    return "bg-red-200 text-red-600";
  }

  setWrapperRef(node) {
    this.allPlansRef = node;
  }

  render() {
    return (
      <>
        {/* <Textarea
          readOnly
          name="copy-textarea"
          id="copy-textarea"
          value={this.props.store.copyToClipboardText}
        /> */}
        <HeaderExpand>
          <div className="flex items-center justify-between	flex-1">
            {/* LOGO */}
            <StyledNavLink to="/" className="flex-none">
              <img src={CompanyLogo} alt="Company Logo" />
            </StyledNavLink>
            {/* MENUBAR */}
            <NavList className="flex flex-grow">
              {MenuList.map((menuItem, index) => {
                if (menuItem.isButton) {
                  return (
                    <SearchableDropdown
                      ref={this.setWrapperRef}
                      key={menuItem.label}
                    >
                      <NavButton
                        className="mr-2 text-center block rounded py-2 px-4"
                        onClick={this.toggleDropdown}
                      >
                        {menuItem.label}
                      </NavButton>
                      <div
                        className={`dropdown ${
                          this.state.isOpen ? "open" : ""
                        }`}
                      >
                        <Select
                          options={this.AllAuthorizedPlans}
                          value={this.state.selectedOption}
                          onChange={this.handleSelect}
                          autoFocus={true}
                          menuIsOpen={true}
                          classNamePrefix="select"
                          styles={customStyles}
                          isClearable={true}
                          isSearchable={true}
                          maxMenuHeight={200}
                          // menuPortalTarget={menuPortalTarget}

                        />
                      </div>
                    </SearchableDropdown>
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

            {/* Profile */}
            
          </div>
        </HeaderExpand>
      </>
    );
  }
}

// const Input = styled.input``;

// const Textarea = styled.textarea`
//   position: fixed;
//   right: -9990px;
//   top: -9990px;
// `;

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

export default withRouter(SidebarCompontent);
