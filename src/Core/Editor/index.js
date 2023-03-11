import { saveAs } from "file-saver";
import { pdfExporter } from "quill-to-pdf";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import React from "react";
import "./index.css";
import styled from "styled-components";
import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import * as FileSaver from "file-saver";
import htmlToDocx from "html-to-docx";
import { NotificationManager } from "react-notifications";
import { observer, inject } from "mobx-react";
import { observable, makeObservable } from "mobx";
import { withRouter } from "react-router-dom";
import { Helmet } from "react-helmet";

@inject("store")
@observer
class MyEditor extends React.Component {
  @observable tool = {};

  constructor(props) {
    super(props);
    this.state = {
      editorText: "",
      question: "",
      isLoadingAnswer: false,
      answer: "",
      readOnly: true,
    };
    makeObservable(this);
    this.tool = this.props.store.getToolByUrl(this.props.location.pathname);
    this.quillRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.saveDocument = this.saveDocument.bind(this);
    this.appendText = this.appendText.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  checkOutput = (output) => {
    if (output) {
      output = output.replace(/^\s+|\s+$/g, "");
      // output = output.replace(/\s{2,}/g, ' ')
    }
    return output;
  };

  async handleSubmit(event) {
    event.preventDefault();
    let answer = "";
    this.setState({ isLoadingAnswer: true });
    const chat = this.state.editorText + `\n\n\n\n${this.state.question}?`;
    let response = await this.props.store.api.post(
      this.tool.subsequentQuestion,
      {
        question: chat,
      }
    );

    if (response.data.answer) {
      answer = this.checkOutput(response.data.answer);
    }

    this.setState({ isLoadingAnswer: false, answer });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  simulateTyping = () => {
    const { answer } = this.props;
    const delay = 0; // delay between each character in milliseconds
    let index = 0;

    const type = (newIndex) => {
      if (newIndex && newIndex === answer.length) {
        this.setState({ readOnly: false });
        return;
      }
      const nextText = this.state.editorText + answer[newIndex];
      this.setState({ editorText: nextText }, () => {
        this.quillRef.current.setEditorContents(
          this.quillRef.current.getEditor(),
          nextText
        );
      });

      newIndex++;
      setTimeout(type, delay, newIndex);
    };

    setTimeout(type, delay, index);
  };

  componentDidMount() {
    if (this.props.answer) {
      this.simulateTyping();
    }
  }

  componentWillUnmount() {
    const container = this.quillRef.current.editor.container;
    container.onscroll = null;
  }

  componentDidUpdate(prevProps) {
    if (this.props.answer && prevProps.answer !== this.props.answer) {
      this.simulateTyping();
    }
  }

  exportDocument = async () => {
    const content = this.quillRef.current?.getEditor().root.innerHTML;
    // TODO: Mac
    const converted = await htmlToDocx(content);
    FileSaver.saveAs(converted, "document.docx");
  };

  exportAsPDF = async () => {
    const delta = this.quillRef.current?.editor?.getContents(); // gets the Quill delta
    const pdfAsBlob = await pdfExporter.generatePdf(delta); // converts to PDF
    saveAs(pdfAsBlob, "pdf-export.pdf"); // downloads from the browser
  };

  clearDocument = () => {
    this.quillRef.current?.editor?.deleteText(0, Infinity);
  };

  handleDownload = () => {
    const fileName = "document.docx";
    const blob = new Blob([this.state.editorText], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = fileName;
    link.href = url;
    link.click();
  };

  saveDocument = async (outputId) => {
    try {
      await this.props.store.api.put(`/Editor/output/${this.props._id}`, {
        answer: this.quillRef.current.value,
      });
      NotificationManager.info("Saved");
    } catch (err) {
      NotificationManager.error("Error saving output");
    }
  };

  appendText = () => {
    if (this.state.answer.length) {
      const quill = this.quillRef.current.getEditor();
      quill.insertText(quill.getLength(), `\n${this.state.answer}`);
      this.setState({ answer: "", question: "" });
      NotificationManager.info("Content appended in  Text Editor");
    } else {
      NotificationManager.error("Nothing to add in Editor.");
    }
  };

  render() {
    return (
      <>
        <Helmet>
          <title>{`${this.props.title} Output - Plannr AI`}</title>
        </Helmet>
        <ReactQuill
          ref={this.quillRef}
          readOnly={this.state.readOnly}
          preserveWhitespace={true}
          placeholder="Generating your plan..."
        />
        <div className="action-container">
          <DownloadButton
            className="button"
            disabled={this.state.readOnly}
            onClick={this.exportDocument}
          >
            Download Doc
          </DownloadButton>
          <DownloadButton
            disabled={this.state.readOnly}
            className="button"
            onClick={this.exportAsPDF}
          >
            Download PDF
          </DownloadButton>
          <DownloadButton
            disabled={this.state.readOnly}
            className="button"
            onClick={this.saveDocument}
          >
            Save for Later
          </DownloadButton>
        </div>

        <FollowUpQuestionWrapper>
          <h1>Do you have follow up questions?</h1>
          <span>Ask from AI here?</span>
          <QuestionContainer>
            <input
              type="text"
              name="question"
              placeholder="Type your question here"
              value={this.state.question}
              onChange={this.handleChange}
            />

            <button
              type="submit"
              className="button"
              color="white"
              disabled={this.state.readOnly}
              onClick={this.handleSubmit}
            >
              {this.state.isLoadingAnswer ? (
                <CircularProgress size={24} />
              ) : this.state.answer.length ? (
                "Done"
              ) : (
                "Submit"
              )}
            </button>
          </QuestionContainer>
          <AnswersContainer>
            <textarea
              type="text"
              name="answer"
              readOnly={this.state.answer.length == 0}
              placeholder="Results here"
              onChange={this.handleChange}
              value={this.state.answer}
            />
          </AnswersContainer>
          <ActionButtons>
            <StyledButton
              variant="outlined"
              disabled={this.state.readOnly}
              startIcon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
                  />
                </svg>
              }
              onClick={this.appendText}
            >
              Add Result to Itinerary above
            </StyledButton>
            <RegenerateButton
              className="button"
              onClick={this.handleSubmit}
              disabled={this.state.readOnly}
            >
              Regenerate Result
            </RegenerateButton>
          </ActionButtons>
        </FollowUpQuestionWrapper>
      </>
    );
  }
}

const StyledButton = styled(Button)`
  background: #05bbc2 !important;
  border: 1px solid #04adb4 !important;
  /* Shadow/xs */
  height: 40px;
  padding: 10px 16px;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05) !important;
  border-radius: 8px !important;
  color: white;

  &:disabled {
    opacity: 0.6;
    color: white;
    cursor: not-allowed;
  }

  .MuiButton-startIcon,
  .MuiButton-label {
    color: white !important;
  }
`;

const RegenerateButton = styled.button`
  background: #ffffff;
  border: 1px solid #d0d5dd;
  height: 40px;
  padding: 0px 16px;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 8px;
  box-sizing: content-box;
  &:disabled {
    opacity: 0.6;
    color: grey;
    cursor: not-allowed;
  }
`;

const FollowUpQuestionWrapper = styled.div`
  padding-top: 16px;
  padding-bottom: 26px;

  h1 {
    font-family: "Inter";
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 28px;
    padding-bottom: 8px;
    color: #101828;
  }
  span {
    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: #344054;
  }
`;
const QuestionContainer = styled.form`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 12px;
  padding-top: 8px;

  input {
    flex: 1;
    background: #ffffff;
    border: 1px solid #d0d5dd;
    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
    border-radius: 8px;
    padding: 12px 14px;
  }
  button {
    /* flex: 0.1; */
    width: 120px;
    height: 48px;
    background: #05bbc2;
    border: 1px solid #04adb4;
    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
    border-radius: 10px;
    color: white;
    &:disabled {
      /* background: red; */
      opacity: 0.6;
      /* color: white; */
      cursor: not-allowed;
    }
  }
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-top: 24px;
`;

const AnswersContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 12px;
  padding-top: 8px;
  textarea {
    flex: 1;
    background: #ffffff;
    border: 1px solid #d0d5dd;
    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
    border-radius: 8px;
    padding: 12px 14px;
    height: 120px;
  }
`;

const DownloadButton = styled.button`
  background: #ffffff;
  border: 1px solid #d0d5dd;
  border: 1px solid #d0d5dd;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 8px;
  padding: 16px;
  color: #344054;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;

  &:disabled {
    /* background: red; */
    opacity: 0.6;
    color: grey;
    cursor: not-allowed;
  }
`;
export default withRouter(MyEditor);
