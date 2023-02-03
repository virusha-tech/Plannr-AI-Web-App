import React, { Component } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import CompanyLogo from "../assets/CompanyLogo.svg";
import Dashboard from "../assets/Dashboard.jpg";
import { Helmet } from "react-helmet";
import { Switch, Route, withRouter, Redirect, Link } from "react-router-dom";
import { observer, inject } from "mobx-react";
import { observable, makeObservable } from "mobx";
import { CheckIcon, UserIcon, LockClosedIcon } from "@heroicons/react/outline";
import { SignIn } from "./Signin";
import { SignUp } from "./SignUp";

@inject("store")
@observer
class Auth extends Component {
  @observable email = "";
  @observable password = "";
  @observable fname = "";
  @observable lname = "";
  @observable errorMessage = "";

  constructor() {
    super();
    makeObservable(this);
  }

  onChange = (val) => {
    this.currentPromptOption = val;
    console.log(this.currentPromptOption);
  };

  onChangeAny = (val, attr) => {
    this[attr] = val;
    this.errorMessage = "";
  };

  onLogin = async (e) => {
    try {
      e.preventDefault();
      let data = await this.props.store.api
        .post("/auth/signin", {
          email: this.email,
          password: this.password,
        })
        .then(({ data }) => data);
      this.props.store.loginWithDataTokenAndProfile(data);
    } catch (err) {
      console.log(err);
      console.log(err?.response?.data?.message);
      if (err?.response?.data?.message) {
        this.errorMessage = err?.response?.data?.message;
      }
    }
  };

  onSignup = async (e) => {
    try {
      debugger;
      e.preventDefault();
      this.errorMessage = "";
      console.log("signup");
      let data = await this.props.store.api
        .post("/auth/signup", {
          email: this.email,
          password: this.password,
          fname: this.fname,
          lname: this.lname,
          referral: this.props.store.referral,
        })
        .then(({ data }) => data);
      console.log(`onSignup`, data);
      if (data.token && data.profile) {
        this.props.store.loginWithDataTokenAndProfile(data);
      }
    } catch (err) {
      console.log(err);
      console.log(err?.response?.data?.message);
      if (err?.response?.data?.message) {
        this.errorMessage = err?.response?.data?.message;
      }
    }
  };

  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      prevArrow: <SlickArrowLeft />,
      nextArrow: <SlickArrowRight />,
    };

    return (
      <>
        <Helmet>
          <title>{`Login - OpenAI Template`}</title>
        </Helmet>
        <div className="flex">
          <Leftarea className="h-screen flex flex-col justify-between flex-1">
            <AuthForm>
              <img src={CompanyLogo} alt="Company Logo" />
              <div className="px-4">
                <Switch>
                  <Route path="/login">
                    <SignIn
                      landingPageUrl={this.props.store.landingPageUrl}
                      email={this.email}
                      password={this.password}
                      signUp={this.signUpWithGoogle}
                      onChange={this.onChangeAny}
                      onLogin={this.onLogin}
                    />
                  </Route>
                  <Route path="/signup">
                    <SignUp
                      email={this.email}
                      password={this.password}
                      fname={this.fname}
                      lname={this.lname}
                      onChange={this.onChangeAny}
                      onSignup={this.onSignup}
                    />
                  </Route>
                  <Route>
                    <Route>
                      <Redirect to="/login" />
                    </Route>
                  </Route>
                </Switch>
                {this.errorMessage ? (
                  <div className="text-red-600 bg-red-50 rounded-md p-1 text-center mt-4">
                    {this.errorMessage}
                  </div>
                ) : null}
              </div>
            </AuthForm>
            <CopyRight className="ml-8 mb-8">© Plannr.ai 2023</CopyRight>
          </Leftarea>
          <Rightarea className="h-screen hidden md:block flex-1 ">
            <Wrapper>
              <StyledSlider {...settings}>
                <div>
                  <img src={Dashboard} alt="Banner1" />
                  <SliderImageInfo>
                    <h3>Welcome to Plannr.ai</h3>
                    <span>
                      Take Your Planning to the Next Level with Our Advanced
                      AI-Driven Tool
                    </span>
                  </SliderImageInfo>
                </div>
                <div>
                  <img src={Dashboard} alt="Banner1" />

                  <SliderImageInfo>
                    <h3>Unleash the Power of Planning with Plannr AI</h3>
                    <span>
                      Revolutionize your planning process with our cutting-edge
                      AI-powered tool
                    </span>
                  </SliderImageInfo>
                </div>
                <div>
                  <img src={Dashboard} alt="Banner1" />
                  <SliderImageInfo>
                    <h3>AI-Powered Planning with Plannr</h3>
                    <span>
                      Streamline your planning process with Plannr's advanced AI
                      technology, tailored to meet your specific needs
                    </span>
                  </SliderImageInfo>
                </div>
                <div>
                  <img src={Dashboard} alt="Banner1" />
                  <SliderImageInfo>
                    <h3>Unlock Smarter Planning with Plannr AI</h3>
                    <span>
                      Revolutionize the way you plan with our AI-powered tool
                      for large enterprises and organizations
                    </span>
                  </SliderImageInfo>
                </div>
                <div>
                  <img src={Dashboard} alt="Banner1" />
                  <SliderImageInfo>
                    <h3>Welcome to Plannr.ai</h3>
                    <span>
                      Take Your Planning to the Next Level with Our Advanced
                      AI-Driven Tool
                    </span>
                  </SliderImageInfo>
                </div>
              </StyledSlider>
            </Wrapper>
          </Rightarea>
        </div>
      </>
    );
  }
}

