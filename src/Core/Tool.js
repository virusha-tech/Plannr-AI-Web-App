import React, { Component } from "react";
import { Helmet } from "react-helmet";
import Button from "../Components/Button";
import { withRouter } from "react-router-dom";
import { observable, makeObservable, computed } from "mobx";
import { observer, inject } from "mobx-react";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import EntryTabs from "../Components/EntryTabs";
import EntryPrompt from "../Components/EntryPrompt";
import EntryInput from "../Components/EntryInput";
import { Stepper, Step, StepButton } from "@mui/material";
import Filter from "bad-words";
import styled from "styled-components";
import { getSteps, serialize } from "../tools/utils";
import MyEditor from "./Editor/index";
import GeneratingSpinner from "./Editor/GeneratingSpinner";
import { Layout } from "../Layout";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TravelRecomendations from "./Recommendations/Travel";

let filterBadWords = new Filter();

@inject("store")
@observer
class Tool extends Component {
  @observable tool = {};

  @observable.deep prompts = [];
  @observable currentPrompt = 0;
  @observable currentOption = "Start Using";

  @observable error = "";

  // @observable output = "";
  // @observable outputs = [];
  // @observable code = "";

  @observable loading = false;

  countdown = [];

  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      activeTab: 0,
      editorOutput: { answer: "" },
    };
    this.getEditorOutput = this.getEditorOutput.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.steps = getSteps();
    makeObservable(this);
    this.tool = this.props.store.getToolByUrl(
      this.props.location.pathname,
      this.props.isFreeVersion
    );

    if (!this.tool) {
      window.location.href = "/";
    } else {
      this.prompts = [...this.tool.prompts];
    }
  }

  handleCurrentPrompt = (val) => {
    this.currentPrompt = val;
  };

  handleChange = (event, newValue) => {
    this.setState({ activeTab: newValue });
  };

  @computed get isGenerateButtonDisabled() {
    if (this.loading) {
      return true;
    }

    return false;
  }

  @computed get disabled() {
    if (this.prompts[this.currentPrompt].prompts[0].value?.length < 1) {
      return true;
    }

    // this.prompts[this.currentPrompt].prompts[promptIndex].value
    return false;
  }

  @computed get isMinLength() {
    if (!this.props.prompt.min) {
      return false;
    }
    if (!this.props.prompt.type === "number") {
      return false;
    }

    return false;
  }

  checkMinimumPrompts = () => {
    let shouldReturn = false;
    this.prompts[this.currentPrompt].prompts.forEach((prompt, promptIndex) => {
      if (prompt.min) {
        if (prompt.value?.length < prompt.min) {
          shouldReturn = true;
          prompt.error = `${prompt.title} needs to meet the minimum ${prompt.min} characters`;
        }
      } else {
        if (prompt.required) {
          if (!prompt.value?.length) {
            shouldReturn = true;
            prompt.error = `Selection of ${prompt.title} field is required`;
          }
        }
      }
    });

    return shouldReturn;
  };

  clearExampleTimeout = [];

  onStartUsing = async () => {
    this.loading = false;
    this.error = "";
    this.clearExampleTimeout.forEach((item, index) => {
      clearTimeout(this.clearExampleTimeout[index]);
    });
    this.currentOption = "Start Using";
  };

  sanitizeAllPrompts = () => {
    this.prompts[this.currentPrompt].prompts.forEach((prompt) => {
      if (!prompt.value) {
        return false;
      }
      if (prompt.type === "number") {
        return false;
      }

      prompt.value = prompt.value?.trim();

      if (filterBadWords.isProfane(prompt.value)) {
        prompt.error = "Unsafe content , please try different language";
        throw Error("Unsafe content");
      }
    });
  };

  contentFilterFlagged = async (response) => {
    this.error = response.message;

    this.countdown.forEach((countdown) => {
      if (countdown) {
        countdown.stop();
        countdown.start();
      }
    });
    this.loading = false;
  };

  checkOutput = (output) => {
    if (output) {
      output = output.replace(/^\s+|\s+$/g, "");
    }
    return output;
  };

  @computed get language() {
    let language = "";
    this.prompts[this.currentPrompt].prompts.forEach((prompt) => {
      if (prompt.attr === "language") {
        language = `${prompt.value}`;
      }
    });
    return language;
  }

  onGenerateClick = async () => {
    try {
      this.error = "";
      this.setState({ editorOutput: { answer: "" } });
      this.loading = true;
      let checkMinimumPrompts = this.checkMinimumPrompts();
      if (checkMinimumPrompts) {
        this.loading = false;
        return false;
      }

      let postObj = {};

      this.prompts[this.currentPrompt].prompts.forEach((prompt) => {
        postObj[prompt.attr] = prompt.value;
      });

      postObj.currentPrompt = this.prompts[this.currentPrompt].title;
      if (this.prompts[this.currentPrompt].n) {
        postObj.n = this.prompts[this.currentPrompt].n;
      }

      this.setState({ activeStep: 1 });

      let response = await this.props.store.api.post(this.tool.api, {
        plan: {
          ...postObj,
        },
      });

      if (response.data.output_id) {
        this.props.history.replace({
          search: serialize({
            output_id: response.data.output_id,
          }),
        });
      } else if (response.data.output) {
        this.setState({ editorOutput: { answer: response.data.output } });
      }
      this.loading = false;
    } catch (error) {
      this.loading = false;
    }
  };

  async getEditorOutput(outputId) {
    this.setState({ activeStep: 1 });
    const { data } = await this.props.store.api.get(
      `/Editor/output/${outputId}`
    );

    if (data.answer && this.checkOutput(data.answer)) {
      this.setState({ editorOutput: data });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.search !== prevProps.location.search) {
      const output_id = new URLSearchParams(this.props.location.search).get(
        "output_id"
      );
      if (output_id) this.getEditorOutput(output_id);
      else {
        this.prompts[this.currentPrompt].prompts.forEach((prompt) => {
          prompt.value = "";
        });
        this.setState({
          activeStep: 0,
          editorOutput: { answer: "" },
        });
      }
    }
  }

  componentDidMount() {
    const output_id = new URLSearchParams(this.props.location.search).get(
      "output_id"
    );
    const formFields = JSON.parse(
      new URLSearchParams(this.props.location.search).get("formFields")
    );

    if (output_id) {
      this.getEditorOutput(output_id);
      this.prompts[this.currentPrompt].prompts.forEach(
        (prompt, promptIndex) => {
          prompt.value = formFields[prompt.attr];
        }
      );
    }
  }

  handleStep = (step) => () => {
    let back = {};
    this.prompts[this.currentPrompt].prompts.forEach((prompt) => {
      back[prompt.attr] = prompt.value;
    });
    this.setState({ activeStep: step });
  };

  render() {
    return (
      <Layout isFreeVersion={this.props.isFreeVersion} hideFooter={true}>
        <Helmet>
          <title>{`${this.tool.title} Tool - Plannr AI`}</title>
        </Helmet>
        <StyledToolContainer sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={this.state.activeTab} onChange={this.handleChange}>
              <StyledTab
                label="Plan"
                isselected={(this.state.activeTab === 0).toString()}
              />
              {this.tool.isRecommendationsAvailable ? (
                <StyledTab
                  label="Execute"
                  isselected={(this.state.activeTab === 1).toString()}
                />
              ) : null}
              {this.tool.isTrackingAvailable ? (
                <StyledTab
                  label="Track"
                  isselected={(this.state.activeTab === 2).toString()}
                />
              ) : null}
            </Tabs>
          </Box>
          <TabPanel value={this.state.activeTab} index={0}>
            <StyledContainer>
              <AlignStepper>
                <StyledStepper activeStep={this.state.activeStep}>
                  {this.steps.map((label, index) => {
                    return (
                      <Step key={label}>
                        <StyledStepLabel
                          color="inherit"
                          onClick={this.handleStep(index)}
                        >
                          {label}
                        </StyledStepLabel>
                      </Step>
                    );
                  })}
                </StyledStepper>
              </AlignStepper>
              {this.state.activeStep == 0 ? (
                <StyledForm>
                  <StyledSubHeading className="xs:py-4 md:px-6 md:py-6">
                    {this.tool.title}
                  </StyledSubHeading>
                  <EntryTabs
                    prompts={this.prompts}
                    currentPrompt={this.currentPrompt}
                    onChange={this.handleCurrentPrompt}
                  />
                  {this.prompts.map((prompt, index) => (
                    <EntryPrompt
                      prompt={prompt}
                      key={index}
                      index={index}
                      disabled={this.disabled}
                      currentPrompt={this.currentPrompt}
                    >
                      <ScrollbarContainer>
                        {prompt.prompts.map((promptInput, index) => {
                          return (
                            <EntryInput
                              isLast={index === prompt.prompts.length - 1}
                              prompt={promptInput}
                              key={index}
                              language={this.language}
                              index={index}
                              disabled={this.disabled}
                            />
                          );
                        })}
                      </ScrollbarContainer>
                      <ActionContainer className="flex justify-end gap-6 items-center">
                        {/* <CancelButton>Cancel</CancelButton> */}
                        <Button onClick={this.onGenerateClick}>Generate</Button>
                      </ActionContainer>
                      {this.error && (
                        <div className="mt-4">
                          <label
                            className={`${
                              this.error ? "text-red-400" : "text-gray-400"
                            } font-medium transition-all`}
                          >
                            {this.error}
                          </label>
                        </div>
                      )}
                    </EntryPrompt>
                  ))}
                </StyledForm>
              ) : !this.state.editorOutput.answer.length ? (
                <GeneratingSpinner showLoader={true} />
              ) : (
                <>
                  <MyEditor
                    {...this.state.editorOutput}
                    title={this.tool.title}
                    isFreeVersion={this.props.isFreeVersion}
                    additionalSystemTextForChatBot={
                      this.tool.additionalSystemTextForChatBot
                    }
                  />
                </>
              )}
            </StyledContainer>
          </TabPanel>
          <TabPanel value={this.state.activeTab} index={1}>
            {/* {!this.state.editorOutput.answer.length ? ( */}
            <GeneratingSpinner showLoader={false}>
              {/* We will give our recommendations once you build plan */}
              COMING SOON
            </GeneratingSpinner>
            {/* ) : (
              <PlanRecomendations
                planName={this.tool.title}
                inputs={this.prompts[0].prompts}
              />
            )} */}
          </TabPanel>
          <TabPanel value={this.state.activeTab} index={2}>
            <GeneratingSpinner showLoader={false}>
              COMING SOON
            </GeneratingSpinner>
          </TabPanel>
        </StyledToolContainer>
      </Layout>
    );
  }
}

