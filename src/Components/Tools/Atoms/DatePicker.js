import React, { Component } from "react";
import DateRangePicker from "daterangepicker";
import moment from "moment";
import "daterangepicker/daterangepicker.css";
import CalendarIcon from "./../../../assets/Calendar.svg";
import styled from "styled-components";

class DateRange extends Component {
  pickerRef = React.createRef(null);

  componentDidMount() {
    this.pickerRef.current = new DateRangePicker(this.picker, {
      startDate: new Date(),
      endDate: new Date(),
      alwaysShowCalendars: true,
      autoUpdateInput: false,
      cancelButtonClasses: "date-picker-cancelbutton",
      applyButtonClasses: "date-picker-applybutton",
      rangeColors: ["red", "green", "yellow"],
      locale: {
        format: "DD/MM/YYYY",
      },
      ranges: {
        Today: [moment(), moment()],
        Yesterday: [moment().subtract(1, "days"), moment().subtract(1, "days")],
        "Last 7 Days": [moment().subtract(6, "days"), moment()],
        "Last 30 Days": [moment().subtract(29, "days"), moment()],
        "This Month": [moment().startOf("month"), moment().endOf("month")],
        "Last Month": [
          moment().subtract(1, "month").startOf("month"),
          moment().subtract(1, "month").endOf("month"),
        ],
      },
    });

    this.pickerRef.current.element.on("apply.daterangepicker", (ev, picker) => {
      this.picker.value =
        picker.startDate.format("DD/MM/YYYY") +
        " - " +
        picker.endDate.format("DD/MM/YYYY");
      this.props.onChange(
        picker.startDate.format("DD/MM/YYYY") +
          " - " +
          picker.endDate.format("DD/MM/YYYY")
      );
    });

    this.pickerRef.current.element.on(
      "cancel.daterangepicker",
      (ev, picker) => {
        this.picker.value = "";
      }
    );
  }

  render() {
    return (
      <DateWrapper
        className={`outline-none focus:outline-none text-${
          this.props?.size || "lg"
        } bg-white rounded-md  w-full border focus-within:border-gray-400 ${
          this.props?.prompt?.error ? "border-red-400" : "border-gray-300"
        } font-regular px-4 mt-2  transition-all`}
      >
        <input
          className="outline-none py-2 focus:border-gray-400"
          ref={(picker) => (this.picker = picker)}
          placeholder="India Standard Time (IST) UTC+05:30"
          type="text"
        />
        <img
          src={CalendarIcon}
          alt="Calendar Icon"
          onClick={() => this.pickerRef?.current?.show()}
        />
      </DateWrapper>
    );
  }
}

const DateWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 46px;

  input {
    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: #101828;
    width: 100%;

    &::-webkit-input-placeholder,
    &:-ms-input-placeholder,
    &::placeholder {
      /* Edge */
      font-family: "Inter";
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      color: #101828;
    }
  }
`;

export default DateRange;
