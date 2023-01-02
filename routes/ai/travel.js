//import { ChatGPTAPIBrowser } from "chatgpt";
const express = require("express");
//const ChatGPTAPIBrowser = require("chatgpt");
const openai = require("../middlewares/openai");

let app = express.Router();

app.post("/travel", async (req, res, next) => {
  try {
    // const { ChatGPTAPI, getOpenAIAuth } = await import("chatgpt");

    // const openAIAuth = await getOpenAIAuth({
    //   email: "viveksharma1379@gmail.com",
    //   password: "Draculas@123",
    // });

    // const api = new ChatGPTAPI({ ...openAIAuth });
    // await api.initSession();
    // console.log("initSession");
    // const result = await api.sendMessage(
    //   "Provide a detailed itinerary to udaipur"
    // );
    // console.log("result", result);
    // const api = new ChatGPTAPIBrowser({
    //   email: process.env.OPENAI_EMAIL,
    //   password: process.env.OPENAI_PASSWORD,
    // });
    // await api.initSession();

    // const result = await api.sendMessage("Hello World!");
    // console.log(result.response);

    console.log("req.body", req.body);
    let { city, days, traveller, budget, purpose, stay } = req.body;

    let prompt = `###\nCreate a detailed itinerary from the following details:\nCITY: Pondicherry\nDAYS: 3\nTRAVELLER: Solo\nBUDGET: $500\nPURPOSE: Spiritual Retreat\nSTAY: Hostel\n\nITINERARY:\nDay 1:\n\nStart your day with a visit to Aurobindo Ashram, the spiritual retreat of Pondicherry. Take some time to meditate and reflect on life in this tranquil environment.
     Then head out for lunch at La Maison Rose, a French-style cafe that serves delicious food at an affordable price. After lunch, explore the colonial architecture of Pondicherry by taking a walk around the city’s streets and squares. Visit the iconic Sri Aurobindo Handmade Paper Factory where you can buy handmade paper products as souvenirs from your trip. 
     In the evening, take a stroll along Promenade Beach and enjoy its serene atmosphere before heading back to your hostel for dinner and rest. \n\nRecommended Stay: The Hosteller - located near Promenade beach which is just 5 minutes away from Aurobindo Ashram\n\n\nDay 2: \nBegin your day with breakfast at Café des Arts followed by exploring Paradise Beach which is one of Pondicherry's most beautiful beaches offering stunning views of Bay of Bengal Sea. 
     Later in the afternoon visit Arulmigu Manakula Vinayagar Temple dedicated to Lord Ganesha – it has been standing since 1666! Post temple visit go shopping in local markets like Bharathi Street Market or Nehru Street Market where you can find unique items such as handicrafts, jewelry etc., After shopping take some time off for yourself and relax at Rock Beach or spend some time admiring artworks displayed in various galleries around town such as Alliance Francaise de Pondichery Gallery & Art Centre or Lalit Kala Akademi Art Gallery . For dinner try out one of many restaurants serving traditional South Indian cuisine such as Surguru Restaurant or Hotel Saravana Bhavan \n\nRecommended Stay: Lemon Tree Amarante - located close to Paradise beach & few other attractions mentioned above\n\n  \nDay 3: \nOn last day start early morning with yoga session offered by nearby studios like Yoga Mandiram Studio or Shanti Yoga Studio followed by breakfast at Le Cafe De Flore – they serve amazing French pastries! Spend rest of morning visiting museums like Bharathidasan Museum Of Folklore And Popular Art , Puducherry Museum , Botanical Garden & Chunnambar Boat House . For lunch try out Freshly Baked Pizza At Red Sparrow Bakery followed by leisurely stroll through heritage town filled with colonial buildings known as White Town area .
      End your bagpacking trip on high note while sipping coffee overlooking ocean view from rooftop café called La Terrasse Café Bar Lounge before heading back home ! \n\nRecommended Stay :The Windflower Resort & Spa - Located close to all attractions mentioned above\n\nCITY: ${city}\nDAYS: ${days}\nTRAVELLER: ${traveller}\nBUDGET: ${budget}\nPURPOSE: ${purpose}\nSTAY: ${stay}`;
    let inputRaw = "";
    // let prompt = "";

    // inputRaw = `LOCATION: ${"udaipur"}\nBUDGET: ${"40k"}\n`;
    // prompt += inputRaw;

    // let prompt =
    //   "Create an itinerary for a family trip to Udaipur for 3 Days Stay.";

    // prompt =
    //   `Create a detailed Travel Itinerary from the following details\n###\n` +
    //   `TEXT:LOCATION: Udaipur\n DAYS: 2 \nTRAVEL ITINERARY:\n\nDay 1:\n\n- Visit the City Palace, which is a complex of palaces and courtyards built over a period of time by the Maharanas of Mewar.\n###\n` +
    //   `TEXT: After that, take a stroll around the Ana Sagar Lake and enjoy the beautiful views. You can also go boating on the lake if you like..\n###\n` +
    //   `TEXT:in the evening, visit the Ajmer Government Museum, which has a collection of artifacts and artworks from the region. The museum is a great place to learn about the history and culture of Ajmer and the surrounding region.\n###\n` +
    //   `TEXT:Take a half-day trip to the nearby town of Pushkar, which is known for its holy lake and temple dedicated to Lord Brahma. The lake and temple are important pilgrimage sites for Hindus, and the town is a great place to learn about Hinduism and the local culture.\n###\n`;
    //  inputRaw = `TEXT: ${location}\nELI5:`;
    //prompt += inputRaw;
    console.log("prompt", prompt);

    const gptResponse = await openai.complete({
      engine: "davinci",
      prompt,
      maxTokens: 1320,
      temperature: 0.7,
      topP: 1,
      frequencyPenalty: 0,
      presencePenalty: 0,
      bestOf: 1,
      n: 1,
      user: req.user._id,
      stream: false,
      stop: ["###", "<|endoftext|>"],
    });

    // const gptResponse = await openai.complete({
    //   model: "davinci",
    //   prompt:
    //     "###\nCreate a detailed itinerary from the following details:\nCITY: Pondicherry\nDAYS: 3\nTRAVELLER: Solo\nBUDGET: $500\nPURPOSE: Spiritual Retreat\nSTAY: Hostel\n\nITINERARY:\nDay 1:\n\nStart your day with a visit to Aurobindo Ashram, the spiritual retreat of Pondicherry. Take some time to meditate and reflect on life in this tranquil environment. Then head out for lunch at La Maison Rose, a French-style cafe that serves delicious food at an affordable price. After lunch, explore the colonial architecture of Pondicherry by taking a walk around the city’s streets and squares. Visit the iconic Sri Aurobindo Handmade Paper Factory where you can buy handmade paper products as souvenirs from your trip. In the evening, take a stroll along Promenade Beach and enjoy its serene atmosphere before heading back to your hostel for dinner and rest. \n\nRecommended Stay: The Hosteller - located near Promenade beach which is just 5 minutes away from Aurobindo Ashram\n\n\nDay 2: \nBegin your day with breakfast at Café des Arts followed by exploring Paradise Beach which is one of Pondicherry's most beautiful beaches offering stunning views of Bay of Bengal Sea. Later in the afternoon visit Arulmigu Manakula Vinayagar Temple dedicated to Lord Ganesha – it has been standing since 1666! Post temple visit go shopping in local markets like Bharathi Street Market or Nehru Street Market where you can find unique items such as handicrafts, jewelry etc., After shopping take some time off for yourself and relax at Rock Beach or spend some time admiring artworks displayed in various galleries around town such as Alliance Francaise de Pondichery Gallery & Art Centre or Lalit Kala Akademi Art Gallery . For dinner try out one of many restaurants serving traditional South Indian cuisine such as Surguru Restaurant or Hotel Saravana Bhavan \n\nRecommended Stay: Lemon Tree Amarante - located close to Paradise beach & few other attractions mentioned above\n\n  \nDay 3: \nOn last day start early morning with yoga session offered by nearby studios like Yoga Mandiram Studio or Shanti Yoga Studio followed by breakfast at Le Cafe De Flore – they serve amazing French pastries! Spend rest of morning visiting museums like Bharathidasan Museum Of Folklore And Popular Art , Puducherry Museum , Botanical Garden & Chunnambar Boat House . For lunch try out Freshly Baked Pizza At Red Sparrow Bakery followed by leisurely stroll through heritage town filled with colonial buildings known as White Town area . End your bagpacking trip on high note while sipping coffee overlooking ocean view from rooftop café called La Terrasse Café Bar Lounge before heading back home ! \n\nRecommended Stay :The Windflower Resort & Spa - Located close to all attractions mentioned above\n\nCITY: Varanasi\nDAYS: 5\nTRAVELLER: Solo\nBUDGET: INR 15000\nPURPOSE: Spiritual Retreat\nSTAY: Hostel",
    //   temperature: 0.7,
    //   max_tokens: 1319,
    //   top_p: 1,
    //   frequency_penalty: 0,
    //   presence_penalty: 0,
    //   stop: ["\\n####"],
    // });

    console.log("response", gptResponse.data.choices[0].text);

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
    req.locals.inputRaw = inputRaw;
    req.locals.output = output;

    next();
  } catch (err) {
    console.log(err.response);
    console.log(err.data);
    console.log(err.message);
  }
});

module.exports = app;
