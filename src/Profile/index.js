import React, { Component } from "react";
import { Link, Switch, Route, NavLink } from "react-router-dom";
import { computed, observable, makeObservable } from "mobx";
import Header from "../Components/Header";
import { NotificationManager } from "react-notifications";

import {
  IdentificationIcon,
  CheckIcon,
  ChatAltIcon,
  UsersIcon,
  UserCircleIcon,
  ReplyIcon,
  ChevronLeftIcon,
} from "@heroicons/react/outline";
import MainBody from "../Components/Body";
import Referral from "./Referral";
import Feedback from "./Feedback";
import { Helmet } from "react-helmet";
import EnvIcon from "./EnvIcon";
import { withRouter } from "react-router-dom";
import { observer, inject } from "mobx-react";
import Pricing from "../Pricing";
import { Layout } from "../Layout";
import styled from "styled-components";
import AvatarImage from "../assets/Avatar.svg";
import { Avatar, IconButton, Dialog } from "@mui/material";
import Plugins from "../assets/Plugins.svg";
import Integration from "../assets/Integration.svg";
import Teams from "../assets/Teams.svg";
import User from "../assets/EditAvatar.png";
import AddCreditsImage from "../assets/AddCredits.svg";
import ReactAvatar from "react-avatar-edit";
import { Button, LinearProgress } from "@mui/material";
import { useState } from "react";

const Logout = () => {
  return (
    <svg
      width="23"
      height="26"
      viewBox="0 0 23 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M1 16.4765V9.73034H7.66273V3.66233L16.6042 13.097L7.66273 22.5451V16.4767L1 16.4765ZM18.7595 4.35159L15.3964 2.83146L15.4554 1H22V12.9999V25H15.4554L15.3962 23.665L18.7595 21.5271V4.35159Z"
        fill="#EA534A"
      />
    </svg>
  );
};

@inject("store")
@observer
class Body extends Component {
  @computed get headerMessage() {
    if (this.props.store.profile.status === "trialing") {
      return "7 Day Trial";
    }
    if (this.props.store.profile.status === "active") {
      if (this.props.store.profile.cancel_at_period_end) {
        return `Set to cancel soon`;
      }
      return `${this.props.store.profile.plan} Plan`;
    }
    if (this.props.store.profile.status === "incomplete") {
      return `${this.props.store.profile.plan} Plan Restarted`;
    }
    return "Expired";
  }

  @computed get ifNotActive() {
    if (this.props.store.profile.cancel_at_period_end) {
      return "Canceled";
    }
    if (this.props.store.profile.status === "trialing") {
      return "Trialing";
    }
    return false;
  }

  @computed get fromColor() {
    if (this.props.store.profile.status === "trialing") {
      return "gray-400";
    }
    if (this.props.store.profile.status === "active") {
      if (this.props.store.profile.cancel_at_period_end) {
        return "yellow-500";
      }
      return "green-500";
    }
    if (this.props.store.profile.status === "incomplete") {
      return "yellow-600";
    }
    return "red-500";
  }

  @computed get currentPeriodEnd() {
    // console.log(this.props.store.profile.current_period_end)
    if (
      this.props.store.profile.current_period_end &&
      this.props.store.profile.current_period_end.length > 0
    ) {
      var days_difference = Math.round(
        (new Date(this.props.store.profile.current_period_end).getTime() -
          new Date().getTime()) /
          (1000 * 60 * 60 * 24)
      );
      if (days_difference < 0) {
        return 0;
      }
      return days_difference;
    }
    return 0;
  }

  @observable plan = {
    plan: "",
  };

  componentDidMount() {
    this.props.store.refreshTokenAndProfile();
    makeObservable(this);
    this.init();
  }

  checkActive = (match, location) => {
    return false;
  };

  init = async () => {
    let res = await this.props.store.api.post("/user/stripe/plan");
    this.plan = {
      ...res.data,
    };
    console.log(`this.plan`, { ...this.plan });
  };

  onBack = () => {
    this.props.history.push(`/my-profile`);
  };

