//import { ChatGPTAPIBrowser } from "chatgpt";
const express = require("express");
//const ChatGPTAPIBrowser = require("chatgpt");
const openai = require("../middlewares/openai");

let app = express.Router();

app.post("/travel", async (req, res, next) => {
  try {
    let { destination, days, startDate,traveller, budget} = req.body.plan;

    let conversation = [
      {
        role: "system",
        content: `You are a travel guide that knows everything about ${destination}.`,
      },
    ];

    conversation.push({
      role: "user",
      content: `Please provide a ${days}-day travel itinerary, starting from ${startDate} for a ${traveller} trip to ${destination} in a budget of ${budget}, with a focus on exploring its natural attractions, historical sites, and local culture. The itinerary should include daily activities with morning, afternoon, and evening plans, as well as recommendations for accommodations, places to eat, and things to do. Additionally, please provide a few general travel tips to make the trip smooth and enjoyable.`
    });

    // // console.log(conversation);
    // const gptResponse = await openai.createChatCompletion({
    //   model: "gpt-3.5-turbo",
    //   messages: conversation,
    // });


    const chatCompletion = await openai.chat.completions.create({
      messages: conversation,
      model: "gpt-3.5-turbo",
    });

    let output = `${chatCompletion.choices[0].message.content}`;

    // let output = `${chatCompletion.choices[0].message.content}`;
   

    // let output = `${gptResponse.data.choices[0].message.content}`;

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
    req.locals.planName = "Travel Plan";
    next();
  } catch (err) {
    // console.log(err.response);
    // console.log(err.data);
    // console.log(err.message);
  }
});

module.exports = app;
