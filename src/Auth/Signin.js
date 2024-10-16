import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import GoogleLogo from "../assets/GoogleLogo.svg";

export const SignIn = observer(
  ({
    active,
    email,
    password,
    onChange,
    onLogin,
    landingPageUrl,
    onGoogleLogin,
  }) => {
    return (
      <>
        <SignInform onSubmit={onLogin}>
          <div>
            <div className="text-4xl font-medium text-black-900 mobile_login_text">
              Log in
            </div>
            <p className="welcome_text">
              Welcome back! Please enter your details.
            </p>
            <div className="flex flex-col flex-1">
              <label>Email</label>
              <input
                value={email}
                onChange={(e) => onChange(e.target.value, "email")}
                focus="true"
                type="email"
                className="rounded-md text-lg px-4 py-2  border border-gray-300 "
                placeholder="Enter your email"
              />
            </div>
            <div className="flex flex-col flex-1">
              <label>Password</label>
              <input
                value={password}
                onChange={(e) => onChange(e.target.value, "password")}
                type="password"
                className="rounded-md text-lg px-4 py-2  border border-gray-300 inline-block"
                placeholder="••••••••"
              />
            </div>
            <div className="flex flex-1 items-center mt-4 justify-between">
              <div>
                <label>
                  <input
                    id="remember"
                    className="mr-3"
                    // value={password}
                    // onChange={(e) => onChange(e.target.value, "password")}
                    type="checkbox"
                  />
                  Remeber for 30 days
                </label>
              </div>
              <ForgotPasswordLink to={`/contact`}>
                Forgot Password
              </ForgotPasswordLink>
            </div>
            <div className="flex flex-col">
              <SignInButton
                type="submit"
                className="hover:bg-gray-600 font-medium rounded-lg text-lg px-4 py-2 bg-gray-500 text-white mt-4 border border-gray-300 inline-block text-lg bg-primary px-5 py-2.5"
              >
                Sign in
              </SignInButton>
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
                Sign in with Google
              </button>

              <span className="mt-10 text-center">
                Don’t have an account? &nbsp;
                <SignInAnchor to={`/signup`}>Sign up</SignInAnchor>
              </span>
              <Footer>© 2023 Plannr.ai All rights reserved.</Footer>
            </div>
          </div>
        </SignInform>
      </>
    );
  }
);

const Footer = styled.div`
  position: absolute;
  bottom: 15px;
  left: 0;
  right: 0;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 24px;
  text-align: center;
  color: #667085;
  display: none;

  @media only screen and (max-width: 600px) {
    display: block;
  }
`;

const SignInform = styled.form`
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
    /* identical to box height, or 143% */

    /* Gray/700 */
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

const GoogleImage = styled.img`
  width: 40px !important;
  height: 24px;
`;

const SignInButton = styled.button`
  background: ${({ theme }) => {
    return `${theme.primary_gradient},${theme.secondary_gradient}`;
  }};
`;

const ForgotPasswordLink = styled(Link)`
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
