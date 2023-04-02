//import { ChatGPTAPIBrowser } from "chatgpt";
const express = require("express");
//const ChatGPTAPIBrowser = require("chatgpt");
const openai = require("../middlewares/openai");

let app = express.Router();

app.post("/workout", async (req, res, next) => {
  try {
    let {
      age,
      height,
      weight,
      fitnessGoal,
      healthInformation,
      scheduleAvailability,
      gender,
    } = req.body.plan;

    let conversation = [
      {
        role: "system",
        content: `You are an expert fitness trainer that knows everything about Health, fitness, and nutrition.`,
      },
    ];

    conversation.push({
      role: "user",
      content: `Please create a workout plan for a ${age}-year-old ${gender} with a height of ${height} and weight of ${weight}. His fitness goal is ${fitnessGoal}, and he has ${healthInformation}. The workout plan should cover ${scheduleAvailability} days, with exercises targeting chest, triceps, biceps, core, back, shoulders, legs, and calves. Include warm-up activities, and provide sets and repetitions for each exercise. Add a note about consulting a certified trainer or medical professional before starting any new exercise regimen.`,
    });

    console.log("conversation", conversation);
    const gptResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: conversation,
    });

    let output = `${gptResponse.data.choices[0].message.content}`;

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
    req.locals.output = output;
    req.locals.planName = "Workout Plan";
    next();
  } catch (err) {
    console.log(err.response);
    console.log(err.data);
    console.log(err.message);
  }
});

module.exports = app;
