import { saveAs } from "file-saver";
import { pdfExporter } from "quill-to-pdf";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import React from "react";
import "./index.css";
import styled from "styled-components";
import { Button } from "@mui/material";
import { NotificationManager } from "react-notifications";
import { observer, inject } from "mobx-react";
import { observable, makeObservable } from "mobx";
import { withRouter } from "react-router-dom";
import { Helmet } from "react-helmet";
import ContextChatBot from "./ContextChatBot";

function createWordDocument(htmlContent) {
  var blob = new Blob(
    [
      '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Word Document</title></head><body>' +
        htmlContent +
        "</body></html>",
    ],
    { type: "application/msword" }
  );
  saveWordAs(blob, "document.doc");
}

function saveWordAs(blob, filename) {
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(blob, filename);
  } else {
    var link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  }
}

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
      showChatBot: false,
    };
    makeObservable(this);
    this.tool = this.props.store.getToolByUrl(this.props.location.pathname);
    this.quillRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.saveDocument = this.saveDocument.bind(this);
    this.appendText = this.appendText.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleChatBot = this.toggleChatBot.bind(this);
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
    createWordDocument(content);
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
      type:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
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

  toggleChatBot = () => {
    this.setState({ showChatBot: true });
  };

  render() {
    return (
      <>
        <Helmet>
          <title>{`${this.props.title} Output - Plannr AI`}</title>
        </Helmet>
        <Wrapper>
          <LeftWrapper>
            <h1>Plan</h1>
            <ReactQuill
              ref={this.quillRef}
              readOnly={this.state.readOnly}
              preserveWhitespace={true}
              placeholder="Generating your plan..."
            />
            <div className="action-container">
              <DownloadButton
                className="button"
                disabled={this.props.isFreeVersion || this.state.readOnly}
                onClick={this.exportDocument}
              >
                Download Doc
              </DownloadButton>
              <DownloadButton
                disabled={this.props.isFreeVersion || this.state.readOnly}
                className="button"
                onClick={this.exportAsPDF}
              >
                Download PDF
              </DownloadButton>
              <DownloadButton
                disabled={this.props.isFreeVersion || this.state.readOnly}
                className="button"
                onClick={this.saveDocument}
              >
                Save for Later
              </DownloadButton>
            </div>
            {this.state.showChatBot ? (
              <ContextChatBot
                store={this.props.store}
                initialContext={this.props.answer}
                additionalSystemTextForChatBot={
                  this.props.additionalSystemTextForChatBot
                }
              />
            ) : null}
            <BottomSheet
              onClick={!this.state.showChatBot ? this.toggleChatBot : null}
              className={`${
                this.state.showChatBot ? "pointer_events_none" : ""
              }`}
            >
              Do you have follow up questions?
            </BottomSheet>
          </LeftWrapper>
          <RightWrapper>
            <ContextChatBot
              store={this.props.store}
              initialContext={this.props.answer}
              additionalSystemTextForChatBot={
                this.props.additionalSystemTextForChatBot
              }
            />
          </RightWrapper>
        </Wrapper>
      </>
    );
  }
}

const BottomSheet = styled.div`
  background: #6b7280;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 28px;
  text-align: center;
  color: #ffffff;
  padding: 11px 16px;
  position: absolute;
  bottom: 0px;
  right: 0px;
  left: 0px;
  display: none;

  &.pointer_events_none {
    pointer-events: none;
  }
  @media only screen and (max-width: 600px) {
    display: block;
  }
`;

const Wrapper = styled.div`
  display: flex;
  gap: 30px;
  h1 {
    font-size: 30px;
    margin-bottom: 10px;
  }
`;

const LeftWrapper = styled.div`
  flex: 0.6;
  @media only screen and (max-width: 600px) {
    flex: 1;
    h1 {
      display: none;
    }
  }
`;

const RightWrapper = styled.div`
  flex: 0.4;
  @media only screen and (max-width: 600px) {
    flex: 0;
    display: none;
  }
`;

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

  @media only screen and (max-width: 600px) {
    gap: 8px;
  }

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
  @media only screen and (max-width: 600px) {
    font-style: normal;
    font-weight: 600;
    font-size: 10px;
    line-height: 14px;
    color: #344054;
    padding: 12px 10px;

  }
  @media only screen and (max-width: 400px) {
    line-height: 12px;
    padding:  10px;

  }
`;
export default withRouter(MyEditor);
