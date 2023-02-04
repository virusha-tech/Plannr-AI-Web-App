import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Footer from "./Footer";

function SavedPlans() {
  return (
    <>
      <MainContainer>
        <Helmet>
          <title>{`Tools - OpenAI Template`}</title>
        </Helmet>
        <h1>Saved Plans</h1>
        <span>
          Oops! you do not have any saved plans. Start creating one by clicking
          on the link below
        </span>
        <button type="button">Create New</button>
      </MainContainer>
      <Footer />
    </>
  );
}

export default SavedPlans;

const MainContainer = styled.div`
  padding: 10px 120px;
  background: white;
  min-height: 83vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 0px;
  h1 {
    font-family: "Inter";
    font-style: normal;
    font-weight: 600;
    font-size: 30px;
    line-height: 38px;
    text-align: center;
    color: #101828;
  }
  span {
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    color: #475467;
    margin-top: 4px;

  }
  button {
    font-family: "Inter";
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    color: #ffffff;
    width: 112px;
    height: 40px;
    border: 1px solid #04adb4;
    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
    border-radius: 8px;
    margin-top: 32px;

    background-color: ${({ theme }) => {
      return theme.primary;
    }};
  }
`;
