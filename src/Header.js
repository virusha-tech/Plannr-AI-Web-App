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
import CompanyLogo from "./assets/CompanyLogo.png";
import { useLocation } from "react-router-dom";
import { withRouter } from "react-router-dom";
import User from "./assets/User.png";
import { MenuList } from "./config";

function HeaderExpand(props) {
  const location = useLocation();
  return <SuperHeader active={true}>{props.children}</SuperHeader>;
}

@inject("store")
@observer
class SidebarCompontent extends Component {
  constructor(props) {
    super(props);
    if (this.props.location.pathname === "/signup") {
      this.props.history.push("/");
    }
    if (this.props.location.pathname === "/login") {
      this.props.history.push("/");
    }
  }
  componentDidMount() {
    document.addEventListener("keydown", this.shortcutHandler);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.shortcutHandler);
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
                return (
                  <NavListItem
                    to={menuItem.to}
                    key={menuItem.label}
                    exact={menuItem.exact}
                    className="mr-2 text-center block rounded py-2 px-4 hover:bg-blue-700"
                    activeClassName="selected"
                  >
                    {menuItem.label}
                  </NavListItem>
                );
              })}
            </NavList>

            {/* Profile */}
            <NavLink to="/my-profile">
              <Profile className="flex items-center gap-x-1">
                <img width="36px" height="36px" src={User} alt="Avatar" />
                <div className="flex flex-col">
                  <span className="greeting">
                    Hi, {this.props.store.profile.fname}
                  </span>
                  <span className="credits">
                    {this.props.store.profile.credits} Credits
                  </span>
                </div>
              </Profile>
            </NavLink>
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
  height: 9vh;
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

export default withRouter(SidebarCompontent);
