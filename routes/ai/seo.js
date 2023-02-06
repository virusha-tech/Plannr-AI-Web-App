//import { ChatGPTAPIBrowser } from "chatgpt";
const express = require("express");
//const ChatGPTAPIBrowser = require("chatgpt");
const openai = require("../middlewares/openai");

let app = express.Router();

app.post("/seo", async (req, res, next) => {
  try {
    let {
      domainName,
      targetAudienceDemographics,
      targetAudienceInterests,
      targetAudienceBehaviors,
      keywords,
      businessGoals,
      competitorAnalysis,
      budgetAndTimeline,
    } = req.body;

    let prompt = `"###\nCreate a detailed SEO plan and strategy for the following:\nDomain name: https://myhandicrafts.com/\nTarget audience demographics: Female, 25-55 Yrs\nTarget audience interests: Handmade Jewelry, Home Decor\nTarget audience behaviors: Online Shopping\nKeywords: Handmade Jewelry, Home Decor, Online Shopping\nBusiness goals: Increase website traffic and online sales\nCompetitor analysis: Etsy, Handmade at Amazon\nBudget and timeline: INR 3 Lacs for 6 months with regular review and adjustment based on performance.\n\nSEO PLAN:\nI. Introduction\nA. Domain name: https://myhandicrafts.com/\nB. Brief description of the business and its goals: MyHandicrafts is an online store specializing in handmade jewelry and home decor items. 
    The business aims to increase website traffic and online sales.\n\nII. Target Audience\nA. Demographics: Female, 25-55 Yrs\nB. Interests: Handmade Jewelry, Home Decor\nC. Behaviors: Online Shopping\n\nIII. Keyword Research\nA. Keywords: Handmade Jewelry, Home Decor, Online Shopping\nB. Keyword strategy: The website will target a combination of broad and long-tail keywords related to handmade jewelry and home decor.\n\nIV. Competitor Analysis\nA. Competitors: Etsy, Handmade at Amazon\nB. Competitor strategy: The website will differentiate itself by offering unique and high-quality products, while also providing a personalized shopping experience.\n\nV. SWOT Analysis\nA. Strengths: Unique and high-quality products\nB. Weaknesses: Limited online presence\nC. Opportunities: Growing market for handmade products\nD. Threats: Competition from established players\n\nVI. Content Plan\nA. Content strategy: The website will focus on creating informative and engaging content related to handmade jewelry and home decor, including blog posts and bi-weekly newsletters to customers.\nB. 
    Content frequency: Weekly blog posts and bi-weekly newsletters.\nC. Content type: Blog posts, newsletters, product descriptions, and customer reviews.\n\nVII. Technical SEO Audit\nA. Website structure: The website structure will be optimized for search engines to improve crawling and indexing.\nB. Mobile responsiveness: The website will be designed to be mobile-friendly to improve user experience and search engine visibility.\nC. Page speed: The website load speed will be improved to reduce bounce rates and improve user experience.\n\nVIII. Local SEO\nA. Location-based keywords: The website will target keywords related to the location to improve visibility in local search results.\nB. Google My Business: The website will optimize its Google My Business listing to improve visibility in local search results.\nC. Local directories: The website will list its business in relevant local directories to improve visibility in local search results.\n\nIX. Link Building Plan\nA. Link building targets: Related blogs and websites, high authority websites\nB. Link building strategy: The website will collaborate with related blogs and websites and engage in guest posting on high authority websites to build high-quality backlinks.\n\nX. Measurement and Tracking\nA. Metrics to measure success: Website traffic, online sales, keyword rankings, user engagement\nB. Tools to track progress: Google Analytics, Google Search Console\n\nXI. Budget and Timeline\nA. 
    Budget: INR 3 Lacs for 6 months\nB. Timeline: 6 months with regular review and adjustment based on performance.\n\nXII. Conclusion\nThe SEO plan for MyHandicrafts aims to increase website traffic and online sales by targeting a specific demographic with relevant interests and behaviors, using a combination of keyword optimization, competitor analysis, SWOT analysis, content creation, technical SEO improvements, local SEO, link building, and regular measurement and tracking. The budget and timeline for the plan have been set for 6 months with a budget of INR 3 Lacs.\n\n###\nDomain name: \nTarget audience demographics: \nTarget audience interests: \nTarget audience behaviors: \nKeywords: \nBusiness goals: \nCompetitor analysis: \nBudget and timeline: \n\nSEO PLAN:" \nDOMAIN NAME: ${domainName} \nTARGET AUDIENCE DEMOGRAPHICS: ${targetAudienceDemographics}\nTARGET AUDIENCE INTERESTS: ${targetAudienceInterests}\nTARGET AUDIENCE BEHAVIORS: ${targetAudienceBehaviors}\nKEYWORDS: ${keywords}\nBUSINESS GOALS: ${businessGoals}\nCOMPETITOR ANALYSIS: ${competitorAnalysis}\nBUDGET AND TIMELINE: ${budgetAndTimeline}`;

    let inputRaw = "";

    const gptResponse = await openai.complete({
      engine: "davinci",
      prompt,
      maxTokens: 1000,
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
