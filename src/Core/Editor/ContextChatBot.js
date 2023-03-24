import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ChatBot, { Loading } from "react-simple-chatbot";
import styled from "styled-components";
import Bot from "../../assets/Bot.svg";
import User from "../../assets/User.png";
import { observer, inject } from "mobx-react";
import { toJS } from "mobx";

@inject("store")
@observer
class Answer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      answer: "",
      trigger: false,
    };
  }

  async componentDidMount() {
    let response = await this.props.store.api.post("/ai/subsequentQuestion", {
      conversation: [
        ...toJS(this.props.store.chatLogs),
        {
          role: "user",
          content: this.props.steps.question.value,
        },
      ],
    });
    this.props.store.setChatLogs([
      {
        role: "user",
        content: this.props.steps.question.value,
      },
      {
        role: "assistant",
        content: response.data.answer,
      },
    ]);

    this.setState(
      {
        loading: false,
        answer: response.data.answer,
        trigger: true,
      },
      () => {
        this.props.triggerNextStep();
      }
    );
  }
  render() {
    return (
      <StyledContainer>
        {this.state.loading ? <Loading /> : this.state.answer}
      </StyledContainer>
    );
  }
}

const StyledContainer = styled.div`
  background: "red";
`;

Answer.propTypes = {
  steps: PropTypes.object,
  triggerNextStep: PropTypes.func,
};

Answer.defaultProps = {
  steps: undefined,
  triggerNextStep: undefined,
};

const ExampleDBPedia = React.memo(
  ({ initialContext, additionalSystemTextForChatBot, store }) => {
    useEffect(() => {
      store.initializeChatLogs([
        {
          role: "system",
          content: initialContext + "\n\n" + additionalSystemTextForChatBot,
        },
      ]);
    }, []);

    return (
      <>
        <h1>Research</h1>
        <ChatBot
          recognitionEnable={true}
          contentStyle={{ height: "58vh" }}
          style={{ height: "100%" }}
          botAvatar={Bot}
          width="98%"
          userAvatar={User}
          headerTitle={"Plannr AI Bot"}
          placeholder={"Enter your query regarding your plan..."}
          steps={[
            {
              id: "1",
              message: "Do you have follow up questions from your plan?",
              trigger: "question",
            },
            {
              id: "question",
              user: true,
              trigger: "answer",
            },
            {
              id: "answer",
              component: <Answer />,
              waitAction: true,
              trigger: "question",
              asMessage: true,
            },
          ]}
        />
      </>
    );
  }
);

export default ExampleDBPedia;