  render() {
    return (
      <Layout>
        <Wrapper>
          <LeftContainer>
            <StyledNavLink to="/my-profile" className="row" exact>
              <img src={AvatarImage} alt="Avatar" />

              <div>Profile</div>
            </StyledNavLink>
            <DisabledStyledNavLink
              // to="/my-teams"
              to="#"
              exact
              className="row"
              isActive={this.checkActive}
            >
              <img src={Teams} alt="Teams" />
              <div>Teams</div>
            </DisabledStyledNavLink>
            <DisabledStyledNavLink
              // to="/my-integrations"
              to="#"
              disabled
              className="row"
              isActive={this.checkActive}
            >
              <img src={Integration} alt="Integration" />
              <div>Integration</div>
            </DisabledStyledNavLink>
            <DisabledStyledNavLink
              // to="/my-plugins"
              to="#"
              className="row"
              isActive={this.checkActive}
            >
              <img src={Plugins} alt="Plugins" />
              <div>Plugins</div>
            </DisabledStyledNavLink>
          </LeftContainer>
          <RightContainer>
            <UserDetails store={this.props.store} />
            <div>
              <PlanDetails store={this.props.store} />
            </div>
          </RightContainer>
        </Wrapper>
      </Layout>
    );
  }
}

const PlanDetails = ({ store }) => {
  const { profile } = store;
  const getUsagePerc = () => {
    const perc =
      Number(profile.creditsUsed) /
      (Number(profile.creditsUsed) + Number(profile.credits))*100;
    return perc;
  };

  return (
    <PlanDetailsWrapper>
      <PlanDetailsFirstColumn>
        <div className="header">
          <h1>Plan Details</h1>
          {store.profile.cancel_at_period_end ? (
            <div className="action_btn">
              <form
                action={store.baseURL + "user/stripe/uncancel"}
                method="POST"
                className="flex relative"
              >
                <input
                  type="hidden"
                  name="token"
                  value={store.api.defaults.headers.common["x-access-token"]}
                />
                <button type="submit">Reactivate Subscription</button>
              </form>
            </div>
          ) : (
            <div className="action_btn">
              <form
                action={store.baseURL + "user/stripe/customer-portal"}
                method="POST"
                className="flex relative"
              >
                <input
                  type="hidden"
                  name="token"
                  value={store.api.defaults.headers.common["x-access-token"]}
                />
                <ReactivateButton type="submit">
                  {profile.cancel_at_period_end
                    ? "Manage Subscription"
                    : "Update Subscription"}
                </ReactivateButton>
              </form>
            </div>
          )}
        </div>
        <div className="generalInfo">
          <div>
            <label>Active Plan: </label>
            <span>{profile.plan}</span>
          </div>
          <div>
            <label>Status: </label>
            <span>{profile.status}</span>
          </div>
          <div>
            <label>Plan validity: </label>
            <span>
              {new Date(profile.current_period_end)
                .toISOString()
                .replace(/T.*/, "")
                .split("-")
                .reverse()
                .join("-")}
            </span>
          </div>
          <div>
            <label>Usage: </label>
          </div>
          <div>
            <LinearProgress
              style={{ height: "30px", width: "100%" }}
              variant="determinate"
              value={getUsagePerc()}
            />
          </div>
          <div>
            <label>
              Credits Used: {profile.creditsUsed} /{" "}
              {profile.creditsUsed + profile.credits}
            </label>
          </div>
        </div>
      </PlanDetailsFirstColumn>
      <AddCredits>
        <div className="add_credits_content">
          <img src={AddCreditsImage} width="80" alt="AddCredits" />
          <span>Additional Credits:</span>
        </div>
      </AddCredits>
    </PlanDetailsWrapper>
  );
};

const AddCredits = styled.div`
  width: 100%;
  flex: 0.42;
  background: white;
  box-shadow: rgb(14 30 37 / 12%) 0px 2px 4px 0px,
    rgb(14 30 37 / 32%) 0px 2px 16px 0px;
  border-radius: 8px;
  display: grid;
  place-items: center;
  .add_credits_content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }
`;

const ReactivateButton = styled(Button)`
  padding: 0px 14px;
  box-sizing: content-box;
  width: max-content;
  height: 40px;
  background: #05bbc2 !important;
  border: 1px solid #04adb4 !important;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 8px;
  color: white !important;
  font-weight: 600;
  background: #05bbc2;
  border: 1px solid #04adb4 !important;
  &:hover {
    color: black !important;
  }
`;

