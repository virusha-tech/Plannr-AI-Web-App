import React from "react";
import styled from "styled-components";
import CompanyLogo from "./assets/CompanyLogo.png";

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
  height: 8vh;
  padding: 10px 120px;
  background: white;
  display: flex;
  justify-content: space-between;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #667085;
`;

const Image = styled.img`
  width: 140px;
  height: 32px;
  margin-right: 60px;
`;
