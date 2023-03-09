const dev = {
  baseURL: "http://localhost:3080/api/",
  landingPageUrl: "http://localhost:3080",
  stripe: {
    free: "price_1Mi9T5SB17XWitVzdwgoMZBC",
    entry: "price_1Mi9hPSB17XWitVzPqlG0AjE",
    pro: "price_1MNuKMSB17XWitVz30mpm918",
    personal_monthly_indianCurrency: "price_1MjlezSB17XWitVzjlHbMFo0",
    personal_yearly_indianCurrency: "",
    personal_monthly_USCurrency: "",
    personal_yearly_USCurrency: "",
    professional_monthly_indianCurrency: "",
    professional_yearly_indianCurrency: "",
    professional_monthly_USCurrency: "",
    professional_yearly_USCurrency: "",
    business_monthly_indianCurrency: "",
    business_yearly_indianCurrency: "",
    business_monthly_USCurrency: "",
    business_yearly_USCurrency: "",
  },
};

const prod = {
  baseURL: "/api/",
  landingPageUrl: "https://beta.plannr.ai/",
  stripe: {
    free: "price_1MjlezSB17XWitVzjlHbMFo0",
    entry: "price_1Mi9hPSB17XWitVzPqlG0AjE",
    pro: "price_1MNuKMSB17XWitVz30mpm918",
    personal_monthly_indianCurrency: "price_1MjlezSB17XWitVzjlHbMFo0",
    personal_yearly_indianCurrency: "",
    personal_monthly_USCurrency: "",
    personal_yearly_USCurrency: "",
    professional_monthly_indianCurrency: "",
    professional_yearly_indianCurrency: "",
    professional_monthly_USCurrency: "",
    professional_yearly_USCurrency: "",
    business_monthly_indianCurrency: "",
    business_yearly_indianCurrency: "",
    business_monthly_USCurrency: "",
    business_yearly_USCurrency: "",
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
    label: "Whats new?",
    // to: "/whats-new",
    isButton: true,
    exact: true,
  },
];

const config = process.env.NODE_ENV === "development" ? dev : prod;

export default config;
