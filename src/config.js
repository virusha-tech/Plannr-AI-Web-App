const dev = {
  baseURL: "http://localhost:3080/api/",
  baseDomain:"https://dev.plannr.ai/",
  landingPageUrl: "http://localhost:3080",
  stripe: {
    // free: "price_1Mi9T5SB17XWitVzdwgoMZBC",
    // entry: "price_1Mi9hPSB17XWitVzPqlG0AjE",
    // pro: "price_1MNuKMSB17XWitVz30mpm918",
    personal_monthly_indianCurrency: "price_1Mi9T5SB17XWitVzdwgoMZBC",
    personal_yearly_indianCurrency: "price_1Mi9T5SB17XWitVzdwgoMZBC",
    personal_monthly_USCurrency: "price_1Mi9T5SB17XWitVzdwgoMZBC",
    personal_yearly_USCurrency: "price_1Mi9T5SB17XWitVzdwgoMZBC",
    professional_monthly_indianCurrency: "price_1Mi9T5SB17XWitVzdwgoMZBC",
    professional_yearly_indianCurrency: "price_1Mi9T5SB17XWitVzdwgoMZBC",
    professional_monthly_USCurrency: "price_1Mi9T5SB17XWitVzdwgoMZBC",
    professional_yearly_USCurrency: "price_1Mi9T5SB17XWitVzdwgoMZBC",
    business_monthly_indianCurrency: "price_1Mi9T5SB17XWitVzdwgoMZBC",
    business_yearly_indianCurrency: "price_1Mi9T5SB17XWitVzdwgoMZBC",
    business_monthly_USCurrency: "price_1Mi9T5SB17XWitVzdwgoMZBC",
    business_yearly_USCurrency: "price_1Mi9T5SB17XWitVzdwgoMZBC",
  },
};

const prod = {
  baseURL: "/api/",
  baseDomain:"https://beta.plannr.ai/",
  landingPageUrl: "https://beta.plannr.ai/",
  stripe: {
    // free: "price_1MjlezSB17XWitVzjlHbMFo0",
    // entry: "price_1Mi9hPSB17XWitVzPqlG0AjE",
    // pro: "price_1MNuKMSB17XWitVz30mpm918",
    personal_monthly_indianCurrency: "price_1MjlezSB17XWitVzjlHbMFo0",
    personal_yearly_indianCurrency: "price_1MjlsPSB17XWitVzO7nfuR0L",
    personal_monthly_USCurrency: "price_1Mjmo5SB17XWitVzOWGF46lI",
    personal_yearly_USCurrency: "price_1MjmrnSB17XWitVzt54hNcyX",
    professional_monthly_indianCurrency: "price_1MjloISB17XWitVzRMdsiWlL",
    professional_yearly_indianCurrency: "price_1MjltcSB17XWitVzBXac84uD",
    professional_monthly_USCurrency: "price_1MjmpJSB17XWitVzU47CB0yZ",
    professional_yearly_USCurrency: "price_1MjmsiSB17XWitVz2uK64BeF",
    business_monthly_indianCurrency: "price_1MjlrISB17XWitVzFR2eGEjB",
    business_yearly_indianCurrency: "price_1MjlwqSB17XWitVzB379fdK9",
    business_monthly_USCurrency: "price_1MjmqJSB17XWitVzRcdyZO9C",
    business_yearly_USCurrency: "price_1MjmtVSB17XWitVzZVsv2Hgw",
  },
};

export const TabList = [
  {
    label: "All",
    id: "AllAuthorizedCards",
  },
  {
    label: "Personal",
    id: "Personal",
  },
  {
    label: "Professional",
    id: "Professional",
  },
  {
    label: "Business",
    id: "Business",
  },
];

export const MenuList = [
  {
    label: "Dashboard",
    to: "/",
    exact: true,
  },
  {
    label: "All Plans",
    isButton: true,
  },
  {
    label: "Saved",
    to: "/saved-plans",
    exact: true,
  },
  {
    label: "Help",
    // to: "/help",
    isButton: true,

    exact: true,
  },
  {
    label: "Support",
    // to: "/whats-new",
    isButton: true,
    exact: true,
  },
  {
    label: "Logout",
    // to: "/whats-new",
    isButton: true,
    exact: true,
  },
];

// {
//   label: "Whats new?",
//   // to: "/whats-new",
//   isButton: true,
//   exact: true,
// },
console.log('REACTAPP',process.env.NODE_ENV)
const config = process.env.NODE_ENV === "development" ? dev : prod;

export default config;