const PlanDetailsWrapper = styled.div`
  width: 100%;
  margin-top: 4vh;
  display: flex;
  height: 31vh;
  justify-content: space-between;
`;
const PlanDetailsFirstColumn = styled.div`
  flex: 0.55;
  display: flex;
  padding: 40px;
  justify-content: space-between;
  flex-direction: column;
  background: white;
  box-shadow: rgb(14 30 37 / 12%) 0px 2px 4px 0px,
    rgb(14 30 37 / 32%) 0px 2px 16px 0px;
  border-radius: 8px;

  .header {
    display: flex;
    width: 100%;
    justify-content: space-between;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
  }
  .generalInfo {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 6px;
    text-transform: capitalize;

    h1 {
      margin-bottom: 10px;
    }
    label {
      font-style: normal;
      font-weight: 700;
      font-size: 14px;
      line-height: 20px;
      color: #344054;
      text-transform: capitalize;
    }
  }
`;

const UserDetails = ({ store }) => {
  const { profile } = store;
  const [imagecrop, setImagecrop] = useState(false);
  const [src, setsrc] = useState(false);
  const [image, setImage] = useState(profile.profilePhoto);
  const [pview, setpview] = useState(false);

  const onClose = () => {
    setpview(null);
  };

  const onCrop = (view) => {
    setpview(view);
  };

  const saveCropImage = async () => {
    try {
      await store.api.put("/user/update", {
        payload: pview,
        key: "profilePhoto",
      });
      store.refreshTokenAndProfile();
      NotificationManager.info("Profile Pic Updated Successfully");
      setImage(pview);
      setImagecrop(false);
    } catch (err) {
      NotificationManager.error("Image size too large");
      setImagecrop(false);
    }
  };

  const handleAvatarClick = () => {
    setImagecrop(true);
  };

  return (
    <UserDetailsContainer>
      <Dialog
        onClose={() => setImagecrop(false)}
        open={imagecrop}
        sx={{
          ".MuiPaper-root": {
            padding: 4,
          },
        }}
      >
        <ProfileUploadContent>
          <div className="head">
            <h1>Update Profile Photo</h1>
            <IconButton onClick={() => setImagecrop(false)}>
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </IconButton>
          </div>
          <ReactAvatar
            width={500}
            height={400}
            onCrop={onCrop}
            onClose={onClose}
            src={src}
            shadingColor="#474649"
            backgroundColor="#474649"
          />
          <ReactivateButton onClick={saveCropImage}>Update</ReactivateButton>
        </ProfileUploadContent>
      </Dialog>
      <label htmlFor="contained-button-file">
        <div class="font-icon-wrapper">
          {!image ? (
            <IconButton onClick={handleAvatarClick}>
              <Avatar
                src={User}
                style={{
                  margin: "10px",
                  width: "140px",
                  height: "140px",
                }}
              />
            </IconButton>
          ) : (
            <ViewPhoto>
              <Avatar
                src={image}
                style={{
                  margin: "10px",
                  width: "140px",
                  height: "140px",
                }}
              />
              <ReactivateButton onClick={handleAvatarClick}>
                Update Photo
              </ReactivateButton>
            </ViewPhoto>
          )}
        </div>
      </label>
      <SecondColumn>
        <div>
          <label>Name</label>
          <div>{profile.fname}</div>
        </div>
        <div>
          <label>Email</label>
          <div>{profile.email}</div>
        </div>
      </SecondColumn>
      {/* <ThirdColumn>
        <div>
          <div>Phone</div>
          <div>{profile.fname}</div>
        </div>
        <div>
          <div>Email</div>
          <div>{profile.email}</div>
        </div>
      </ThirdColumn> */}
      <FourthColumn>
        <div>
          <LogoutButton
            variant="outlined"
            startIcon={<Logout />}
            onClick={store.handleLogout}
          >
            Logout
          </LogoutButton>
        </div>
      </FourthColumn>
    </UserDetailsContainer>
  );
};

const ViewPhoto = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ProfileUploadContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  h1 {
    font-weight: 700;
  }
  .head {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }
