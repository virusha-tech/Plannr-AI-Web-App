const express = require("express");
const openai = require("../middlewares/openai");

let app = express.Router();

app.post("/subsequentQuestion", async (req, res, next) => {
  try {
    let { question: prompt } = req.body;
    const gptResponse = await openai.complete({
      engine: "davinci",
      prompt,
      maxTokens: 100,
      temperature: 0.2,
      topP: 1,
      frequencyPenalty: 1,
      presencePenalty: 0,
      bestOf: 1,
      n: 1,
      user: req.user._id,
      stream: false,
      stop: ["###", "<|endoftext|>"],
    });

    let output = `${gptResponse.data.choices[0].text}`;

    //remove the first character from output
    output = output.substring(1, output.length);

    // If the output string ends with one or more hashtags, remove all of them
    if (output.endsWith('"')) {
      output = output.substring(0, output.length - 1);
    }

    // If the output string ends with one or more hashtags, remove all of them
    if (output.endsWith('"')) {
      output = output.substring(0, output.length - 1);
    }

    // remove a single new line at the end of output if there is one
    if (output.endsWith("\n")) {
      output = output.substring(0, output.length - 1);
    }

    res.send({
      question: prompt,
      answer: output,
    });
  } catch (err) {
    console.log(err.response);
    console.log(err.data);
    console.log(err.message);
  }
});

module.exports = app;
