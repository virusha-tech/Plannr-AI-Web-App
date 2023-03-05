const dev = {
  baseURL: "http://localhost:3080/api/",
  landingPageUrl: "http://localhost:3080",
  stripe: {
    free: "price_1Mi9T5SB17XWitVzdwgoMZBC",
    entry: "price_1Mi9hPSB17XWitVzPqlG0AjE",
    pro: "price_1MNuKMSB17XWitVz30mpm918",
  },
};

const prod = {
  baseURL: "/api/",
  landingPageUrl: "https://beta.plannr.ai/",
  stripe: {
    free: "price_1Mi9T5SB17XWitVzdwgoMZBC",
    entry: "price_1Mi9hPSB17XWitVzPqlG0AjE",
    pro: "price_1MNuKMSB17XWitVz30mpm918",
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
    to: "/help",
    exact: true,
  },
  {
    label: "Whats new?",
    to: "/whats-new",
    exact: true,
  },
];

const config = process.env.NODE_ENV === "development" ? dev : prod;

export default config;
