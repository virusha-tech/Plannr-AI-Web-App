import React, { Component } from "react";
import { Link } from "react-router-dom";
import { computed } from "mobx";
import CardsBody from "./Components/Body";
import { Helmet } from "react-helmet";
import HandGesture from "./assets/Hand.svg";
import User from "./assets/User.png";
import { observer, inject } from "mobx-react";
import styled from "styled-components";
import { TabList } from "./config";
import SearchIcon from "./assets/SearchIcon.svg";
import { Layout } from "./Layout";
import { Chip } from "../node_modules/@mui/material/index";
@inject("store")
@observer
class Body extends Component {
  state = {
    activeTab: "AllAuthorizedCards",
  };

  changeTab = (tab) => {
    this.setState({ activeTab: tab });
  };

  @computed get AllAuthorizedCards() {
    return this.props.store.tools.filter((tool) =>
      tool.permissions.some((r) =>
        this.props.store.profile.permissions.includes(r)
      )
    );
  }

  @computed get beta() {
    return this.AllAuthorizedCards.filter((tool) => tool.category === "Beta");
  }

  @computed get Personal() {
    return this.AllAuthorizedCards.filter(
      (tool) => tool.category === "Personal"
    );
  }

  @computed get Business() {
    return this.AllAuthorizedCards.filter(
      (tool) => tool.category === "Business"
    );
  }

  @computed get Professional() {
    return this.AllAuthorizedCards.filter(
      (tool) => tool.category === "Professional"
    );
  }

  @computed get social() {
    return this.AllAuthorizedCards.filter((tool) => tool.category === "Social");
  }

  @computed get content() {
    return this.AllAuthorizedCards.filter(
      (tool) => tool.category === "Content"
    );
  }

  @computed get programming() {
    return this.AllAuthorizedCards.filter(
      (tool) => tool.category === "Programming"
    );
  }

  render() {
    return (
      <Layout>
        <Helmet>
          <title>{`Dashboard - Plannr AI`}</title>
        </Helmet>

        <AddBanner>
          <div className="flex items-center justify-between	flex-1 gap-5">
            <StyledButton className="flex-none">Upgrade Now</StyledButton>
            <TextContainer className="flex flex-grow">
              Get
              <span>&nbsp;20% off&nbsp;</span>
              if you upgrade within 24h, use the code 20TODAY at checkout!
            </TextContainer>
            <FreeTrial>
              Free Trial
              <span>&nbsp;&#8226;&nbsp;</span>7 Days remaining
            </FreeTrial>
          </div>
        </AddBanner>

        <QuestionBanner>
          <Header>
            <img width="32px" src={HandGesture} alt="Hand Gesture" />
            <h1>What will you create today?</h1>
          </Header>
          <span>
            Generate Customized Plans with Plannr.ai using OpenAI’s Language
            Model
          </span>
        </QuestionBanner>

        <TabContainer className="border-b border-gray-200 dark:border-gray-700">
          <Tabs className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
            {TabList.map((tabItem, index) => {
              return (
                <li className="mr-2" key={tabItem.id}>
                  <button
                    onClick={() => this.changeTab(tabItem.id)}
                    className={`inline-flex p-3 md:p-4 border-b-2 border-transparent  rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group ${
                      this.state.activeTab === tabItem.id ? "active" : ""
                    }`}
                  >
                    {tabItem.label}
                    <Pill>{this[tabItem.id].length}</Pill>
                  </button>
                </li>
              );
            })}
          </Tabs>
          <Input
            type="search"
            tabIndex={-1}
            id="q"
            name="q"
            // placeholder="Search...  [Shortcut: Ctrl + K]"
            // className="py-4 pl-4 md:pl-14 text-xl focus:outline-none focus:bg-white focus:text-gray-900 transition flex flex-1 w-full"
            autoComplete="off"
            value={this.props.store.toolsKeyword}
            onChange={this.props.store.onChangeToolsKeyword}
            onKeyUp={this.onKeyUp}
          ></Input>
        </TabContainer>
        <CardsBody className="py-4 md:py-8 lg:py-12 m-auto">
          <Grid>
            {this[this.state.activeTab]?.map((tool, index) => {
              return (
                <Tool
                  key={tool.title}
                  group={tool.category}
                  title={tool.title}
                  to={tool.to}
                  Icon={tool.Icon}
                  desc={tool.desc}
                  fromColor={tool.fromColor}
                  toColor={tool.toColor}
                  isComingSoon={tool.isComingSoon}
                />
              );
            })}
          </Grid>
        </CardsBody>
      </Layout>
    );
  }
}

export const Divider = () => (
  <div className="divide-y-2 divide-dashed divide-gray-300 py-8 md:py-12">
    {" "}
    <div></div>
    <div></div>
  </div>
);

export const Title = ({ title }) => (
  <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-700 mb-4 md:mb-6">
    {title}
  </h2>
);

export const Grid = ({ children }) => (
  <div className="grid grid-cols-1 gap-8 mt-4 lg:grid-cols-2 xl:grid-cols-3 ">
    {children}
  </div>
);

