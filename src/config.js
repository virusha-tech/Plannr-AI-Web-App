const dev = {
  baseURL: "http://localhost:3080/api/",
  landingPageUrl: "http://localhost:3080",
  stripe: {
    free: "price_1MNW04SB17XWitVzEcMoqiP0",
    entry: "price_1MNVzISB17XWitVzUeoQxSOF",
    pro: "price_1MNVwuSB17XWitVzyKOBUCsk",
  },
};

const prod = {
  baseURL: "/api/",
  landingPageUrl: "https://app.openaitemplate.com",
  stripe: {
    free: "price_1MNW04SB17XWitVzEcMoqiP0",
    entry: "price_1MNVzISB17XWitVzUeoQxSOF",
    pro: "price_1MNVwuSB17XWitVzyKOBUCsk",
  },
};

const config = process.env.NODE_ENV === "development" ? dev : prod;

export default config;
