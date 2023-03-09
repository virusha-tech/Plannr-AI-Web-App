import React, { Component } from "react";
import { UserCircleIcon } from "@heroicons/react/solid";
import { styled as mStyled } from "@mui/material/styles";

import styled from "styled-components";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import CompanyLogo from "./assets/CompanyLogo.svg";

import config from "./config";
import { Stepper, Step, StepLabel } from "@mui/material";
import { observer, inject } from "mobx-react";
import { getSignUpSteps } from "./tools/utils";
import Footer from "./Footer";
import UserProfileForm from "./Profile/UserProfileForm";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { Helmet } from "react-helmet";

const StyledStepLabel = styled(StepLabel)`
  .MuiStepLabel-label {
    font-size: 24px;
    padding: 10px;
  }
  .MuiSvgIcon-root.MuiStepIcon-root {
    height: 2rem;
    width: 2rem;
    margin: 5px;
  }
`;

const amount = {
  personal: {
    indianCurrency: {
      monthly: `0`,
      yearly: 0 * 10,
      monthly_key: config.stripe.personal_monthly_indianCurrency,
      yearly_key: config.stripe.personal_yearly_indianCurrency,
    },
    USCurrency: {
      monthly: 0,
      yearly: 0,
      monthly_key: config.stripe.personal_monthly_USCurrency,
      yearly_key: config.stripe.personal_yearly_USCurrency,
    },
  },
  professional: {
    indianCurrency: {
      monthly: `99`,
      yearly: `999`,
      monthly_key: config.stripe.professional_monthly_indianCurrency,
      yearly_key: config.stripe.professional_yearly_indianCurrency,
    },
    USCurrency: {
      monthly: 5,
      yearly: 50,
      monthly_key: config.stripe.professional_monthly_USCurrency,
      yearly_key: config.stripe.professional_yearly_USCurrency,
    },
  },
  Business: {
    indianCurrency: {
      monthly: `249`,
      yearly: 2499,
      monthly_key: config.stripe.business_monthly_indianCurrency,
      yearly_key: config.stripe.business_yearly_indianCurrency,
    },
    USCurrency: {
      monthly: 25,
      yearly: 250,
      monthly_key: config.stripe.business_monthly_USCurrency,
      yearly_key: config.stripe.business_yearly_USCurrency,
    },
  },
};

const CheckIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="24" height="24" rx="12" fill="#D1FADF" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M17.0964 7.39004L9.93638 14.3L8.03638 12.27C7.68638 11.94 7.13638 11.92 6.73638 12.2C6.34638 12.49 6.23638 13 6.47638 13.41L8.72638 17.07C8.94638 17.41 9.32638 17.62 9.75638 17.62C10.1664 17.62 10.5564 17.41 10.7764 17.07C11.1364 16.6 18.0064 8.41004 18.0064 8.41004C18.9064 7.49004 17.8164 6.68004 17.0964 7.38004V7.39004Z"
        fill="#12B76A"
      />
    </svg>
  );
};

const StyledContainer = styled.div`
  padding: 0px 10px;
  background: white;
  min-height: 83vh;
`;

const AlignStepper = styled.div`
  width: 50vw;
  margin: 4vh auto 0px;
  @media only screen and (max-width: 1200px) {
    width: 100%;
  }
`;

const StyledStepper = styled(Stepper)`
  background: inherit !important;
`;

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.primary,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.primary,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const PlannerTab = mStyled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    minWidth: 0,
    [theme.breakpoints.up("sm")]: {
      minWidth: 0,
    },
    padding: "4px",
    marginRight: theme.spacing(1),
    fontWeight: 600,
    fontSize: "16px",
    padding: "22px",
    "&:hover": {
      color: theme.palette.primary,
      opacity: 1,
    },
    "&.Mui-selected": {
      color: theme.palette.primary,
      background: "#FFFFFF",
      boxShadow:
        "0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)",
      borderRadius: "6px",
    },
    "&.Mui-focusVisible": {
      backgroundColor: "#d1eaff",
    },
  })
);

