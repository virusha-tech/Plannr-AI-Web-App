//import { ChatGPTAPIBrowser } from "chatgpt";
const express = require("express");
//const ChatGPTAPIBrowser = require("chatgpt");
const openai = require("../middlewares/openai");

let app = express.Router();

app.post("/travel", async (req, res, next) => {
  try {
    let {
      destination,
      purpose,
      date,
      traveller,
      budget,
      meal_Preference,
      accomodation,
      transportation,
      Any_Health_or_Safety_Concerns,
      travelStyle,
      additionalinfo,
    } = req.body.plan;

    let prompt = `###\nCreate a detailed and structured itinerary using the following details:\nDESTINATION: Goa\nPURPOSE: Vacation\nDATE: 05/03/2023 - 08/03/2023\nBUDGET: INR 20000\nTRAVELLERS:  Solo\nACCOMMODATION: Hostel\nTRANSPORTATION: Taxi\nMEAL PREFERENCE: Veg\nOTHER CONCERNS: None\nTRAVEL STYLE: Backpacking\nADDITIONAL INFO: Best Place to eat, Things to do, Travel tips\n\nDay 1 (5-Mar-23):\n\n- Morning: Start early in the morning from the city of origin and travel to Goa by taxi. \n- Afternoon: Check-in at the hostel (e.g. The Backpacker's Hostel in Baga for an inexpensive and comfortable stay) and freshen up.\n Explore the nearby beaches (e.g. Calangute, Baga and Anjuna) and enjoy the views.\n- Evening: Spend the evening at the beach, enjoying the sunset.\n Have dinner at a local, vegetarian-friendly restaurant (e.g. the Souza Lobo Restaurant in Anjuna)\n\nDay 2 (6-Mar-23): \n\n- Morning: Have breakfast at the hostel.\n- Afternoon: Go sightseeing in Old Goa and visit the famous churches (e.g. Se Cathedral, Basilica of Bom Jesus and Church of Our Lady of the Immaculate Conception).\n Try the local cuisine at a nearby cafe (e.g. La Plage Cafe in Anjuna).\n- Evening: Take the evening off and explore the local nightlife (e.g. Tito's Club in Baga).\n\nDay 3 (7-Mar-23):\n\n- Morning: Have breakfast at the hostel.\n- Afternoon: Spend the day at the popular beaches like Baga, Anjuna, and Calangute.\n Enjoy the evening by taking a stroll around the nearby markets (e.g. Anjuna Flea market, Mapusa Friday market) and shop for souvenirs.\n- Evening: Have dinner at a local, vegetarian-friendly restaurant (e.g. the Cafe Chocolatti in Anjuna).\n\nDay 4 (8-Mar-23):\n\n- Morning: Have breakfast at the hostel.\n- Afternoon: Spend the day exploring the old forts in Goa (e.g. Chapora Fort and Aguada Fort).\n Spend the evening at the beach, enjoying the sunset.\n- Evening: Have dinner at a local, vegetarian-friendly restaurant (e.g. the German Bakery in Anjuna).\n Pack up and check-out of the hostel. \n- Night: Travel back to the city of origin by taxi.\n\nRecommended Stays:\n- The Backpacker's Hostel in Baga\n- La Plage Cafe in Anjuna\n- Tito's Club in Baga\n- Cafe Chocolatti in Anjuna\n- German Bakery in Anjuna\n\nBest Places to Eat\n- Souza Lobo Restaurant in Anjuna\n- La Plage Cafe in Anjuna\n- Cafe Chocolatti in Anjuna\n- German Bakery in Anjuna\n\nThings to do:\n- Explore the nearby beaches (e.g. Calangute, Baga and Anjuna).\n- Go sightseeing  in Old Goa and visit the famous churches (e.g. Se Cathedral, Basilica of Bom Jesus and Church of Our Lady of the Immaculate Conception).\n- Explore the local nightlife (e.g. Tito's Club in Baga).\n- Enjoy the evening by taking a stroll around the nearby markets (e.g. Anjuna Flea market, Mapusa Friday market) and shop for souvenirs.\n- Spend the day exploring the old forts in Goa (e.g. Chapora Fort and Aguada Fort).\n\nTravel Tips:\n- Book a taxi in advance to avoid any last-minute hassle. \n- Carry enough cash and keep a track of your expenses.\n- Carry a reusable water bottle and basic medical supplies.\n- Plan your itinerary in advance and make sure to include all the essential places to visit. \n- Wear comfortable clothes and shoes.\n- Stay hydrated and take regular breaks.\n\n###\nDESTINATION:${destination} \nPURPOSE:${purpose} \nDATE:${date} \nBUDGET:${budget} \nTRAVELLERS:${traveller}  \nACCOMMODATION:${accomodation} \nTRANSPORTATION:${transportation} \nMEAL PREFERENCE:${meal_Preference} \nOTHER CONCERNS:${Any_Health_or_Safety_Concerns} \nTRAVEL STYLE:${travelStyle} \nADDITIONAL INFO:${additionalinfo.join(", ")}`;

    console.log(prompt);

    const gptResponse = await openai.complete({
      engine: "text-davinci-003",
      prompt,
      user: req.user._id,
      temperature: 0.7,
      max_tokens: 2786,
      top_p: 1,
      frequency_penalty: 1,
      presence_penalty: 0,
      stop: ["###"],
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

    req.locals.input = prompt;
    req.locals.output = output;
    req.locals.planName = "Travel Plan";

    next();
  } catch (err) {
    console.log(err.response);
    console.log(err.data);
    console.log(err.message);
  }
});

module.exports = app;
