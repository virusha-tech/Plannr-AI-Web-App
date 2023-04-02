import React, { Component } from "react";
import DateRangePicker from "daterangepicker";
import moment from "moment";
import "daterangepicker/daterangepicker.css";
import CalendarIcon from "./../../../assets/Calendar.svg";
import styled from "styled-components";

class DateRange extends Component {
  pickerRef = React.createRef(null);
  componentDidMount() {
    if (this.props.isSingleValue) {
      if (!this.props.initialValue) {
        this.pickerRef.current = new DateRangePicker(this.picker, {
          singleDatePicker: true,
          showDropdowns: true,
          minYear: moment().year(),
          maxYear: parseInt(
            moment()
              .year(2050)
              .format("YYYY"),
            10
          ),
          locale: {
            format: "DD/MM/YYYY",
          },
          cancelButtonClasses: "date-picker-cancelbutton",
          applyButtonClasses: "date-picker-applybutton",
          autoUpdateInput: false,
        });
      } else {
        this.pickerRef.current = new DateRangePicker(this.picker, {
          singleDatePicker: true,
          showDropdowns: true,
          minYear: moment().year(),
          startDate: moment(this.props.initialValue, "DD/MM/YYYY").toDate(),
          maxYear: parseInt(
            moment()
              .year(2050)
              .format("YYYY"),
            10
          ),
          locale: {
            format: "DD/MM/YYYY",
          },
          cancelButtonClasses: "date-picker-cancelbutton",
          applyButtonClasses: "date-picker-applybutton",
          autoUpdateInput: false,
        });
        this.picker.value = this.props.initialValue;
      }
    } else {
      if (!this.props.initialValue) {
        this.picker.value = this.props.initialValue;
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
        });
      } else {
        const [sd, ed] = this.props.initialValue.split(" - ");
        this.pickerRef.current = new DateRangePicker(this.picker, {
          startDate: moment(sd, "DD/MM/YYYY").toDate(),
          endDate: moment(ed, "DD/MM/YYYY").toDate(),
          alwaysShowCalendars: true,
          autoUpdateInput: false,
          cancelButtonClasses: "date-picker-cancelbutton",
          applyButtonClasses: "date-picker-applybutton",
          rangeColors: ["red", "green", "yellow"],
          locale: {
            format: "DD/MM/YYYY",
          },
          // ranges: {
          //   Today: [moment(), moment()],
          //   Yesterday: [
          //     moment().subtract(1, "days"),
          //     moment().subtract(1, "days"),
          //   ],
          //   "Last 7 Days": [moment().subtract(6, "days"), moment()],
          //   "Last 30 Days": [moment().subtract(29, "days"), moment()],
          //   "This Month": [moment().startOf("month"), moment().endOf("month")],
          //   "Last Month": [
          //     moment()
          //       .subtract(1, "month")
          //       .startOf("month"),
          //     moment()
          //       .subtract(1, "month")
          //       .endOf("month"),
          //   ],
          // },
        });
        this.picker.value = this.props.initialValue;
      }
    }

    this.pickerRef.current.element.on("apply.daterangepicker", (ev, picker) => {
      console.log(picker.startDate.format("DD/MM/YYYY"));
      if (this.props.isSingleValue) {
        this.picker.value = picker.startDate.format("DD/MM/YYYY");
        this.props.onChange(this.picker.value);
      } else {
        this.picker.value =
          picker.startDate.format("DD/MM/YYYY") +
          " - " +
          picker.endDate.format("DD/MM/YYYY");
        this.props.onChange(this.picker.value);
      }
    });
    // this.pickerRef.current.element.on(
    //   "change.daterangepicker",
    //   (ev, picker) => {
    //     console.log(picker);
    //   }
    // );

    this.pickerRef.current.element.on(
      "cancel.daterangepicker",
      (ev, picker) => {
        this.picker.value = "";
        this.props.onChange(this.picker.value);
      }
    );
  }

  componentDidUpdate() {
    if (this.props.initialValue) {
      if (this.isSingleValue) {
        this.pickerRef.current = new DateRangePicker(this.picker, {
          singleDatePicker: true,
          showDropdowns: true,
          minYear: moment().year(),
          startDate: moment(this.props.initialValue, "DD/MM/YYYY").toDate(),
          maxYear: parseInt(
            moment()
              .year(2050)
              .format("YYYY"),
            10
          ),
          locale: {
            format: "DD/MM/YYYY",
          },
          cancelButtonClasses: "date-picker-cancelbutton",
          applyButtonClasses: "date-picker-applybutton",
          autoUpdateInput: false,
        });
        this.picker.value = this.props.initialValue;
      } else {
        this.picker.value = this.props.initialValue;
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
        });
      }
    }
  }

  render() {
    return (
      <DateWrapper
        className={`outline-none focus:outline-none text-${this.props?.size ||
          "lg"}  bg-white rounded-md  w-full border focus-within:border-gray-400 ${
          this.props?.isError ? "border-red-400" : "border-gray-300"
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