const StyledPlannerTab = mStyled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => {
    console.log(theme.palette.primary.main);
    return {
      textTransform: "none",
      minWidth: 0,
      [theme.breakpoints.up("sm")]: {
        minWidth: 0,
      },
      padding: "4px",
      marginRight: theme.spacing(1),
      fontWeight: 600,
      fontSize: "16px",
      // color
      backgroundColor: theme.palette.primary,
      padding: "22px",
      "&:hover": {
        color: "white",
        background: theme.palette.primary.main,
        opacity: 0.7,
        borderRadius: "6px",
      },
      "&.Mui-selected": {
        color: "white",
        background: theme.palette.primary.main,
        boxShadow:
          "0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)",
        borderRadius: "6px",
      },
      "&.Mui-focusVisible": {
        backgroundColor: theme.palette.primary,

        // backgroundColor: "#d1eaff",
      },
    };
  }
);

const PlannerTabs = styled(Tabs)({
  border: "1px solid #F2F4F7",
  borderRadius: "8px",
  boxSizing: "content-box",
  padding: "6px",
  background: "#F9FAFB",
});

function BasicTabs({ handleTabChange }) {
  const [subscription, setSubscription] = React.useState("monthly");
  const [currency, setCurrency] = React.useState("indianCurrency");

  const handleChange = (key, newValue) => {
    if (key === "subscription") {
      setSubscription(newValue);
    } else {
      setCurrency(newValue);
    }
    handleTabChange(key, newValue);
  };

  return (
    <Box sx={{ width: "100%" }} className="xs:mt-4 xs:mb-6 sm:m-8 sm:mb-12">
      <Flex>
        <div></div>
        <PlannerTabs
          value={subscription}
          onChange={(_, newValue) => handleChange("subscription", newValue)}
          centered
          indicatorColor={""}
        >
          <PlannerTab label="Monthly billing" value="monthly" />
          <PlannerTab
            label="Annual billing"
            value="annually"
            iconPosition="end"
            icon={<Chip label="Save 20%" />}
          />
        </PlannerTabs>
        <PlannerTabs
          value={currency}
          onChange={(_, newValue) => handleChange("currency", newValue)}
          indicatorColor={""}
        >
          <StyledPlannerTab
            value="indianCurrency"
            icon={
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
                  d="M15 8.25H9m6 3H9m3 6l-3-3h1.5a3 3 0 100-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            }
            aria-label="Rupee"
          />
          <StyledPlannerTab
            value="USCurrency"
            icon={
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
                  d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            }
            aria-label="Dollar"
          />
        </PlannerTabs>
      </Flex>
    </Box>
  );
}

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  @media only screen and (max-width: 1200px) {
    flex-direction: column;
    gap: 20px;
    align-items: center;
  }
`;

@inject("store")
@observer
class Pricing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 1,
      subscription: "monthly",
      currency: "indianCurrency",
    };
    this.handleNextAction = this.handleNextAction.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
    this.handleSkipAction = this.handleSkipAction.bind(this);
    this.steps = getSignUpSteps();
  }

  async handleNextAction(payload) {
    await this.props.store.api.put("/user/update", { payload });
    this.setState((prev) => {
      return {
        activeStep: prev.activeStep + 1,
      };
    });
  }

  handleTabChange(key, value) {
    if (value === 1) {
      this.setState({ [key]: value });
    } else {
      this.setState({ [key]: value });
    }
  }

  async handleSkipAction(payload) {
    await this.props.store.api.put("/user/update", { payload });
    this.setState((prev) => {
      return {
        activeStep: prev.activeStep + 1,
      };
    });
  }

  render() {
    return (
      <>
        {this.props.store.profile.status ? null : (
          <div className="border-b border-gray-300 bg-white shadow-sm ">
            <div className="container flex mx-auto px-4 md:px-28 flex select-none">
              <img src={CompanyLogo} alt="Company Logo" width="137" />
              <div className="relative text-gray-400 focus-within:text-green-500 flex flex-1 "></div>
              <div
                onClick={this.props.store.handleLogout}
                className="cursor-pointer text-lg flex py-3 px-6 xl:py-4 xl:px-8 hover:bg-gray-100 rounded-t-md font-medium transition items-center"
              >
                <UserCircleIcon className="w-7 h-7 lg:mr-4 transition" />
                <div className="hidden lg:block"> Log Out</div>
              </div>
            </div>
          </div>
        )}
        <StyledContainer>
          <AlignStepper>
            <StyledStepper
              alternativeLabel
              connector={<QontoConnector />}
              activeStep={this.state.activeStep}
            >
              {this.steps.map((label, index) => {
                return (
                  <Step key={label}>
                    <StyledStepLabel StepIconComponent={QontoStepIcon}>
                      {label}
                    </StyledStepLabel>
                  </Step>
                );
              })}
            </StyledStepper>
          </AlignStepper>
          {this.state.activeStep === 1 ? (
            <>
              <Helmet>
                <title>{`Basic Info - Plannr AI`}</title>
              </Helmet>
              <UserProfileForm
                onNext={this.handleNextAction}
                onSkip={this.handleSkipAction}
              />
            </>
          ) : (
            <>
              <Helmet>
                <title>{`Pricing - Plannr AI`}</title>
              </Helmet>
              <div className="container mx-auto px-8 py-4 lg:px-28 lg:py-12 lg:pb-64 select-none">
                <Wrapper>
                  <Header>Plans that fit your scale</Header>
                  <SubHeader>
                    Get started with a 14-day trial. Cancel anytime
                  </SubHeader>
                  <Styledheader>
                    Simple, transparent pricing that grows with you.
                  </Styledheader>
                </Wrapper>
                <BasicTabs handleTabChange={this.handleTabChange} />
                <Grid>
                  {/* {this.props.store.profile.status ? null : ( */}

                  <Personal
                    fromColor="gray-400"
                    toColor="gray-500"
                    baseURL={this.props.store.baseURL}
                    api={this.props.store.api}
                    displayInRupee={this.state.displayInRupee}
                    isIndianCurrency={this.state.currency === "indianCurrency"}
                    isMonthlySubscription={
                      this.state.subscription === "monthly"
                    }
                  />
                  <Professional
                    fromColor="green-400"
                    toColor="green-600"
                    baseURL={this.props.store.baseURL}
                    api={this.props.store.api}
                    isIndianCurrency={this.state.currency === "indianCurrency"}
                    isMonthlySubscription={
                      this.state.subscription === "monthly"
                    }
                  />
                  <Premium
                    fromColor="indigo-500"
                    toColor="red-500"
                    baseURL={this.props.store.baseURL}
                    api={this.props.store.api}
                    isIndianCurrency={this.state.currency === "indianCurrency"}
                    isMonthlySubscription={
                      this.state.subscription === "monthly"
                    }
                  />
                </Grid>
              </div>
            </>
          )}
        </StyledContainer>
        <Footer />
      </>
    );
  }
}

const Header = styled.h1`
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 48px;
  line-height: 60px;
  text-align: center;
  letter-spacing: -0.02em;
  color: #101828;
  margin-bottom: 24px;
`;

const Wrapper = styled.div`
  margin: 0 auto;
`;

const SubHeader = styled.h1`
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 30px;
  text-align: center;
  clip-path: polygon(0 0, 100% 0, 93% 48%, 100% 100%, 0 100%, 7% 52%);
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 40px;
  color: white;
  margin: 0 auto;
  margin-bottom: 12px;
  max-width: 694px;
  /* max-width: ; */
  padding: 5px 40px;
  background-color: ${({ theme }) => {
    return theme.primary;
  }};
`;

const Styledheader = styled.h3`
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 30px;
  text-align: center;
  color: #475467;
`;
const Personal = ({
  fromColor,
  toColor,
  baseURL,
  api,
  isIndianCurrency,
  isMonthlySubscription,
}) => {
  let key = isIndianCurrency
    ? isMonthlySubscription
      ? amount["personal"]["indianCurrency"]["monthly_key"]
      : amount["personal"]["indianCurrency"]["yearly_key"]
    : isMonthlySubscription
    ? amount["personal"]["USCurrency"]["monthly_key"]
    : amount["personal"]["USCurrency"]["yearly_key"];
  // console.log(key);
  return (
    <div className="flex relative ">
      <Card
        className={`bg-white rounded-xl transition hover:shadow-md overflow-hidden md:max-w-1lg text-gray-500 md:flex relative transform hover:scale-105  hover: flex-1`}
      >
        <div className="p-8 flex-1">
          <div
            href="#"
            className={` block text-lg text-2xl leading-tight font-medium mb-2`}
          >
            Personal
          </div>
          <p className="mt-2  mb-2 text-md" style={{ height: "50px" }}>
            Smarter planning for personal success
          </p>

          <div className="text-6xl  font-bold pb-4">
            {isIndianCurrency ? (
              <span>
                &#8377;
                {isMonthlySubscription
                  ? amount["personal"]["indianCurrency"]["monthly"]
                  : amount["personal"]["indianCurrency"]["yearly"]}
              </span>
            ) : (
              <span>
                &#36;
                {isMonthlySubscription
                  ? amount["personal"]["USCurrency"]["monthly"]
                  : amount["personal"]["USCurrency"]["yearly"]}
              </span>
            )}
            <span className="text-lg">
              {isMonthlySubscription ? "/ month" : "/ year"}
            </span>
          </div>
          <div className="bg-black h-px horizontalLine"></div>

          <div>
            <h6 className="mt-4 mb-4 text-md -700">
              <strong>FEATURES</strong>
            </h6>
            <span>Get started with a 14-day trial. Cancel anytime</span>
          </div>

          <div className="divide-y divide-dashed divide-gray-300 mt-4">
            <div className="py-2 flex gap-4">
              <CheckIcon />
              <div>
                <span className="font-medium ">1000 monthly credits</span>
              </div>
            </div>
            <div className="py-2 flex gap-4">
              <CheckIcon />
              <div>
                <span className="font-medium ">50K monthly words</span>
              </div>
            </div>
            <div className="py-2 flex  gap-4 items-center">
              <CheckIcon />
              <div>
                <span className="font-medium ">30 Plans</span>
              </div>
            </div>
            <div className="py-2 flex  gap-4 items-center">
              <CheckIcon />
              <div>
                <span className="font-medium ">Access to basic plans</span>
              </div>
            </div>
            <div className="py-2 flex gap-4  items-center">
              <CheckIcon />
              <div>
                <span className="font-medium  gap-4 ">One User</span>
              </div>
            </div>
            <p style={{ height: "41px", border: "none" }}></p>
            <p style={{ height: "41px", border: "none" }}></p>
          </div>

          <form
            action={baseURL + "user/stripe/subscribe"}
            method="POST"
            className="flex flex-1"
          >
            <input
              type="hidden"
              name="token"
              value={api.defaults.headers.common["x-access-token"]}
            />
            <input type="hidden" name="priceId" value={key} />
            {/* <input type="hidden" name="trial" value="true" /> */}
            <input type="hidden" name="plan" value="personal" />
            <button
              type="submit"
              className={`mt-8 inset-0 bg-gradient-to-r shadow-lg flex-1 rounded-md p-4 text-white font-medium text-center text-lg transition hover:from-gray-700 hover:to-gray-800 text-enter`}
            >
              Get Started
            </button>
          </form>
        </div>
      </Card>
    </div>
  );
};

const Card = styled.div`
  > div {
    border: 1px solid #eaecf0;
    box-shadow: 0px 12px 16px -4px rgba(16, 24, 40, 0.08),
      0px 4px 6px -2px rgba(16, 24, 40, 0.03);
    border-radius: 16px;
  }

  button {
    background: ${({ theme }) => {
      return theme.primary;
    }};
    color: white;
  }
`;

const ProCard = styled(Card)`
  background: ${({ theme }) => {
    return theme.primary;
  }};
  color: white;
  min-height: "680px";
  box-shadow: "0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)";
  border-radius: "16px";
  .horizontalLine {
    background: white;
  }
  button {
    color: ${({ theme }) => {
      return theme.primary;
    }};
    background: white;
  }
`;

const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  color: "#eaeaf0",
  display: "flex",
  height: 22,
  alignItems: "center",
  ...(ownerState.active && {
    color: theme.primary,
  }),
  "& .QontoStepIcon-completedIcon": {
    color: theme.primary,
    zIndex: 1,
    fontSize: 18,
    margin: 4,
  },
  "& .QontoStepIcon-circle": {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <div className="QontoStepIcon-completedIcon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

const Professional = ({
  fromColor,
  toColor,
  baseURL,
  api,
  isIndianCurrency,
  isMonthlySubscription,
}) => {
  let key = isIndianCurrency
    ? isMonthlySubscription
      ? amount["professional"]["indianCurrency"]["monthly_key"]
      : amount["professional"]["indianCurrency"]["yearly_key"]
    : isMonthlySubscription
    ? amount["professional"]["USCurrency"]["monthly_key"]
    : amount["professional"]["USCurrency"]["yearly_key"];

  return (
    <div className="flex relative ">
      <ProCard
        className={`bg-white rounded-xl transition hover:shadow-md overflow-hidden md:max-w-1lg text-gray-500 border- hover:border-${
          fromColor ? fromColor : "blue-400"
        } md:flex relative transform hover:scale-105  hover: flex-1`}
      >
        <div className="p-8 flex-1">
          <div
            href="#"
            className={` block text-lg text-2xl leading-tight font-medium mb-2`}
          >
            Professional
          </div>
          <p className="mt-2  mb-2 text-md" style={{ height: "50px" }}>
            Advanced planning for professional excellence
          </p>
          <div className="text-6xl  font-bold pb-4">
            {isIndianCurrency ? (
              <span>
                &#8377;
                {isMonthlySubscription
                  ? amount["professional"]["indianCurrency"]["monthly"]
                  : amount["professional"]["indianCurrency"]["yearly"]}
              </span>
            ) : (
              <span>
                &#36;
                {isMonthlySubscription
                  ? amount["professional"]["USCurrency"]["monthly"]
                  : amount["professional"]["USCurrency"]["yearly"]}
              </span>
            )}
            <span className="text-lg">
              {isMonthlySubscription ? "/ month" : "/ year"}
            </span>
          </div>

          <div className="bg-black h-px horizontalLine"></div>

          <div>
            <h6 className="mt-4 mb-4 text-md -700">
              <strong>FEATURES</strong>
            </h6>
            <span>Get started with a 14-day trial. Cancel anytime</span>
          </div>

          <div className="divide-y divide-dashed divide-gray-300 mt-4">
            <div className="py-2 flex gap-4">
              <CheckIcon />
              <div>
                <span className="font-medium ">Everything in Personal</span>
              </div>
            </div>
            <div className="py-2 flex  gap-4 items-center">
              <CheckIcon />
              <div>
                <span className="font-medium ">
                  {isMonthlySubscription ? "3,000" : "36,000"} monthly credits
                </span>
              </div>
            </div>
            <div className="py-2 flex  gap-4 items-center">
              <CheckIcon />
              <div>
                <span className="font-medium ">150K monthly words</span>
              </div>
            </div>
            <div className="py-2 flex  gap-4 items-center">
              <CheckIcon />
              <div>
                <span className="font-medium ">100 Plans</span>
              </div>
            </div>
            <div className="py-2 flex gap-4  items-center">
              <CheckIcon />
              <div>
                <span className="font-medium  gap-4 ">One User</span>
              </div>
            </div>

            <div className="py-2 flex  gap-4 items-center">
              <CheckIcon />
              <div>
                <span className="font-medium ">Basic Integrations</span>
              </div>
            </div>
            <div className="py-2 flex gap-4  items-center">
              <CheckIcon />
              <div>
                <span className="-700">
                  <strong>14-day trial</strong>
                </span>
              </div>
            </div>
          </div>

          <form
            action={baseURL + "user/stripe/subscribe"}
            method="POST"
            className="flex flex-1"
          >
            <input
              type="hidden"
              name="token"
              value={api.defaults.headers.common["x-access-token"]}
            />
            <input type="hidden" name="priceId" value={key} />
            <input type="hidden" name="trial" value="true" />
            <input type="hidden" name="plan" value="professional" />

            <button
              type="submit"
              className={`mt-8 inset-0 bg-gradient-to-r from-${
                fromColor ? fromColor : "green-400"
              } to-${
                toColor ? toColor : "blue-500"
              } shadow-lg flex-1 rounded-md p-4 text-white font-medium text-center text-lg transition hover:from-gray-700 hover:to-gray-800 text-enter`}
            >
              Start Trial
            </button>
          </form>
        </div>
      </ProCard>
    </div>
  );
};

const Premium = ({
  fromColor,
  toColor,
  baseURL,
  api,
  isIndianCurrency,
  isMonthlySubscription,
}) => {
  let key = isIndianCurrency
    ? isMonthlySubscription
      ? amount["Business"]["indianCurrency"]["monthly_key"]
      : amount["Business"]["indianCurrency"]["yearly_key"]
    : isMonthlySubscription
    ? amount["Business"]["USCurrency"]["monthly_key"]
    : amount["Business"]["USCurrency"]["yearly_key"];
  return (
    <div className="flex relative ">
      <Card
        //  background: ;
        className={`bg-white rounded-xl transition hover:shadow-md overflow-hidden md:max-w-1lg text-gray-500 border- hover:border-${"#05BBC2"} md:flex relative transform hover:scale-105  hover: flex-1`}
      >
        <div className="p-8 flex-1">
          <div
            href="#"
            className={` block text-lg text-2xl leading-tight font-medium mb-2`}
          >
            Business
          </div>
          <p className="mt-2  mb-2 text-md" style={{ height: "50px" }}>
            Strategic planning made smarter for business succes
          </p>
          <div className="text-6xl  font-bold pb-4 ">
            {isIndianCurrency ? (
              <span>
                &#8377;
                {isMonthlySubscription
                  ? amount["Business"]["indianCurrency"]["monthly"]
                  : amount["Business"]["indianCurrency"]["yearly"]}
              </span>
            ) : (
              <span>
                &#36;
                {isMonthlySubscription
                  ? amount["Business"]["USCurrency"]["monthly"]
                  : amount["Business"]["USCurrency"]["yearly"]}
              </span>
            )}
            <span className="text-lg">
              {isMonthlySubscription ? "/ month" : "/ year"}
            </span>
          </div>
          <div className="bg-black h-px horizontalLine"></div>
          <div>
            <h6 className="mt-4 mb-4 text-md -700">
              <strong>FEATURES</strong>
            </h6>
            <span>Get started with a 14-day trial. Cancel anytime</span>
          </div>
          <div className="divide-y divide-dashed divide-gray-300 mt-4">
            <div className="py-2 flex gap-4">
              <CheckIcon />
              <div>
                <span className="font-medium ">Everything in Professional</span>
              </div>
            </div>
            <div className="py-2 flex  gap-4 items-center">
              <CheckIcon />
              <div>
                <span className="font-medium ">
                  {isMonthlySubscription ? "20,000 monthly" : "2,40,000 yearly"}{" "}
                  credits
                </span>
              </div>
            </div>
            <div className="py-2 flex  gap-4 items-center">
              <CheckIcon />
              <div>
                <span className="font-medium ">1M monthly words</span>
              </div>
            </div>
            <div className="py-2 flex  gap-4 items-center">
              <CheckIcon />
              <div>
                <span className="font-medium ">250 Plans</span>
              </div>
            </div>
            <div className="py-2 flex gap-4  items-center">
              <CheckIcon />
              <div>
                <span className="font-medium  gap-4 ">20 users</span>
              </div>
            </div>

            <div className="py-2 flex  gap-4 items-center">
              <CheckIcon />
              <div>
                <span className="font-medium ">Advanced Integrations</span>
              </div>
            </div>
            <div className="py-2 flex gap-4  items-center">
              <CheckIcon />
              <div>
                <span className="-700">
                  <strong>14-day trial</strong>
                </span>
              </div>
            </div>
          </div>

          <form
            action={baseURL + "user/stripe/subscribe"}
            method="POST"
            className="flex flex-1"
          >
            <input
              type="hidden"
              name="token"
              value={api.defaults.headers.common["x-access-token"]}
            />
            <input type="hidden" name="priceId" value={key} />
            <input type="hidden" name="trial" value="true" />
            <input type="hidden" name="plan" value="premium" />

            <button
              type="submit"
              className={`mt-8 inset-0 bg-gradient-to-r from-${
                fromColor ? fromColor : "green-400"
              } to-${
                toColor ? toColor : "blue-500"
              } shadow-lg flex-1 rounded-md p-4 text-white font-medium text-center text-lg transition hover:from-gray-700 hover:to-gray-800 text-enter`}
            >
              Start Trial
            </button>
          </form>
        </div>
      </Card>
    </div>
  );
};

const Grid = ({ children }) => (
  <div className="grid grid-cols-1 gap-12 mt-4 xl:grid-cols-3 ">{children}</div>
);

export default Pricing;
