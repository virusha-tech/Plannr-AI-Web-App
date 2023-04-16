import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { Layout } from "./Layout";
import Admin from "../assets/admin-avtar.png";

function AdminDashboard() {
  return (
    <Layout>
      <Helmet>
        <title>{`AdminDashboard - Plannr AI`}</title>
      </Helmet>
      <SubHeader>
        <div>
          <img width="36px" height="36px" src={Admin} alt="AdminAvatar" />
          <h1>Admin Dashboard</h1>
        </div>
        <p>
          Generate Customized Plans with Plannr.ai using OpenAI’s Language Model
        </p>
      </SubHeader>
    </Layout>
  );
}

export default AdminDashboard;

const SubHeader = styled.div`
  display: flex;
  flex-direction: column;
  > div {
    display: flex;
    gap: 10px;
    align-items: center;

    h1 {
      font-style: normal;
      font-weight: 600;
      font-size: 30px;
      line-height: 38px;
      color: #101828;
    }
  }
`;