const StyledToolContainer = styled(Box)`
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
    rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
`;

const PlanRecomendations = ({ planName, inputs }) => {
  const renderCorrespondingPlanRecomendations = () => {
    switch (planName) {
      case "Travel Plan":
        return <TravelRecomendations inputs={inputs} />;
      default:
        return null;
    }
  };

  return <h1>{renderCorrespondingPlanRecomendations()}</h1>;
};

const StyledTab = styled(Tab)`
  background: ${(props) =>
    props.isselected === "true"
      ? `${props.theme.primary} !important`
      : "transparent"};
  color: ${(props) =>
    props.isselected === "true" ? "white !important" : "#667085 !important"};
  border-radius: 6px 6px 0px 0px;

  @media only screen and (max-width: 600px) {
    flex: 1;
  }
`;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{ background: "white" }}
    >
      {value === index && (
        <Box sx={{ p: 1 }} md={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

//
const StyledContainer = styled.div`
  padding: 6px;
  min-height: 70vh;
  max-height: 100vh;
  @media only screen and (max-width: 900px) {
    min-height: 76vh;
    max-height: initial;
  }
`;

const CancelButton = styled.button`
  background: #fafafa;
  width: 80px;
  height: 40px;
  background: #ffffff;
  border: 1px solid #d0d5dd;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 8px;
`;

const StyledForm = styled.div`
  width: 50vw;
  margin: 0 auto;
  /* padding-top: 8vh; */
  background: white;
  @media only screen and (max-width: 1200px) {
    width: 100%;
  }
`;

const StyledSubHeading = styled.div`
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 38px;
  /* text-align: center; */
  color: #101828;
  margin-bottom: 1vh;
  @media only screen and (max-width: 600px) {
    font-family: "Inter";
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 38px;
  }
`;

const StyledStepper = styled(Stepper)`
  background: inherit !important;
`;

const StyledStepLabel = styled(StepButton)`
  .MuiStepLabel-label {
    font-size: 24px;
    padding: 10px;
    @media only screen and (max-width: 600px) {
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 24px;
      color: #374151;
    }
  }
  .MuiSvgIcon-root.MuiStepIcon-root {
    height: 2rem;
    width: 2rem;
    margin: 5px;
  }
`;
const AlignStepper = styled.div`
  width: 50vw;
  margin: 0 auto;
  @media only screen and (max-width: 1200px) {
    width: 100%;
  }
`;

const ActionContainer = styled.div`
  @media only screen and (min-width: 1200px) {
    padding: 20px 50px;
  }
`;

const ScrollbarContainer = styled.div`
  @media only screen and (min-width: 901px) {
    /* height: 62vh; */
    max-height: 50vh;
    min-height: 30vh;
    padding: 0px 50px;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 12px;
      border-radius: 10px;
      /* background-color: white; */
      /* background-color: ${({ theme }) => {
        return `${theme.primary}`;
      }}; */
    }
    &::-webkit-scrollbar-track {
      -webkit-border-radius: 10px;
      border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb {
      -webkit-border-radius: 10px;
      border-radius: 10px;
      /* background:black; */
      background: ${({ theme }) => {
        return `${theme.primary}`;
      }};
    }
  }
`;

export default withRouter(Tool);
