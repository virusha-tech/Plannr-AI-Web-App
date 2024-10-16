import React from "react";
import styled from "styled-components";
import CompanyLogo from "./assets/CompanyLogo.svg";

function Footer() {
  return (
    <StyleFooter>
      <Image src={CompanyLogo} alt="Company Logo" className="flex-none" />
      <div>© 2023 Plannr.ai All rights reserved.</div>
    </StyleFooter>
  );
}

export default Footer;

const StyleFooter = styled.div`
  height: 6vh;
  padding: 10px 120px;
  background: #fafafa;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #667085;
  @media only screen and (max-width: 1200px) {
    padding: 10px 40px;

    > div {
      font-size: 14px;
    }
  }
  @media only screen and (max-width: 600px) {
    justify-content: center;
    padding: 1vh 4%;
  }
`;

const Image = styled.img`
  width: 140px;
  height: 32px;
  margin-right: 60px;

  @media only screen and (max-width: 1200px) {
    width: 90px;
  }

  @media only screen and (max-width: 600px) {
    display:none !important;
  }
`;
