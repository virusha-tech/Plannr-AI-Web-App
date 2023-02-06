//import { ChatGPTAPIBrowser } from "chatgpt";
const express = require("express");
//const ChatGPTAPIBrowser = require("chatgpt");
const openai = require("../middlewares/openai");

let app = express.Router();

app.post("/workout", async (req, res, next) => {
  try {
    let {
      name,
      age,
      gender,
      height,
      weight,
      bodyFatPercantage,
      fitnessGoal,
      physicalActivityLevel,
      healthInformation,
      exerciseExperience,
      availableEquipment,
      scheduleAvailability,
      personalPreference,
    } = req.body;

    let prompt = `###\nCreate a workout plan with the following Inputs:\nName: Heemang Parmar\nAge: 29\nGender: Male\nHeight: 178cm\nWeight: 72kg\nBody Fat Percentage: 18%\nFitness Goal (weight loss, muscle building, overall fitness): Muscle Building\nPhysical Activity Level (High, Medium, Low): Medium\nHealth Information (Health conditions, injuries, or medical restrictions):
    None\nExercise Experience (High, Medium, Low): High\nAvailable Equipment (Yes or No): Yes\nSchedule Availability or Days/Week (3,4,5): 4\nPersonal Preference (types of exercises, intensity, duration): Major Body Parts\n\nDay 1:\n* Warm-up: 10 minutes of light cardio, such as jogging or jumping jacks\n    * Chest and Triceps:\n    * Barbell Bench Press: 3 sets of 8-12 reps\n
      * Dumbbell Flys: 3 sets of 8-12 reps\n    * Close Grip Bench Press: 3 sets of 8-12 reps\n    * Dips: 3 sets of 8-12 reps\n    * Biceps:\n    * Barbell Curl: 3 sets of 8-12 reps\n    * Dumbbell Hammer Curl: 3 sets of 8-12 reps\n    * Core:\n    * Plank: 3 sets of 30-60 seconds\n    * Russian Twists: 3 sets of 8-12 reps\nDay 2:\n* Warm-up: 10 minutes of light cardio, such as jogging or jumping jacks\n
       * Back and Biceps:\n    * Deadlifts: 3 sets of 8-12 reps\n    * Lat Pulldowns: 3 sets of 8-12 reps\n    * Barbell Row: 3 sets of 8-12 reps\n    * Biceps:\n    * Dumbbell Bicep Curl: 3 sets of 8-12 reps\n    * Shoulders:\n    * Dumbbell Shoulder Press: 3 sets of 8-12 reps\n
       *    * Dumbbell Lateral Raises: 3 sets of 8-12 reps\nDay 3:\n* Warm-up: 10 minutes of light cardio, such as jogging or jumping jacks\n    * Legs:\n    * Barbell Squats: 3 sets of 8-12 reps\n    * Dumbbell Lunges: 3 sets of 8-12 reps\n    * Leg Press: 3 sets of 8-12 reps\n    * Calves:\n
       *  * Dumbbell Calf Raise: 3 sets of 8-12 reps\n* Cardio: 30 minutes of moderate intensity cardio, such as cycling or jogging\nDay 4:\n* Warm-up: 10 minutes of light cardio, such as jogging or jumping jacks\n    * Shoulders:\n    * Dumbbell Shoulder Press: 3 sets of 8-12 reps\n    * Dumbbell Lateral Raises: 3 sets of 8-12 reps\n    * Triceps:\n    * Close Grip Bench Press: 3 sets of 8-12 reps\n    * Dips: 3 sets of 8-12 reps\n    * Core:\n    * Plank: 3 sets of 30-60 seconds\n
       *   * Russian Twists: 3 sets of 8-12 reps\nNote: This is a sample workout plan and can be adjusted based on individual progress and goals. It is important to consult a certified trainer or medical professional before starting any new exercise regimen.\n\n###\nCreate a workout plan with the following Inputs:\nName: \nAge:\nGender: \nHeight:\nWeight:\nBody Fat Percentage:\nFitness Goal (weight loss, muscle building, overall fitness):
       * \nPhysical Activity Level (High, Medium, Low): \nHealth Information (Health conditions, injuries, or medical restrictions): \nExercise Experience (High, Medium, Low): \nAvailable Equipment (Yes or No): \nSchedule Availability or Days/Week (3,4,5):\nPersonal Preference (types of exercises, intensity, duration):
       *  \nNAME: ${name}
       * \nAGE: ${age}\nGENDER: ${gender}\nHEIGHT: ${height}\nWEIGHT: ${weight}\nBODY FAT PERCANTAGE: ${bodyFatPercantage}\nFITNESS GOAL: ${fitnessGoal}\nPHYSICAL ACTIVITY LEVEL: ${physicalActivityLevel}\nHEALTH INFORMATION: ${healthInformation}\nEXERCISE EXPERIENCE: ${exerciseExperience}\nAVAILABLE EQUIPMENT: ${availableEquipment}\nSCHEDULED AVAILABILITY: ${scheduleAvailability}\nPERSONAL PREFERENCE: ${personalPreference}`;

    let inputRaw = "";

    const gptResponse = await openai.complete({
      engine: "davinci",
      prompt,
      maxTokens: 1500,
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
