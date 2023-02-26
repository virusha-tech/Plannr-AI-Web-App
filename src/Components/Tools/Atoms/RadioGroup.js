import { useState } from "react";
import { Radio, RadioGroup as Group } from "react-radio-group";
import styled from "styled-components";

const RadioGroup = ({ name, radioItemList, onChange, isError }) => {
  const [selectedValue, setSelectedValue] = useState(null);

  const handleChange = (value) => {
    setSelectedValue(value);
    onChange(value);
  };

  return (
    <StyledRadioGroup
      name={name}
      selectedValue={selectedValue}
      onChange={handleChange}
    >
      {radioItemList.map(({ label }, index) => {
        return (
          <StyledLabel key={label} iserror={isError}>
            <StyledRadio value={label} iserror={isError} />
            <span>{label}</span>
          </StyledLabel>
        );
      })}
    </StyledRadioGroup>
  );
};

export default RadioGroup;

const StyledRadioGroup = styled(Group)`
  display: flex;
  align-items: center;
  gap: 40px;
`;

const StyledLabel = styled.label`
  font-family: system-ui, sans-serif;
  font-size: 2rem;
  font-weight: bold;
  line-height: 1.1;
  display: inline-flex;
  align-items: center;
  gap: 8px;

  span {
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #344054;
    text-transform: capitalize;
    cursor: pointer;
    color: ${({ iserror, theme }) => {
      return iserror ? "red" : "black";
    }};
  }
`;
const StyledRadio = styled(Radio)`
  &[type="radio"] {
    /* Add if not using autoprefixer */
    -webkit-appearance: none;
    appearance: none;
    /* For iOS < 15 to remove gradient background */
    background-color: #fff;
    /* Not removed via appearance */
    margin: 0;

    font: inherit;
    width: 0.6em;
    height: 0.6em;
    border: ${({ iserror, theme }) => {
      return iserror ? `0.08em solid red` : `0.08em solid ${theme.primary}`;
    }};
    border-radius: 50%;
    transform: translateY(-0.075em);
    position: relative;
    top: 3px;
    display: grid;
    place-content: center;

    &::before {
      content: "";
      width: 0.28em;
      height: 0.28em;
      border-radius: 50%;
      transform: scale(0);
      background-color: ${({ theme }) => {
        return `${theme.primary}`;
      }};
    }

    &:checked::before {
      transform: scale(1);
    }
  }
`;
