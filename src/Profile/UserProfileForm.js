import React, { useState } from "react";
import styled from "styled-components";
import EntryDropdown from "./../Components/EntryDropdown";
import { Button, Tooltip } from "@mui/material";
const industryList = [
  "Retail",
  "Hospitality",
  "Marketing/Advertising",
  "Real Estate",
  "Consulting",
  "Non-profit/NGO",
  "Manufacturing",
  "Transportation/Logistics",
  "Government",
  "Legal Services",
  "Agriculture",
  "Construction",
  "Energy/Utilities",
  "Media/Entertainment",
  "Fashion/Beauty",
  "Sports/Fitness",
  "Art/Culture",
  "Automotive",
  "Healthcare",
  "Finance",
  "Education",
  "Technology",
  "Telecommunications",
  "Other",
];

const companySize = [
  "Solo Entrepreneur/Individual",
  "Small Business (1-50 employees)",
  "Medium-sized Business (51-250 employees)",
  "Large Business (251-1000 employees)",
  "Enterprise (1001+ employees)",
];

const jobtitle = [
  "CEO/Founder",
  "Manager",
  "Director",
  "Analyst",
  "Engineer",
  "Sales Representative",
  "Consultant",
  "Human Resources",
  "Marketing Manager",
  "Customer Service Representative",
];

const personalGoal = [
  "Health and Wellness",
  "Relationship Building",
  "Education and Learning",
  "Community Involvement",
  "Travel and Adventure",
  "Creative Pursuits",
  "Philanthropy and Giving Back",
  "Spiritual Growth",
  "Family and Parenting",
  "Homeownership and Real Estate",
  "Retirement Planning",
];

const interests = [
  "Technology (specific areas like AI, Machine Learning, Blockchain, etc.)",
  "Marketing (e.g. Digital Marketing, Content Marketing, SEO)",
  "Creative (e.g. Graphic Design, Photography, Video Production)",
  "Entrepreneurship",
  "Fashion and Beauty",
  "Arts and Culture",
  "Food and Beverage",
  "Sustainability",
  "Personal Development",
  "Sports and Fitness",
  "Music and Entertainment",
  "Gaming",
  "Travel and Tourism",
  "Education and Learning",
  "Science and Technology",
  "Health and Wellness",
  "Finance and Investing",
  "Social Justice and Activism",
  "Parenting and Family",
  "Pets and Animals",
  "Home and Garden",
  "Automotive and Transportation",
];

const mapArraytoReactSelectorOptions = (array) => {
  return array.map((arr) => {
    return {
      title: arr,
      value: arr,
      label: arr,
    };
  });
};

const userProfileFields = [
  {
    title: "Age range",
    attr: "ageRange",
    value: "",
    options: [
      { title: "18-24", value: "18-24", label: "18-24" },
      { title: "25-34", value: "25-34", label: "25-34" },
      { title: "35-44", value: "35-44", label: "35-44" },
      { title: "45-60", value: "45-60", label: "45-60" },
    ],
    placeholder: "Select your Age Range",
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
      {
        title: "PhD.",
        value: "PhD.",
        label: "PhD.",
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
    options: mapArraytoReactSelectorOptions(industryList),
    placeholder: "Select your Industry",
    type: "dropdown",
    required: true,
  },

  {
    title: "Company size",
    attr: "companysize",
    value: "",
    options: mapArraytoReactSelectorOptions(companySize),
    placeholder: "Select your Company size",
    type: "dropdown",
    required: true,
  },
  {
    title: "Job title",
    attr: "jobtitle",
    value: "",
    options: mapArraytoReactSelectorOptions(jobtitle),
    placeholder: "Select your Job Title",
    type: "dropdown",
    required: true,
  },
  {
    title: "Interests",
    attr: "interests",
    value: "",
    options: mapArraytoReactSelectorOptions(interests),
    placeholder: "Select your Interests",
    type: "dropdown",
    required: true,
    isMulti: true,
    tooltipText: "Select at least 3 Interests",
  },
  {
    title: "Personal goals",
    attr: "personalgoals",
    value: "",
    options: mapArraytoReactSelectorOptions(personalGoal),
    placeholder: "Select your Personal goals",
    type: "dropdown",
    required: true,
    isMulti: true,
    tooltipText: "Select at least 3 Personal goals",
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
    isMulti: true,
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
    isMulti = false,
  }) => {
    switch (type) {
      case "dropdown":
        return (
          <EntryDropdown
            name={attr}
            placeholder={placeholder}
            onChange={(e) => onChange(attr, e)}
            options={options}
            isMulti={isMulti}
            isError={userProfileError[attr]}
          />
        );
      default:
        return (
          <>
            <label
              htmlFor={attr}
              className="relative transition text-gray-600 focus-within:text-gray-800 block"
            >
              <input
                name={attr}
                id={attr}
                maxLength={maxLength || 80}
                className={`outline-none focus:outline-none  bg-white rounded-md px-4 py-2 w-full border  focus:border-gray-400 ${
                  userProfileError[attr] ? "border-red-400" : "border-gray-300"
                } font-regular mt-2 transition-all`}
                onChange={(e) => onChange(attr, e.target)}
              />
            </label>
          </>
        );
    }
  };

  const handleSkipAction = async () => {
    props.onSkip(userProfile);
  };

  const handleNextAction = () => {
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
      setUserProfileError({ ...errorState });
    } else if (
      currentStep === 1 &&
      Object.keys(userProfile).length != userProfileFields.length
    ) {
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
      setUserProfileError({ ...errorState });
    } else {
      if (currentStep == 1) {
        props.onNext(userProfile);
      } else {
        setCurrentStep((cur) => cur + 1);
        setUserProfileError({});
      }
    }
  };

  const onChange = async (key, event) => {
    const value = event.value;
    if (value?.length || (Array.isArray(event) && event.length > 0)) {
      if (value?.length) {
        setUserProfile((prevState) => {
          return {
            ...prevState,
            [key]: value,
          };
        });
      } else {
        setUserProfile((prevState) => {
          return {
            ...prevState,
            [key]: event.map(({ value }) => value),
          };
        });
      }
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
        {currentStep == 1 ? (
          <>
            {userProfileFields.slice(4).map((field, index) => {
              return (
                <div key={field.attr}>
                  <FlexContainer>
                    <Label className="text-gray-600 font-medium text-md">
                      {field.title}
                      {field.tooltipText ? (
                        <StyledTooltip
                          title={field.tooltipText}
                          placement="right-end"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                            />
                          </svg>
                        </StyledTooltip>
                      ) : null}
                    </Label>
                    <div className="relative flex flex-col gap-y-3">
                      {renderCorrespondingInput({
                        type: field.type,
                        options: field.options,
                        placeholder: field.placeholder,
                        attr: field.attr,
                        value: userProfile[field.attr] || field.value,
                        maxLength: field.maxLength,
                        isMulti: field.isMulti ?? false,
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
        {currentStep == 1 ? (
          <SkipButton onClick={handleSkipAction} variant="contained">
            Skip
          </SkipButton>
        ) : null}
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

const SkipButton = styled(Button)`
  background: grey !important;
`;

const HorizontalRule = styled.div`
  height: ${(props) => (props.isLast ? "0px" : "1px")};
  background: #eaecf0;
  margin: 30px 0px;
`;

const NextButton = styled.div`
  display: flex;
  justify-content: end;
  gap: 30px;
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

const StyledTooltip = styled(Tooltip)`
  margin-left: 10px;
  position: relative;
  top: -10px;
`;
