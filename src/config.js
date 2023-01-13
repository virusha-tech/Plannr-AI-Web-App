const dev = {
  baseURL: "http://localhost:3080/api/",
  landingPageUrl: "http://localhost:3080",
  stripe: {
    free: "price_1MNW04SB17XWitVzEcMoqiP0",
    entry: "price_1MNVzISB17XWitVzUeoQxSOF",
    pro: "price_1MPkwPSB17XWitVzKs64hNLR",
  },
};

const prod = {
  baseURL: "/api/",
  landingPageUrl: "https://beta.plannr.ai/",
  stripe: {
    free: "price_1MNW04SB17XWitVzEcMoqiP0",
    entry: "price_1MNVzISB17XWitVzUeoQxSOF",
    pro: "price_1MPkwPSB17XWitVzKs64hNLR",
  },
};

const config = process.env.NODE_ENV === "development" ? dev : prod;

export default config;
