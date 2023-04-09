import React, { Component } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import CompanyLogo from "../assets/CompanyLogo.svg";
import Courasel1 from "../assets/Courasel1.svg";
import Courasel2 from "../assets/Courasel2.svg";
import Courasel3 from "../assets/Courasel3.svg";
import { Helmet } from "react-helmet";
import {
  Switch,
  Route,
  withRouter,
  Redirect,
  Link,
  NavLink,
} from "react-router-dom";
import { observer, inject } from "mobx-react";
import { observable, makeObservable } from "mobx";
import { SignIn } from "./Signin";
import { SignUp } from "./SignUp";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { NotificationManager } from "react-notifications";
import { firebaseAuth } from "./firebase";
import mixpanel from "mixpanel-browser";
import { Button } from "@mui/material";

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
    this.state = {
      isSplashScreen: true,
    };
    this.handleLoginClick = this.handleLoginClick.bind(this);
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
      window.gtag("event", "login", {
        event_category: "access",
        event_label: "Log in button clicked",
      });
      mixpanel.track("Client Log in Start", {
        email: this.email,
      });

      let data = await this.props.store.api
        .post("/auth/signin", {
          email: this.email,
          password: this.password,
        })
        .then(({ data }) => {
          window.gtag("event", "loginsuccess", {
            event_category: "access",
            event_label: "Log in successful",
          });

          mixpanel.track("Client Log in Success", {
            fname: data["profile"]["fname"],
            lname: data["profile"]["lname"],
            email: data["profile"]["email"],
          });

          return data;
        });

      this.props.store.loginWithDataTokenAndProfile(data, this.props.history);
    } catch (err) {
      mixpanel.track("Client Log in Error", {
        email: this.email,
      });
      console.log(err);
      console.log(err?.response?.data?.message);
      if (err?.response?.data?.message) {
        this.errorMessage = err?.response?.data?.message;
      }
    }
  };

  async signInWithGoogle(provider, type, cb) {
    try {
      const result = await signInWithPopup(firebaseAuth, provider);
      const user = result.user;
      const fullName = user.displayName;
      const names = fullName.split(" ");
      const firstName = names[0];
      const lastName = names[names.length - 1];
      const email = user.email;
      cb({
        firstName,
        lastName,
        email,
        password: user.uid,
      });
    } catch (err) {
      NotificationManager.error("Authentication Error. Please try again");
      mixpanel.track("Client Google Sign Up Error");
    }
  }

  onGoogleLogin = async () => {
    let provider = new GoogleAuthProvider();
    let type = "google";
    window.gtag("event", "Google Login Start");
    mixpanel.track("Client Google Login Start");
    this.signInWithGoogle(provider, type, async (userInfo) => {
      let data = await this.props.store.api
        .post("/auth/signInWithGoogle", {
          email: userInfo.email,
          fname: userInfo.firstName,
          lname: userInfo.lastName,
          password: userInfo.password,
        })
        .then(({ data }) => {
          mixpanel.track("Client Google Login Success", {
            email: userInfo.email,
            fname: userInfo.firstName,
            lname: userInfo.lastName,
          });
          window.gtag("event", "Google Login Success");
          return data;
        });

      if (data.token && data.profile) {
        this.props.store.loginWithDataTokenAndProfile(data, this.props.history);
      }
    });
  };

  onSignup = async (e) => {
    try {
      e.preventDefault();
      this.errorMessage = "";

      window.gtag("event", "signup", {
        event_category: "access",
        event_label: "Sign up button clicked",
      });

      mixpanel.track("Client Sign Up Start", {
        email: this.email,
        fname: this.fname,
        lname: this.lname,
      });

      let data = await this.props.store.api
        .post("/auth/signup", {
          email: this.email,
          password: this.password,
          fname: this.fname,
          lname: this.lname,
          referral: this.props.store.referral,
        })
        .then(({ data }) => {
          window.gtag("event", "signupsuccess", {
            event_category: "access",
            event_label: "Sign up successful",
          });
          mixpanel.track("Client Sign Up Success", {
            email: this.email,
            fname: this.fname,
            lname: this.lname,
          });
          return data;
        });
      if (data.token && data.profile) {
        this.props.store.loginWithDataTokenAndProfile(data);
      }
    } catch (err) {
      console.log(err);
      mixpanel.track("Client Sign Up Error", {
        email: this.email,
        fname: this.fname,
        lname: this.lname,
      });
      console.log(err?.response?.data?.message);
      if (err?.response?.data?.message) {
        this.errorMessage = err?.response?.data?.message;
      }
    }
  };

  handleGoogleLogin() {
    this.onGoogleLogin();
  }
  handleLoginClick = () => {
    this.setState({ isSplashScreen: false });
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
          <title>{`Login - Plannr AI`}</title>
        </Helmet>
        {window.innerWidth > 600 ? (
          <Desktop className="flex">
            <Leftarea className="h-screen flex flex-col justify-between flex-1">
              <AuthForm>
                <img src={CompanyLogo} alt="Company Logo" />
                <div>
                  <Switch>
                    <Route path="/login">
                      <SignIn
                        landingPageUrl={this.props.store.landingPageUrl}
                        email={this.email}
                        password={this.password}
                        signUp={this.signUpWithGoogle}
                        onGoogleLogin={this.onGoogleLogin}
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
                        onGoogleLogin={this.onGoogleLogin}
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
            <Rightarea className="h-screen flex-1 ">
              <Wrapper>
                <StyledSlider {...settings}>
                  <div>
                    <img
                      src={Courasel1}
                      alt="Banner1"
                      className="courasel_image"
                    />
                    <SliderImageInfo>
                      <h3>Say “Hello” to Plannr AI</h3>
                      <span>
                        Take Your Planning to the Next Level with Our Advanced
                        AI-Driven Tool
                      </span>
                    </SliderImageInfo>
                  </div>
                  <div>
                    <img
                      src={Courasel2}
                      alt="Banner1"
                      className="courasel_image"
                    />
                    <SliderImageInfo>
                      <h3>AI-Powered Planning with Plannr AI</h3>
                      <span>
                        Streamline your planning process with Plannr's advanced
                        AI technology, tailored to meet your specific needs
                      </span>
                    </SliderImageInfo>
                  </div>
                  <div>
                    <img
                      src={Courasel3}
                      alt="Banner1"
                      className="courasel_image"
                    />
                    <SliderImageInfo>
                      <h3>Unleash the power of Planning with Plannr AI</h3>
                      <span>Unleash the power of Planning with Plannr AI</span>
                    </SliderImageInfo>
                  </div>
                </StyledSlider>
              </Wrapper>
            </Rightarea>
          </Desktop>
        ) : (
          <Mobile>
            <LogoWrapper>
              <img src={CompanyLogo} alt="Company Logo" />
            </LogoWrapper>
            <MainWrapper>
              <Switch>
                <Route path="/login" exact>
                 {
                  this.state.isSplashScreen?
                  <HomeScreen
                    settings={settings}
                    onLoginClick={this.handleLoginClick}
                  />
                  :
<SignIn
                    landingPageUrl={this.props.store.landingPageUrl}
                    email={this.email}
                    password={this.password}
                    signUp={this.signUpWithGoogle}
                    onGoogleLogin={this.onGoogleLogin}
                    onChange={this.onChangeAny}
                    onLogin={this.onLogin}
                  />
                 }
                  

                  
                </Route>
                <Route path="/signup" exact>
                  <SignUp
                    email={this.email}
                    password={this.password}
                    fname={this.fname}
                    lname={this.lname}
                    onChange={this.onChangeAny}
                    onSignup={this.onSignup}
                    onGoogleLogin={this.onGoogleLogin}
                  />
                </Route>
                {/* <Route path="/" exact>
                </Route> */}
                <Route path="/">
                  <Redirect to="/login" />
                </Route>
              </Switch>
            </MainWrapper>
          </Mobile>
        )}
      </>
    );
  }
}