export const Tool = ({
  Icon,
  title,
  desc,
  to,
  group,
  fromColor,
  toColor,
  isComingSoon,
}) => {
  return !isComingSoon ? (
    <LinkCard
      to={`${isComingSoon ? "#" : to || "/"}`}
      className="flex relative gap-5"
    >
      <div>
        <img width="36px" height="36px" src={User} alt="Avatar" />
      </div>
      <div className="flex gap-2 flex-col	">
        <CardTitle
          className={`uppercase ${group} tracking-wide text-sm font-semibold leading-none flex justify-between`}
        >
          <span> {group || "New"} </span>
          {isComingSoon ? <Chip color="info" label="COMING SOON" /> : null}
        </CardTitle>
        <CardSubTitle
          href="#"
          className="block text-lg xl:text-xl 2xl:text-2xl leading-tight font-medium text-black leading-none"
        >
          {title}
        </CardSubTitle>
        <p className="mt-1 pr-1 text-sm ">{desc} </p>
      </div>
    </LinkCard>
  ) : (
    <ComingSoonCard className="flex relative gap-5">
      <div>
        <img width="36px" height="36px" src={User} alt="Avatar" />
      </div>
      <div className="flex gap-2 flex-col	">
        <CardTitle
          className={`uppercase ${group} tracking-wide text-sm font-semibold leading-none flex justify-between`}
        >
          <span> {group || "New"} </span>
          {isComingSoon ? <Chip color="primary" label="COMING SOON" /> : null}
        </CardTitle>
        <CardSubTitle
          href="#"
          className="block text-lg xl:text-xl 2xl:text-2xl leading-tight font-medium text-black leading-none"
        >
          {title}
        </CardSubTitle>
        <p className="mt-1 pr-1 text-sm ">{desc} </p>
      </div>
    </ComingSoonCard>
  );
};

export default Body;

const LinkCard = styled(Link)`
  background: #ffffff;
  border: 1px solid #eaecf0;
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1),
    0px 1px 2px rgba(16, 24, 40, 0.06);
  height: 185px;
  border-radius: 12px;
  padding: 28px 20px;
  /* background-color:red; */
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    transform: scale(1.05);
  }
  @media only screen and (max-width: 1200px) {
    height: min-content;
  }
`;

const ComingSoonCard = styled.div`
  background: lightgrey;
  cursor: not-allowed;
  border: 1px solid #eaecf0;
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1),
    0px 1px 2px rgba(16, 24, 40, 0.06);
  border-radius: 12px;
  height: 181px;
  padding: 28px 20px;
  height: 185px;
  @media only screen and (max-width: 1200px) {
    height: min-content;
  }
`;

const AddBanner = styled.div`
  background: #fdfdfd;
  border: 1px solid #eaecf0;
  border-radius: 12px;
  padding: 14px 20px;
  gap: 20px;
  margin-top: 16px;

  @media screen and (max-width: 899px) {
    /* display: none; */
    > div {
      flex-direction: column;
      padding: 10px;
    }
  }
`;

const QuestionBanner = styled.div`
  padding: 36px 0px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  span {
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #475467;
  }
`;

const StyledButton = styled.button`
  padding: 10px 16px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 8px;
  height: 40px;
  background: #05bbc2;
  border: 1px solid #04adb4;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 8px;
  color: white;
  font-weight: 600;
`;

const Pill = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 11px;
  color: #667085;
  margin-left: 10px;
  background: #e8e8e8;
  width: 18px;
  height: 20px;
  border-radius: 5px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Header = styled.div`
  display: flex;
  gap: 10px;

  h1 {
    font-family: "Inter";
    font-style: normal;
    font-weight: 600;
    font-size: 30px;
    line-height: 38px;
    color: #101828;
  }
`;

const TextContainer = styled.div`
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 28px;
  color: #101828;
  display: initial;
  text-align: left;
  @media screen and (max-width: 899px) {
    text-align: center;
  }
  span {
    font-weight: 600;
    font-size: 16px;
    line-height: 28px;
    color: #0e9499;
    white-space: nowrap;
  }
`;

const CardTitle = styled.div`
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
  color: ${({ theme }) => {
    return theme.primary;
  }};

  &.Personal {
    color: ${({ theme }) => {
      return theme.personal;
    }};
  }
  &.Business {
    color: ${({ theme }) => {
      return theme.business;
    }};
  }
  &.Education {
    color: ${({ theme }) => {
      return theme.education;
    }};
  }
  &.Programming {
    color: ${({ theme }) => {
      return theme.programming;
    }};
  }
`;

const CardSubTitle = styled.div`
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: #344054;
`;

const FreeTrial = styled.div`
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 28px;
  color: #939393;
`;

const Image = styled.img`
  width: 140px;
  height: 32px;
  margin-right: 60px;
`;

const Tabs = styled.ul`
  @media only screen and (max-width: 600px) {
    font-size: 0.675rem;
  }
  li button.active {
    color: ${({ theme }) => {
      return theme.primary;
    }};
    border-bottom: ${({ theme }) => {
      return `2px solid ${theme.primary}`;
    }};

    div {
      background-color: ${({ theme }) => {
        return theme.primary;
      }};
      color: white;
    }
  }
`;

const Input = styled.input`
  font-size: 16px;
  width: 36px;
  height: 36px;
  border: 1px solid #d0d5dd;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 8px;
  background-image: url(${SearchIcon});
  background-repeat: no-repeat;
  padding: 12px 20px 12px 20px;
  background-position: 10px 7px;
  box-sizing: border-box;
  -webkit-transition: width 0.4s ease-in-out;
  transition: width 0.4s ease-in-out;
  align-self: flex-end;
  &:focus {
    width: 20vw;
    padding: 12px 20px 12px 40px;
  }

  @media only screen and (max-width: 1200px) {
    display: none;
  }
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
