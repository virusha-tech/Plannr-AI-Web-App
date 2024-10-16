import React, { Component, Fragment } from "react";
import Select from "react-select";
import {
  mapArraytoReactSelectorOptions,
  mapValuetoReactSelectObj,
} from "../Profile/UserProfileForm";

const customStyles = {
  control: (base, { isFocused }) => ({
    ...base,
    border: "1px solid rgba(209, 213, 219)",
    boxShadow: "none",
    minHeight: "46px",
    "&:hover": {
      border: "1px solid rgba(156, 163, 175)",
    },
  }),
  menuPortal: (base, state) => ({
    ...base,
    zIndex: 50,
  }),

  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    // const color = chroma(data.color);
    // console.log({ data, isDisabled, isFocused, isSelected });
    return {
      ...styles,
      backgroundColor: isFocused ? "#079196" : null,
      color: "#333333",
    };
  },
};

export const errorStyles = {
  control: (base, state) => ({
    ...base,
    border: "1px solid red",
    boxShadow: "none",
    "&:hover": {
      border: "1px solid red",
    },
  }),
};

export default class SingleSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClearable: true,
      isDisabled: false,
      isLoading: false,
      isRtl: false,
      isSearchable: true,
    };
  }

  toggleClearable = () =>
    this.setState((state) => ({ isClearable: !state.isClearable }));
  toggleDisabled = () =>
    this.setState((state) => ({ isDisabled: !state.isDisabled }));
  toggleLoading = () =>
    this.setState((state) => ({ isLoading: !state.isLoading }));
  toggleRtl = () => this.setState((state) => ({ isRtl: !state.isRtl }));
  toggleSearchable = () =>
    this.setState((state) => ({ isSearchable: !state.isSearchable }));
  render() {
    const {
      isClearable,
      isSearchable,
      isDisabled,
      isLoading,
      isRtl,
    } = this.state;

    const errors = this.props.isError ? errorStyles : {};

    return (
      <Fragment>
        <Select
          placeholder={this.props.placeholder}
          className={`${
            this.props.isMulti ? "basic-multi-select" : "basic-single"
          } focus-within:border-gray-400 border-gray-300`}
          classNamePrefix="select"
          isDisabled={isDisabled}
          isLoading={isLoading}
          isClearable={false}
          isRtl={isRtl}
          isSearchable={isSearchable}
          isMulti={this.props.isMulti}
          name="color"
          options={this.props.options}
          // menuPortalTarget={document.body}
          styles={{ ...customStyles, ...errors }}
          value={
            Array.isArray(this.props.initialValue)
              ? this.props.initialValue.length
                ? mapArraytoReactSelectorOptions(this.props.initialValue)
                : null
              : this.props.initialValue.length
              ? mapValuetoReactSelectObj(this.props.initialValue)
              : null
          }
          onChange={this.props.onChange}
          // styles={{ menuPortal: (base) => ({ ...base,  }) }}
        />
        {/* <Select
          className="basic-single mt-2"
          classNamePrefix="select"
          defaultValue={}
          isDisabled={isDisabled}
          isLoading={isLoading}
          isClearable={isClearable}
          isRtl={isRtl}
          isSearchable={isSearchable}
          name="color"
          onChange={this.props.onChange}
          options={}
          components={{
            Option,
            SingleValue,
          }}
        /> */}
      </Fragment>
    );
  }
}

// const SingleValue = (props) => {
//   let Icon = props.data.Icon;
//   return (
//     <components.SingleValue {...props}>
//       <div className="flex items-center">
//         <div>
//           <Icon className="w-6 h-6" />
//         </div>
//         <div className="pl-2">{props.children}</div>
//       </div>
//     </components.SingleValue>
//   );
// };

// const Option = (props) => {
//   let Icon = props.data.Icon;
//   return (
//     <components.Option {...props}>
//       <div className="flex items-center">
//         <div>
//           <Icon className="w-6 h-6" />
//         </div>
//         <div className="pl-2">{props.children}</div>
//       </div>
//     </components.Option>
//   );
// };
