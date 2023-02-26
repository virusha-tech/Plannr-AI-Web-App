import React, { useState } from "react";
import styled from "styled-components";
import EntryDropdown from "./../Components/EntryDropdown";
import { Button } from "@mui/material";

const userProfileFields = [
  {
    title: "Age range",
    attr: "ageRange",
    value: "",
    options: [
      { title: "18-24", value: "18-24", label: "18-24" },
      { title: "25-34", value: "25-34", label: "25-34" },
      { title: "35-44", value: "35-44", label: "35-44" },
    ],
    placeholder: "Select your Date Range",
    type: "dropdown",
    required: true,
  },
  {
    title: "Gender",
    attr: "gender",
    value: "",
    options: [
      { title: "Male", value: "Male", label: "Male" },
      { title: "Female", value: "Female", label: "Female" },
      { title: "Non-binary", value: "Non-binary", label: "Non-binary" },
      {
        title: "Prefer not to say",
        value: "Prefer not to say",
        label: "Prefer not to say",
      },
    ],
    placeholder: "Select your Gender",
    type: "dropdown",
    required: true,
  },
  {
    title: "Education level",
    attr: "educationLevel",
    value: "",
    options: [
      { title: "High School", value: "High School", label: "High School" },
      {
        title: "Bachelor's degree",
        value: "Bachelor's degree",
        label: "Bachelor's degree",
      },
      {
        title: "Master's degree",
        value: "Master's degree",
        label: "Master's degree",
      },
    ],
    placeholder: "Select your Education level",
    type: "dropdown",
    required: true,
  },
  {
    title: "Location",
    attr: "location",
    value: "",
    placeholder: "Enter your location",
    min: 1,
    maxLength: 80,
    required: true,
  },
  {
    title: "Industry",
    attr: "industry",
    value: "",
    options: [
      { title: "Healthcare", value: "Healthcare", label: "Healthcare" },
      {
        title: "Finance",
        value: "Finance",
        label: "Finance",
      },
      {
        title: "Education",
        value: "Education",
        label: "Education",
      },
      {
        title: "Technology",
        value: "Technology",
        label: "Technology",
      },
    ],
    placeholder: "Select your Industry",
    type: "dropdown",
    required: true,
  },

  {
    title: "Company size",
    attr: "companysize",
    value: "",
    options: [
      {
        title: "Small Business",
        value: "Small Business",
        label: "Small Business",
      },
      {
        title: "Mid-Size Business",
        value: "Mid-Size Business",
        label: "Mid-Size Business",
      },
      {
        title: "Large Corporation",
        value: "Large Corporation",
        label: "Large Corporation",
      },
    ],
    placeholder: "Select your Company size",
    type: "dropdown",
    required: true,
  },
  {
    title: "Job title",
    attr: "jobtitle",
    value: "",
    options: [
      { title: "Manager", value: "Manager", label: "Manager" },
      {
        title: "Director",
        value: "Director",
        label: "Director",
      },
      {
        title: "Executive",
        value: "Executive",
        label: "Executive",
      },
    ],
    placeholder: "Select your Job Title",
    type: "dropdown",
    required: true,
  },
  {
    title: "Interests",
    attr: "interests",
    value: "",
    options: [
      { title: "Travel", value: "Travel", label: "Travel" },
      {
        title: "Fitness",
        value: "Fitness",
        label: "Fitness",
      },
      {
        title: "Cooking",
        value: "Cooking",
        label: "Cooking",
      },
      {
        title: "Reading",
        value: "Reading",
        label: "Reading",
      },
    ],
    placeholder: "Select your Interests",
    type: "dropdown",
    required: true,
  },
  {
    title: "Personal goals",
    attr: "personalgoals",
    value: "",
    options: [
      {
        title: "Career Advancement",
        value: "Career Advancement",
        label: "Career Advancement",
      },
      {
        title: "Financial Independence",
        value: "Financial Independence",
        label: "Financial Independence",
      },
      {
        title: "Personal Development",
        value: "Personal Development",
        label: "Personal Development",
      },
    ],
    placeholder: "Select your Personal goals",
    type: "dropdown",
    required: true,
  },

  {
    title: "What are you looking to do with Plannr AI?",
    attr: "planning",
    value: "",
    options: [
      {
        title: "Personal Planning",
        value: "Personal Planning",
        label: "Personal Planning",
      },
      {
        title: "Professional Planning",
        value: "Professional Planning",
        label: "Professional Planning",
      },
      {
        title: "Business Planning",
        value: "Business Planning",
        label: "Business Planning",
      },
    ],
    placeholder: "Select your Planning Type",
    type: "dropdown",
    required: true,
  },
];

