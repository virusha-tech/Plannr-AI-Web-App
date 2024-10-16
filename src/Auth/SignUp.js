import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import GoogleLogo from "../assets/GoogleLogo.svg";

export const SignUp = observer(
  ({
    active,
    email,
    password,
    fname,
    lname,
    onChange,
    onSignup,
    onGoogleLogin,
  }) => {
    return (
      <SignUpWrapper>
        <SignUpForm onSubmit={onSignup} className="mb-10">
          <div>
            <div className="text-4xl font-medium text-black-900 mobile_login_text">
              Sign Up
            </div>
            <p className="welcome_text">Create your account.</p>
            <div className="mt-2 lg:flex">
              <div className="flex flex-col min-w-0 md:pr-2 flex-1">
                <label>First Name</label>
                <input
                  value={fname}
                  onChange={(e) => onChange(e.target.value, "fname")}
                  type="text"
                  className="rounded-md text-lg px-4 py-2  border border-gray-300 inline-block w-auto"
                  placeholder="John"
                />
              </div>
              <div className="flex flex-col min-w-0 lg:pl-2 flex-1">
                <label>Last Name</label>
                <input
                  value={lname}
                  onChange={(e) => onChange(e.target.value, "lname")}
                  type="text"
                  className="rounded-md text-lg px-4 py-2  border border-gray-300 inline-block w-auto"
                  placeholder="Smith"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label>Email Address</label>
              <input
                value={email}
                onChange={(e) => onChange(e.target.value, "email")}
                focus="true"
                type="email"
                className="rounded-md text-lg px-4 py-2  border border-gray-300 "
                placeholder="john@smith.com"
              />
            </div>
            <div className="flex flex-col">
              <label>Password</label>
              <input
                value={password}
                onChange={(e) => onChange(e.target.value, "password")}
                type="password"
                className="rounded-md text-lg px-4 py-2  border border-gray-300 inline-block"
                placeholder="••••••••"
              />
            </div>
            <div className="flex flex-col">
              <SignUpButton
                type="submit"
                className="hover:bg-green-600 bg-green-500 font-medium rounded-lg text-lg px-4 py-2 bg-gray-200 text-white mt-4 border border-gray-300 inline-block"
              >
                Sign Up
              </SignUpButton>
            </div>
            <div className="flex flex-col">
              <button
                type="button"
                onClick={onGoogleLogin}
                className="text-center relative inline-flex items-center justify-center p-0.5 mt-3 text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
              >
                <GoogleImage
                  className="h-4"
                  src={GoogleLogo}
                  alt="Google Logo"
                />
                Continue with Google
              </button>
            </div>
          </div>
        </SignUpForm>
        <span className="flex justify-center items-center">
          Already have an account? &nbsp;
          <SignInAnchor to={`/login`}>Sign in</SignInAnchor>
        </span>
        <Footer>© 2023 Plannr.ai All rights reserved.</Footer>
      </SignUpWrapper>
    );
  }
);

const SignUpWrapper = styled.div`
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
`;

const Footer = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 24px;
  text-align: center;
  color: #667085;
  margin-top: 20px;
  display: none;

  @media only screen and (max-width: 600px) {
    display: block;
  }
`;

const GoogleImage = styled.img`
  width: 40px !important;
  height: 24px;
`;

const SignInAnchor = styled(Link)`
  background: white;
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => {
    return theme.primary;
  }};
`;

const SignUpForm = styled.form`
  text-align: left;

  p {
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #475467;
    margin-top: 12px;
  }
  label {
    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    margin: 20px 0px 8px;
    color: #344054;
  }
  @media only screen and (max-width: 600px) {
    padding: 16px;
    .mobile_login_text {
      font-style: normal;
      font-weight: 600;
      font-size: 24px;
      line-height: 44px;
      letter-spacing: -0.02em;
      color: #101828;
    }
  }
`;

const SignUpButton = styled.button`
  background: ${({ theme }) => {
    return `${theme.primary_gradient},${theme.secondary_gradient}`;
  }};
`;