`;

const LogoutButton = styled(Button)`
  border: 2px solid #ea534a !important;
  color: #ea534a !important;
  filter: drop-shadow(0px 1px 2px rgba(16, 24, 40, 0.05)) !important;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  &:hover {
    border: 2px solid #ea534a !important;
    color: #ea534a !important;
    filter: drop-shadow(0px 1px 2px rgba(16, 24, 40, 0.05)) !important;
  }
`;

const UserDetailsContainer = styled.div`
  height: 30vh;
  width: 100%;
  display: flex;
  padding: 5%;
  background: white;
  gap: 8%;
  box-shadow: rgb(14 30 37 / 12%) 0px 2px 4px 0px,
    rgb(14 30 37 / 32%) 0px 2px 16px 0px;
  border-radius: 8px;
`;

const SecondColumn = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 6%;
  padding: 2%;
  justify-content: space-evenly;
  label {
    font-weight: 700;
    color: #344054;
  }
  div {
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: #475467;
  }
`;

const FourthColumn = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
`;
const Wrapper = styled.div`
  display: flex;
  gap: 20px;
  height: 65vh;
  margin: 30px 0px;
`;

const LeftContainer = styled.div`
  flex: 0.3;
  background-color: white;
  box-shadow: rgb(14 30 37 / 12%) 0px 2px 4px 0px,
    rgb(14 30 37 / 32%) 0px 2px 16px 0px;
  border-radius: 8px;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  font-size: 16px;
  gap: 24px;
  padding: 8px 13px;
  margin: 12px;
  border-radius: 8px;
  color: #344054;

  &.active {
    background: #f2f2f2;
  }
`;

const DisabledStyledNavLink = styled(StyledNavLink)`
  color: grey;
  cursor: not-allowed;
`;

const RightContainer = styled.div`
  flex: 0.7;