function UserProfileForm(props) {
  const [userProfile, setUserProfile] = useState({});
  const [userProfileError, setUserProfileError] = useState({});
  const [currentStep, setCurrentStep] = useState(0);

  const renderCorrespondingInput = ({
    type,
    attr,
    placeholder,
    options,
    maxLength,
    error,
    value,
  }) => {
    switch (type) {
      case "dropdown":
        return (
          <EntryDropdown
            name={attr}
            placeholder={placeholder}
            onChange={(e) => onChange(attr, e.value)}
            options={options}
          />
        );
      default:
        return (
          <>
            <div
              className={`text-xs absolute z-30 right-2 select-none pointer-events-none transition-all top bg-white px-2 `}
            >
              {value.length} chars
            </div>
            <label
              htmlFor={attr}
              className="relative transition text-gray-600 focus-within:text-gray-800 block"
            >
              <input
                name={attr}
                id={attr}
                maxLength={maxLength || 80}
                className={`outline-none focus:outline-none  bg-white rounded-md px-4 py-2 w-full border  focus:border-gray-400 ${
                  error ? "border-red-400" : "border-gray-300"
                } font-regular mt-2 transition-all`}
                onChange={(e) => onChange(attr, e.target.value)}
              />
            </label>
          </>
        );
    }
  };

  const handleNextAction = () => {
    debugger;
    if (currentStep === 0 && Object.keys(userProfile).length != 4) {
      const errorState = {};
      if (!userProfile["ageRange"])
        errorState["ageRange"] = "Selection of Age Range is required";
      if (!userProfile["educationLevel"])
        errorState["educationLevel"] =
          "Selection of Education Level is required";
      if (!userProfile["gender"])
        errorState["gender"] = "Selection of Gender is required";
      if (!userProfile["location"])
        errorState["location"] = "Min Length of Location is 1";
      console.log(errorState);
      setUserProfileError({ ...errorState });
    } else if (
      currentStep === 1 &&
      Object.keys(userProfile).length != userProfileFields.length
    ) {
      debugger;
      const errorState = {};
      if (!userProfile["industry"])
        errorState["industry"] = "Selection of Industry is required";
      if (!userProfile["companysize"])
        errorState["companysize"] = "Selection of Company Size is required";
      if (!userProfile["jobtitle"])
        errorState["jobtitle"] = "Selection of Job title is required";
      if (!userProfile["interests"])
        errorState["interests"] = "Selection of Interests is required";
      if (!userProfile["personalgoals"])
        errorState["personalgoals"] = "Selection of Personal Goals is required";
      if (!userProfile["planning"])
        errorState["planning"] = "Selection of Planning Type is required";
      console.log(errorState);
      setUserProfileError({ ...errorState });
    } else {
      if (currentStep == 1) {
        console.log(userProfile);
        props.onNext();
      } else {
        setCurrentStep((cur) => cur + 1);
        setUserProfileError({});
        console.log(userProfile);
      }
    }
  };

  const onChange = async (key, value) => {
    if (value.length) {
      setUserProfile((prevState) => {
        return {
          ...prevState,
          [key]: value,
        };
      });
      const errorState = userProfileError;
      delete errorState[key];
      setUserProfileError({
        ...errorState,
      });
    } else {
      const user = userProfile;
      delete user[key];
      setUserProfileError({
        ...user,
      });
    }
  };

  return (
    <Wrapper>
      <StyledForm>
        {/* <pre>{currentStep}</pre> */}
        {currentStep == 1 ? (
          <>
            {userProfileFields.slice(4).map((field, index) => {
              return (
                <div key={field.attr}>
                  <FlexContainer>
                    <Label className="text-gray-600 font-medium text-md">
                      {field.title}
                    </Label>
                    <div className="relative flex flex-col gap-y-3">
                      {renderCorrespondingInput({
                        type: field.type,
                        options: field.options,
                        placeholder: field.placeholder,
                        attr: field.attr,
                        value: userProfile[field.attr] || field.value,
                        maxLength: field.maxLength,
                      })}
                      {userProfileError[field.attr] && (
                        <div
                          className={`${
                            userProfileError[field.attr]
                              ? "text-red-400"
                              : "text-gray-400"
                          } text-sm transition-all line mt-1`}
                        >
                          {userProfileError[field.attr]}
                        </div>
                      )}
                    </div>
                  </FlexContainer>
                  <HorizontalRule
                    isLast={index === userProfileFields.length - 1 - 4}
                  />
                </div>
              );
            })}
          </>
        ) : (
          <>
            {userProfileFields.slice(0, 4).map((field, index) => {
              return (
                <div key={field.attr}>
                  <FlexContainer>
                    <Label className="text-gray-600 font-medium text-md">
                      {field.title}
                    </Label>
                    <div className="relative flex flex-col gap-y-3">
                      {renderCorrespondingInput({
                        type: field.type,
                        options: field.options,
                        placeholder: field.placeholder,
                        attr: field.attr,
                        value: userProfile[field.attr] || field.value,
                        maxLength: field.maxLength,
                      })}
                      {userProfileError[field.attr] && (
                        <div
                          className={`${
                            userProfileError[field.attr]
                              ? "text-red-400"
                              : "text-gray-400"
                          } text-sm transition-all line mt-1`}
                        >
                          {userProfileError[field.attr]}
                        </div>
                      )}
                    </div>
                  </FlexContainer>
                  <HorizontalRule isLast={index === 3} />
                </div>
              );
            })}
          </>
        )}
      </StyledForm>
      <NextButton>
        <Button
          onClick={handleNextAction}
          variant="contained"
          endIcon={
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
        >
          Next
        </Button>
      </NextButton>
    </Wrapper>
  );
}

export default UserProfileForm;

const HorizontalRule = styled.div`
  height: ${(props) => (props.isLast ? "0px" : "1px")};
  background: #eaecf0;
  margin: 30px 0px;
`;

const NextButton = styled.div`
  display: flex;
  justify-content: end;
  button {
    width: 120px;
    svg {
      transform: rotate(90deg);
    }
  }
`;

const Wrapper = styled.div`
  margin: 0 auto;
  margin-top: 5vh;
  width: 50vw;
  display: flex;
  flex-direction: column;
  gap: 50px;
  /* margin: 4vh auto 0px; */
  @media only screen and (max-width: 1200px) {
    width: 80vw;
  }
  /* > h1 {
    text-align: left;
    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-size: 30px;
    line-height: 14px;
    color: #6b7280;
  } */
`;

const StyledForm = styled.div`
  width: 50vw;
  margin: 0 auto;
  /* padding-top: 8vh; */
  @media only screen and (max-width: 1200px) {
    width: 100%;
  }
`;

const FlexContainer = styled.div`
  display: flex;

  label {
    flex: 0.4;
  }
  > div {
    flex: 0.6;
  }
`;

const Label = styled.label`
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 20px;
  display: flex;
  align-items: center;
  color: #344054;
`;