export default Auth;

const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
  <SlickArrowLeftButton
    {...props}
    className={
      "slick-prev slick-arrow" + (currentSlide === 0 ? " slick-disabled" : "")
    }
    aria-hidden="true"
    aria-disabled={currentSlide === 0 ? true : false}
    type="button"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-5 h-5"
    >
      <path
        fillRule="evenodd"
        d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
        clipRule="evenodd"
      />
    </svg>
  </SlickArrowLeftButton>
);

const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
  <SlickArrowRightButton
    {...props}
    className={
      "slick-next slick-arrow" +
      (currentSlide === slideCount - 1 ? " slick-disabled" : "")
    }
    aria-hidden="true"
    aria-disabled={currentSlide === slideCount - 1 ? true : false}
    type="button"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-5 h-5"
    >
      <path
        fillRule="evenodd"
        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
        clipRule="evenodd"
      />
    </svg>
  </SlickArrowRightButton>
);

const SlickArrowLeftButton = styled.button`
  &:before {
    display: none;
  }
`;

const SlickArrowRightButton = styled(SlickArrowLeftButton)``;

const Leftarea = styled.div`
  background: white;
  width: 50vw;
`;

const AuthForm = styled.div`
  display: flex;
  padding: 100px 10vw 0px;
  @media (max-width: 1200px) {
    padding: 100px 5vw 0px;
  }
  flex-direction: column;
  background: white;
  img {
    width: 140px;
  }
`;

const CopyRight = styled.span`
  color: ${({ theme }) => {
    return theme.gray;
  }};
`;

const Rightarea = styled.div`
  background: linear-gradient(45deg, #222222 0%, #424242 100%);
  padding: 30vh 0;
  width: 50vw;
`;

const Wrapper = styled.div`
  margin: 0 auto;
  width: 80%;
  img {
    width: 450px;
    height: 300px;
    @media (max-width: 1200px) {
      width: 300px;
      height: 200px;
    }
  }
`;

const SliderImageInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  // width: 400px;
  margin: 0 auto;
  color: white;
  h3 {
    font-family: "Inter";
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 30px;
    text-align: center;
    margin: 50px 0 10px;
    @media (max-width: 1200px) {
      font-size: 18px;
    }
  }
  span {
    text-align: center;
    margin: 10px 0 20px;
    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    color: rgba(255, 255, 255, 0.7);
    padding: 0 20px;
    @media (max-width: 1200px) {
      font-size: 14px;
    }
  }
`;

const StyledSlider = styled(Slider)`
  .slick-slide img {
    margin: auto;
  }

  .slick-arrow.slick-prev {
    display: block;
    z-index: 100;
    /* position: relative;
  bottom: -516px;
  left: 200px; */
    color: white;
  }

  .slick-arrow.slick-next {
    display: block;
    z-index: 100;
    /* position: relative;
  left: 550px;
  bottom: -34px; */
    color: white;
  }

  .slick-slider.slick-initialized {
    width: 40vw;
  }

  .slick-dots li button:before {
    font-family: "slick";
    font-size: 10px;
    line-height: 20px;
    color: ${({ theme }) => {
      return `${theme.primary}  !important`;
    }};
    opacity: 1;
    background-color: transparent;
    overflow: hidden;
  }

  .slick-dots li.slick-active button:before {
    color: white !important;
  }
`;