export default withRouter(Auth);

const HomeScreen = withRouter(({ history, settings, onLoginClick }) => {
  return (
    <div className="homescreenWrapper">
      <div className="courasel">
        <Wrapper>
          <StyledSlider {...settings}>
            <div>
              <img src={Courasel1} alt="Banner1" className="courasel_image" />
              <SliderImageInfo>
                <h3>Say “Hello” to Plannr AI</h3>
                <span>
                  Take Your Planning to the Next Level with Our Advanced
                  AI-Driven Tool
                </span>
              </SliderImageInfo>
            </div>
            <div>
              <img src={Courasel2} alt="Banner1" className="courasel_image" />
              <SliderImageInfo>
                <h3>AI-Powered Planning with Plannr AI</h3>
                <span>
                  Streamline your planning process with Plannr's advanced AI
                  technology, tailored to meet your specific needs
                </span>
              </SliderImageInfo>
            </div>
            <div>
              <img src={Courasel3} alt="Banner1" className="courasel_image" />
              <SliderImageInfo>
                <h3>Unleash the power of Planning with Plannr AI</h3>
                <span>Unleash the power of Planning with Plannr AI</span>
              </SliderImageInfo>
            </div>
          </StyledSlider>
        </Wrapper>
      </div>
      <div className="action_btn">
        <div className="account_creation_btns">
          <LoginButton variant="contained" onClick={() => onLoginClick()}>
            Login
          </LoginButton>
          <SignUpButton
            variant="outlined"
            onClick={() => history.push("/signup")}
          >
            Sign Up
          </SignUpButton>
        </div>
        <div className="guest_checkin_btn">
          <StyledNavLink to="#">Continue as guest</StyledNavLink>
        </div>
      </div>
    </div>
  );
});

