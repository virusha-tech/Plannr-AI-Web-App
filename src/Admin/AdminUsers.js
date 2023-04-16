import React, { Component } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { observer, inject } from "mobx-react";
import { withRouter } from "react-router-dom";
import moment from "moment";
import { EnhancedTable } from "./UsersDB";
import GeneratingSpinner from "../Core/Editor/GeneratingSpinner";
import { Layout } from "./Layout";

function createData(
  creditsUsed,
  email,
  fname,
  lname,
  profilePhoto,
  created,
  plan,
  planCount,
  _id
) {
  return {
    created: moment(created).format("D MMM, YYYY"),
    creditsUsed,
    email,
    fname,
    lname,
    profilePhoto,
    plan,
    planCount,
    id: _id,
  };
}

@inject("store")
@observer
class SavedPlans extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      count: 0,
      isLoading: true,
    };

    this.handleOutput = this.handleOutput.bind(this);
    this.handleNewPlanCreation = this.handleNewPlanCreation.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
  }

  handleNewPlanCreation = (plan) => {
    this.props.history.push("/");
  };

  handleOutput = (id) => {
    this.props.history.push(`/admin/user/${id}`);
  };

  componentDidMount() {
    const getPlannerHistory = async () => {
      const users = await await this.props.store.api.get(
        "/getMyUsers?page=1&pageSize=10"
      );

      const rows = users.data.data.map((user) => {
        const {
          creditsUsed,
          email,
          fname,
          lname,
          profilePhoto,
          created,
          plan,
          planCount,
          _id,
        } = user;
        return createData(
          creditsUsed,
          email,
          fname,
          lname,
          profilePhoto,
          created,
          plan,
          planCount,
          _id
        );
      });

      this.setState({
        rows,
        isLoading: false,
        count: users.data.count,
      });
    };
    getPlannerHistory();
  }

  async handleChangePage(pageNumber, pageSize = 10, cb) {
    const users = await await this.props.store.api.get(
      `/getMyUsers?page=${pageNumber + 1}&pageSize=${pageSize}`
    );
    const rows = users.data.data.map((user) => {
      const {
        creditsUsed,
        email,
        fname,
        lname,
        profilePhoto,
        created,
        plan,
        planCount,
        _id,
      } = user;
      return createData(
        creditsUsed,
        email,
        fname,
        lname,
        profilePhoto,
        created,
        plan,
        planCount,
        _id
      );
    });

    this.setState(
      {
        rows,
        isLoading: false,
        count: users.data.count,
      },
      () => {
        cb();
      }
    );
  }

  render() {
    return (
      <Layout>
        {this.state.isLoading ? (
          <GeneratingSpinner showLoader={true}>
            Finding your users History...
          </GeneratingSpinner>
        ) : this.state.count ? (
          <TableWrapper>
            <Helmet>
              <title>{`AdminDashboard Users - Plannr AI`}</title>
            </Helmet>
            <EnhancedTable
              rows={this.state.rows}
              count={this.state.count}
              handleChangePage={this.handleChangePage}
              handleOutput={this.handleOutput}
            />
          </TableWrapper>
        ) : (
          <Center>
            <Helmet>
              <title>{`AdminDashboard Users - Plannr AI`}</title>
            </Helmet>
            <h1>No plan created yet!</h1>
            <span>
              Oops! you do not have any saved plans. Start creating one by
              clicking on the link below
            </span>
            <button type="button" onClick={this.handleNewPlanCreation}>
              Create New
            </button>
          </Center>
        )}
      </Layout>
    );
  }
}

export default withRouter(SavedPlans);
const TableWrapper = styled.div`
  height: 100%;
  padding-top: 2%;
`;

const Heading = styled.h1`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 30px;
`;
const Center = styled.div`
  background: white;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: #fafafa;
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
  > button {
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
