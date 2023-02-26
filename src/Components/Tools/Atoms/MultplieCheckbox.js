import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

class MultplieCheckbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedItems: new Map(),
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const item = e.target.name;
    const isChecked = e.target.checked;
    this.setState(
      (prevState) => ({
        checkedItems: prevState.checkedItems.set(item, isChecked),
      }),
      () => {
        const truthyValues = [];
        for (let [key, value] of this.state.checkedItems.entries()) {
          if (value === true) truthyValues.push(key);
        }
        this.props.onChange(truthyValues);
      }
    );
  }

  render() {
    return (
      <React.Fragment>
        {this.props.checkboxList.map(({ label }) => (
          <StyledCheckbox key={label}>
            <label key={label}>
              <Checkbox
                name={label}
                checked={this.state.checkedItems.get(label)}
                onChange={this.handleChange}
              />
              <span> {label}</span>
            </label>
          </StyledCheckbox>
        ))}
      </React.Fragment>
    );
  }
}

const StyledCheckbox = styled.div`
  margin-bottom: 16px;

  input[type="checkbox"] {
    /* removing default appearance */
    -webkit-appearance: none;
    appearance: none;
    /* creating a custom design */
    width: 20px;
    height: 18px;
    border-radius: 4px;
    margin-right: 0.5em;
    border: 2px solid #007a7e;
    outline: none;
    cursor: pointer;
    position: relative;
    top: 4px;

    &:disabled {
      border-color: #c0c0c0;
      background-color: #c0c0c0;
    }
    &:disabled + span {
      color: #c0c0c0;
    }
  }
  input.checked {
    /* background-color: ; */
    position: relative;
    &::before {
      /* content: "";
      position: absolute;
      left: 2px;
      top: 7px;
      background: white;
      width: 2px;
      height: 2px;
      box-shadow: 2px 0 0 , 4px 0 0 #007a7e, 4px -2px 0 #007a7e,
        4px -4px 0 #007a7e, 4px -6px 0 #007a7e, 4px -8px 0 #007a7e;
      transform: rotate(45deg); */
      content: "";
      position: absolute;
      right: 55%;
      top: 50%;
      width: 4px;
      height: 10px;
      border: solid #007a7e;
      border-width: 0 2px 2px 0;
      margin: -1px -1px 0 -1px;
      transform: rotate(45deg) translate(-50%, -50%);
      z-index: 2;
    }
  }
  span {
    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    cursor: pointer;
    /* identical to box height, or 143% */

    /* Gray/700 */

    color: #344054;
  }
`;

const Checkbox = ({ type = "checkbox", name, checked = false, onChange }) => (
  <input
    className={checked ? "checked" : ""}
    type={type}
    name={name}
    checked={checked}
    onChange={onChange}
  />
);

Checkbox.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default MultplieCheckbox;