const MainWrapper = styled.div`
  min-height: 92vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  gap: 2vh;
  overflow: scroll;
  margin-top: 8vh;

  .homescreenWrapper {
    background: #05bbc2;
    padding: 16px;
    height: 92vh;
    display: flex;
    flex-direction: column;
    gap: 2vh;
  }

  .courasel {
    /* height: max-content; */
    background: linear-gradient(45deg, #222222 0%, #424242 100%);
    padding: 4vh 2vh;
    border-radius: 16px;
    flex: 0.75;
  }
  .action_btn {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 0.25;
    .account_creation_btns {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
  }
`;

const LoginButton = styled(Button)`
  background: #ffffff !important;
  border: 1px solid #d0d5dd !important;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.25) !important;
  border-radius: 8px !important;
  color: black !important;
  font-weight: 700 !important;
`;

const StyledNavLink = styled(Link)`
  color: white !important;
  text-decoration: underline;
`;
const SignUpButton = styled(Button)`
  border: 1px solid #ffffff !important;
  filter: drop-shadow(0px 1px 2px rgba(16, 24, 40, 0.05)) !important;
  border-radius: 8px !important;
  color: white !important;
  font-weight: 700 !important;
`;

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

const Desktop = styled.button`
  @media only screen and (max-width: 600px) {
    display: none;
  }
`;

const Mobile = styled.button`
  @media only screen and (max-width: 600px) {
    display: block;
  }
`;

const LogoWrapper = styled.div`
  width: 100%;
  height: 8vh;
  background: #ffffff;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.25);
  display: grid;
  place-items: center;
  position: fixed;
  img {
    width: 136px;
    height: 28px;
    margin: auto;
  }
`;

const SlickArrowLeftButton = styled.div`
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
  > img {
    width: 180px;
    height: 38px;
    margin-bottom: 85px;
  }
`;

const CopyRight = styled.span`
  color: ${({ theme }) => {
    return theme.gray;
  }};
`;

const Rightarea = styled.div`
  background: linear-gradient(45deg, #222222 0%, #424242 100%);
  padding: 20vh 0;
  width: 50vw;
`;

const Wrapper = styled.div`
  margin: 0 auto;
  width: 80%;
  img {
    width: 550px;
    // height: 3500px;
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
  .courasel_image {
    height: 300px !important;
    @media only screen and (max-width: 600px) {
      height: 140px !important;
    }
  }
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
