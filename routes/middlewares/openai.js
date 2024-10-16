// const OpenAI = require("openai-api");

// const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
// const openai = new OpenAI(OPENAI_API_KEY);

// module.exports = openai;

const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"], // This is the default and can be omitted
});


module.exports = client;