`;

const Grid = ({ children }) => (
  <div className="grid grid-cols-1 gap-8 mt-4 lg:grid-cols-2 xl:grid-cols-3 ">
    {children}
  </div>
);

const ToolDiv = ({
  Icon,
  title,
  desc,
  to,
  group,
  fromColor,
  toColor,
  onClick,
}) => (
  <>
    <div className="flex relative " onClick={onClick}>
      <div
        className={`absolute inset-0 bg-gradient-to-r from-${
          fromColor ? fromColor : "green-400"
        } to-${
          toColor ? toColor : "blue-500"
        } shadow-lg transform skew-y-0 -rotate-3 rounded-3xl `}
      ></div>

      <div
        className={`flex-1 bg-white rounded-xl transition hover:shadow-md overflow-hidden md:max-w-1lg text-gray-500 cursor-pointer border-t-2 border- hover:border-${
          fromColor ? fromColor : "blue-400"
        } md:flex relative transform hover:scale-105  hover:text-black`}
      >
        {Icon && (
          <div
            className={`md:flex-shrink-0 flex justify-start items-center ml-8 text-${
              fromColor ? fromColor : "green-500"
            }`}
          >
            <Icon className="h-16 w-16 mb-4 mt-4" />
          </div>
        )}
        <div className="p-4">
          <div
            className={`uppercase tracking-wide text-sm text-${
              fromColor ? fromColor : "green-500"
            } font-semibold leading-none`}
          >
            {group || ""}
          </div>
          <div
            href="#"
            className="block text-lg xl:text-xl 2xl:text-2xl leading-tight font-medium text-black leading-none"
          >
            {title}
          </div>
          <p className="mt-1 pr-1 text-sm ">{desc} </p>
        </div>
      </div>
    </div>
  </>
);

const ToolForm = ({
  Icon,
  title,
  desc,
  to,
  group,
  fromColor,
  toColor,
  onClick,
  api,
}) => (
  <>
    <form action={to} method="POST" className="flex relative">
      <input
        type="hidden"
        name="token"
        value={api.defaults.headers.common["x-access-token"]}
      />
      <button type="submit" className="flex-1 text-left">
        <div
          className={`absolute inset-0 bg-gradient-to-r from-${
            fromColor ? fromColor : "green-400"
          } to-${
            toColor ? toColor : "blue-500"
          } shadow-lg transform skew-y-0 -rotate-3 rounded-3xl `}
        ></div>

        <div
          type="submit"
          className={`flex-1 bg-white rounded-xl transition hover:shadow-md overflow-hidden md:max-w-1lg text-gray-500 cursor-pointer border-t-2 border- hover:border-${
            fromColor ? fromColor : "blue-400"
          } md:flex relative transform hover:scale-105  hover:text-black`}
        >
          {Icon && (
            <div
              className={`md:flex-shrink-0 flex justify-start items-center ml-8 text-${
                fromColor ? fromColor : "green-500"
              }`}
            >
              <Icon className="h-16 w-16 mb-4 mt-4" />
            </div>
          )}
          <div className="p-4">
            <div
              className={`uppercase tracking-wide text-sm text-${
                fromColor ? fromColor : "green-500"
              } font-semibold leading-none`}
            >
              {group || ""}
            </div>
            <div className="block text-lg xl:text-xl 2xl:text-2xl leading-tight font-medium text-black leading-none">
              {title}
            </div>
            <p className="mt-1 pr-1 text-sm ">{desc} </p>
          </div>
        </div>
      </button>
    </form>
  </>
);

const Tool = ({
  Icon,
  title,
  desc,
  to,
  group,
  fromColor,
  toColor,
  onClick,
  api,
}) => (
  <Link to={to} className="flex relative">
    <div className="flex-1 text-left">
      <div
        className={`absolute inset-0 bg-gradient-to-r from-${
          fromColor ? fromColor : "green-400"
        } to-${
          toColor ? toColor : "blue-500"
        } shadow-lg transform skew-y-0 -rotate-3 rounded-3xl `}
      ></div>

      <div
        className={`flex-1 bg-white rounded-xl transition hover:shadow-md overflow-hidden md:max-w-1lg text-gray-500 cursor-pointer border-t-2 border- hover:border-${
          fromColor ? fromColor : "blue-400"
        } md:flex relative transform hover:scale-105  hover:text-black`}
      >
        {Icon && (
          <div
            className={`md:flex-shrink-0 flex justify-start items-center ml-8 text-${
              fromColor ? fromColor : "green-500"
            }`}
          >
            <Icon className="h-16 w-16 mb-4 mt-4" />
          </div>
        )}
        <div className="p-4">
          <div
            className={`uppercase tracking-wide text-sm text-${
              fromColor ? fromColor : "green-500"
            } font-semibold leading-none`}
          >
            {group || ""}
          </div>
          <div className="block text-lg xl:text-xl 2xl:text-2xl leading-tight font-medium text-black leading-none">
            {title}
          </div>
          <p className="mt-1 pr-1 text-sm ">{desc} </p>
        </div>
      </div>
    </div>
  </Link>
);

const ATool = ({
  Icon,
  title,
  desc,
  to,
  group,
  fromColor,
  toColor,
  onClick,
  api,
}) => (
  <a href={to} className="flex relative">
    <div className="flex-1 text-left">
      <div
        className={`absolute inset-0 bg-gradient-to-r from-${
          fromColor ? fromColor : "green-400"
        } to-${
          toColor ? toColor : "blue-500"
        } shadow-lg transform skew-y-0 -rotate-3 rounded-3xl `}
      ></div>

      <div
        className={`flex-1 bg-white rounded-xl transition hover:shadow-md overflow-hidden md:max-w-1lg text-gray-500 cursor-pointer border-t-2 border- hover:border-${
          fromColor ? fromColor : "blue-400"
        } md:flex relative transform hover:scale-105  hover:text-black`}
      >
        {Icon && (
          <div
            className={`md:flex-shrink-0 flex justify-start items-center ml-8 text-${
              fromColor ? fromColor : "green-500"
            }`}
          >
            <Icon className="h-16 w-16 mb-4 mt-4" />
          </div>
        )}
        <div className="p-4">
          <div
            className={`uppercase tracking-wide text-sm text-${
              fromColor ? fromColor : "green-500"
            } font-semibold leading-none`}
          >
            {group || ""}
          </div>
          <div className="block text-lg xl:text-xl 2xl:text-2xl leading-tight font-medium text-black leading-none">
            {title}
          </div>
          <p className="mt-1 pr-1 text-sm ">{desc} </p>
        </div>
      </div>
    </div>
  </a>
);

export default withRouter(Body);
