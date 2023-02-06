//import { ChatGPTAPIBrowser } from "chatgpt";
const express = require("express");
//const ChatGPTAPIBrowser = require("chatgpt");
const openai = require("../middlewares/openai");

let app = express.Router();

app.post("/mealplan", async (req, res, next) => {
  try {
    let {
      targetCaloricIntake,
      foodPreferences,
      physicalActivityLevel,
      healthConditions,
      mealFrequencyTiming,
      mealBudget,
      cookingSkills,
      equipmentAvailable,
      cuisine,
    } = req.body;

    // let prompt = `###\nCreate a Weekly Meal Plan and also specify Macronutrients (Protein, Fats and Carbs) for each day:\nTarget caloric intake: 1700\nFood preferences: Vegetarian\nPhysical activity level: High\nHealth conditions: None\nMeal frequency and timing: 3 Times a day between 12PM - 8 PM\nMeal Budget: INR 20000\nCooking skills: Medium \nEquipment Available: Yes\nCuisine: Indian\n\nMEAL PLAN
    // \n\nDay 1:\n\n- Breakfast (12 PM):\n    - Paneer Paratha (2) with mint chutney and a glass of lassi\n    - Total calories: 400 calories\n    - Protein: 20g, Fats: 20g, Carbs: 40g\n- Lunch (3 PM):\n    - Dal Tadka (1 cup) with mixed vegetable pulao (1 cup) and a side of cucumber raita (1/2 cup)\n    - Total calories: 600 calories\n    - Protein: 25g, Fats: 20g, Carbs: 70g\n- Dinner (8 PM):\n    - Chana Masala (1 cup) with steamed rice (1 cup) and a side of vegetable salad (1 cup)\n    - Total calories: 700 calories\n    - Protein: 20g, Fats: 20g, Carbs: 100g
    // \n\nDay 2:\n\n- Breakfast (12 PM):\n    - Masala Dosa (2) with coconut chutney and a glass of masala chai\n    - Total calories: 400 calories\n    - Protein: 15g, Fats: 20g, Carbs: 40g\n- Lunch (3 PM):\n    - Baingan Bharta (1 cup) with jeera rice (1 cup) and a side of papad (2)\n    - Total calories: 600 calories\n    - Protein: 10g, Fats: 20g, Carbs: 70g\n- Dinner (8 PM):\n    - Vegetable Biryani (1 cup) with raita (1/2 cup) and a side of pickle (1 tbsp)\n    - Total calories: 700 calories\n    - Protein: 20g, Fats: 20g, Carbs: 100g
    // \n\nDay 3:\n\n- Breakfast (12 PM):\n    - Aloo Tikki (2) with green chutney and a glass of buttermilk\n    - Total calories: 400 calories\n    - Protein: 10g, Fats: 20g, Carbs: 40g\n- Lunch (3 PM):\n    - Methi Aloo (1 cup) with roti (2) and a side of boondi raita (1/2 cup)\n    - Total calories: 600 calories\n    - Protein: 10g, Fats: 20g, Carbs: 70g\n- Dinner (8 PM):\n    - Tofu Butter Masala (1 cup) with steamed rice (1 cup) and a side of vegetable salad (1 cup)\n    - Total calories: 700 calories\n    - Protein: 20g, Fats: 20g, Carbs: 100g
    // \n\nDay 4:\n\n- Breakfast (12 PM):\n    - Idli Sambhar (2) with coconut chutney and a glass of masala chai\n    - Total calories: 400 calories\n    - Protein: 15g, Fats: 20g, Carbs: 40g\n- Lunch (3 PM):\n    - Vegetable Kofta (2) with jeera rice (1 cup) and a side of raita (1/2 cup)\n    - Total calories: 600 calories\n    - Protein: 15g, Fats: 20g, Carbs: 70g\n- Dinner (8 PM):\n    - Malai Kofta (2) with steamed rice (1 cup) and a side of vegetable salad (1 cup)\n    - Total calories: 700 calories\n    - Protein: 15g, Fats: 20g, Carbs: 100g
    // \n\nDay 5:\n\n- Breakfast (12 PM):\n    - Besan Chilla (2) with green chutney and a glass of lassi\n    - Total calories: 400 calories\n    - Protein: 10g, Fats: 20g, Carbs: 40g\n- Lunch (3 PM):\n    - Vegetable Jalfrezi (1 cup) with roti (2) and a side of raita (1/2 cup)\n    - Total calories: 600 calories\n    - Protein: 15g, Fats: 20g, Carbs: 70g\n- Dinner (8 PM):\n    - Palak Paneer (1 cup) with steamed rice (1 cup) and a side of vegetable salad (1 cup)\n    - Total calories: 700 calories\n    - Protein: 20g, Fats: 20g, Carbs: 100g
    // \n\nDay 6:\n\n- Breakfast (12 PM):\n    - Uthappam (1) with coconut chutney and a glass of masala chai\n    - Total calories: 400 calories\n    - Protein: 15g, Fats: 20g, Carbs: 40g\n- Lunch (3 PM):\n    - Chana Masala (1 cup) with roti (2) and a side of cucumber raita (1/2 cup)\n    - Total calories: 600 calories\n    - Protein: 20g, Fats: 20g, Carbs: 70g\n- Dinner (8 PM):\n    - Vegetable Biryani (1 cup) with raita (1/2 cup) and a side of pickle (1 tbsp)\n    - Total calories: 700 calories\n    - Protein: 20g, Fats: 20g, Carbs: 100g
    // \n\nDay 7:\n\n- Breakfast (12 PM):\n    - Aloo Paratha (2) with mint chutney and a glass of buttermilk\n    - Total calories: 400 calories\n    - Protein: 10g, Fats: 20g, Carbs: 40g\n- Lunch (3 PM):\n    - Dal Makhani (1 cup) with mixed vegetable pulao (1 cup) and a side of papad (2)\n    - Total calories: 600 calories\n    - Protein: 25g, Fats: 20g, Carbs: 70g\n- Dinner (8 PM):\n    - Tofu Butter Masala (1 cup) with steamed rice (1 cup) and a side of vegetable salad (1 cup)\n    - Total calories: 700 calories\n    - Protein: 20g, Fats: 20g, Carbs: 100g\n\nNote: The macronutrient information is an estimate and may vary based on portion sizes, ingredients, and cooking methods. The caloric intake is also an estimate and may vary based on an individual's specific needs and activity level.\n\n\n###\nCreate a Weekly Meal Plan and also specify Macronutrients (Protein, Fats and Carbs) for each day:\nTarget caloric intake: \nFood preferences: \nPhysical activity level: \nHealth conditions: \nMeal frequency and timing: \nMeal Budget: \nCooking skills:  \nEquipment Available: \nCuisine: \n\nMEAL PLAN TARGET CALORIC INTAKE: ${targetCaloricIntake}\nFOOD PREFERENCES: ${foodPreferences}\nPHYSICAL ACTIVITY LEVEL: ${physicalActivityLevel}\nHEALTH CONDITIONS: ${healthConditions}\nMEAL FREQUENCY AND TIMING: ${mealFrequencyTiming}\nMEAL BUDGET: ${mealBudget}\nCOOKING SKILLS: ${cookingSkills}\nEQUIPMENT AVAILABLE: ${equipmentAvailable}\nCUISINE: ${cuisine}`;

    let prompt = `Create a Weekly structured and detailed Meal Plan and also specify Macronutrients (Protein, Fats and Carbs) for each day using the following Inputs: TARGET CALORIC INTAKE: ${targetCaloricIntake}\nFOOD PREFERENCES: ${foodPreferences}\nPHYSICAL ACTIVITY LEVEL: ${physicalActivityLevel}\nHEALTH CONDITIONS: ${healthConditions}\nMEAL FREQUENCY AND TIMING: ${mealFrequencyTiming}\nMEAL BUDGET: ${mealBudget}\nCOOKING SKILLS: ${cookingSkills}\nEQUIPMENT AVAILABLE: ${equipmentAvailable}\nCUISINE: ${cuisine}`;
    let inputRaw = "";

    const gptResponse = await openai.complete({
      engine: "davinci",
      prompt,
      maxTokens: 225,
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
