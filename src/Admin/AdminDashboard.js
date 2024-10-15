import React, { Component } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { Layout } from "./Layout";
import Admin from "../assets/admin-avtar.png";
import { observer, inject } from "mobx-react";

@inject("store")
@observer
class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // rows: [],
      // count: 0,
      data: null,
      isLoading: true,
    };

    // this.handleOutput = this.handleOutput.bind(this);
    // this.handleNewPlanCreation = this.handleNewPlanCreation.bind(this);
    // this.handleChangePage = this.handleChangePage.bind(this);
  }

  componentDidMount() {
    const fetchData = async () => {
      const promises = [
        this.props.store.api.get("/getAdminDashBoardInformation"),
        this.props.store.api.get("/getAdminDashBoardInformation/plansGrouping"),
        this.props.store.api.get("/getAdminDashBoardInformation/moneyFigures"),
        this.props.store.api.get(
          "/getAdminDashBoardInformation/productGrouping"
        ),
      ];
      const results = await Promise.allSettled(promises);
      const data = results
        .filter((result) => result.status === "fulfilled")
        .map((result) => result.value.data);

      this.setState({
        isLoading: false,
        data,
      });
      // console.log(data);
    };

    fetchData();
  }

  render() {
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
            Generate Customized Plans with Plannr.ai using OpenAI’s Language
            Model
          </p>
        </SubHeader>
        {this.state.isLoading ? (
          "Loading"
        ) : (
          <div style={{ margin: "40px 0px" }}>
            <div>
              <span>
                <strong>TotalUsersSignedInToday: </strong>
              </span>
              <span>{this.state.data[0].totalusersSignedInToday}</span>
            </div>
            <div>
              <span>
                <strong>TotalUsersSignedInSoFar: </strong>
              </span>
              <span>{this.state.data[0].totalUsersSignedInSoFar}</span>
            </div>
            <div>
              <span>
                <strong>TotalPlansCreatedToday: </strong>
              </span>
              <span>{this.state.data[0].totalPlansCreatedToday}</span>
            </div>
            <div>
              <span>
                <strong>TotalPlansCreatedSoFar: </strong>
              </span>
              <span>{this.state.data[0].totalPlansCreatedSoFar}</span>
            </div>
            {this.state.data[1].plans.map(({ planName, count }) => {
              return (
                <div>
                  <span>
                    <strong>{planName}: </strong>
                  </span>
                  <span>{count}</span>
                </div>
              );
            })}
            <div>
              <span>
                <strong>Available Amount: </strong>
              </span>
              <span>{this.state.data[2].availableAmount}</span>
            </div>
            <div>
              <span>
                <strong>Hold Amount: </strong>
              </span>
              <span>{this.state.data[2].pendingAmount}</span>
            </div>
            {this.state.data[3].products.map(({ plan, count }) => {
              return (
                <div>
                  <span>
                    <strong>{plan}: </strong>
                  </span>
                  <span>{count}</span>
                </div>
              );
            })}
          </div>
        )}
      </Layout>
    );
  }
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
