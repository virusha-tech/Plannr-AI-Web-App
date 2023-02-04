import { observer } from "mobx-react";
import styled from "styled-components";

export const SignUp = observer(
  ({ active, email, password, fname, lname, onChange, onSignup }) => {
    return (
      <>
        <SignUpForm onSubmit={onSignup}>
          <div>
            <div className="text-4xl font-medium text-black-900">Sign Up</div>
            <p>Create your account.</p>
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
          </div>
        </SignUpForm>
      </>
    );
  }
);

const SignUpForm = styled.form`
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
  button {
  }
`;

const SignUpButton = styled.button`
  background: ${({ theme }) => {
    return `${theme.primary_gradient},${theme.secondary_gradient}`;
  }};
`;