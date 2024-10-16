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
    } = req.body.plan;

    let prompt = `###\nCreate a workout plan with the following Inputs (Maintain the structure and formatting):\nName: Heemang Parmar\nAge: 29\nGender: Male\nHeight: 178cm\nWeight: 72kg\nBody Fat Percentage: 18%\nFitness Goal: Muscle Building\nPhysical Activity Level: Medium\nHealth Information: None\nExercise Experience: High\nAvailable Equipment: Yes\nSchedule Availability or Days/Week: 4\nPersonal Preference: Major Body Parts\n\n🏋️‍♂️ Workout Plan 🏋️‍♂️\n\n📅 Day 1:\n\n🏃‍♂️ Warm-up: 10 minutes of light cardio, such as jogging or jumping jacks\n💪 Chest and Triceps:\n- Barbell Bench Press: 3 sets of 8-12 reps\n- Dumbbell Flys: 3 sets of 8-12 reps\n- Close Grip Bench Press: 3 sets of 8-12 reps\n- Dips: 3 sets of 8-12 reps\n💪 Biceps:\n- Barbell Curl: 3 sets of 8-12 reps\n- Dumbbell Hammer Curl: 3 sets of 8-12 reps\n💪 Core:\n- Plank: 3 sets of 30-60 seconds\n- Russian Twists: 3 sets of 8-12 reps\n\n📅 Day 2:\n\n🏃‍♂️ Warm-up: 10 minutes of light cardio, such as jogging or jumping jacks\n💪 Back and Biceps:\n- Deadlifts: 3 sets of 8-12 reps\n- Lat Pulldowns: 3 sets of 8-12 reps\n- Barbell Row: 3 sets of 8-12 reps\n💪 Biceps:\n- Dumbbell Bicep Curl: 3 sets of 8-12 reps\n💪 Shoulders:\n- Dumbbell Shoulder Press: 3 sets of 8-12 reps\n- Dumbbell Lateral Raises: 3 sets of 8-12 reps\n\n📅 Day 3:\n\n🏃‍♂️ Warm-up: 10 minutes of light cardio, such as jogging or jumping jacks\n💪 Legs:\n- Barbell Squats: 3 sets of 8-12 reps\n- Dumbbell Lunges: 3 sets of 8-12 reps\n- Leg Press: 3 sets of 8-12 reps\n💪 Calves:\n- Dumbbell Calf Raise: 3 sets of 8-12 reps\n🏃‍♂️ Cardio:\n- 30 minutes of moderate intensity cardio, such as cycling or jogging\n\n📅 Day 4:\n\n🏃‍♂️ Warm-up: 10 minutes of light cardio, such as jogging or jumping jacks\n💪 Shoulders:\n- Dumbbell Shoulder Press: 3 sets of 8-12 reps\n- Dumbbell Lateral Raises: 3 sets of 8-12 reps\n💪 Triceps:\n- Close Grip Bench Press: 3 sets of 8-12 reps\n- Dips: 3 sets of 8-12 reps\n💪 Core:\n- Plank: 3 sets of 30-60 seconds\n- Russian Twists: 3 sets of 8-12 reps\n\n⚠️ Note: This is a sample workout plan and can be adjusted based on individual progress and goals. It is important to consult a certified trainer or medical professional before starting any new exercise regimen.\n\n###\nCreate a workout plan with the following Inputs (Maintain the structure and formatting):\nName: Heemang Parmar\nAge: 30\nGender: Male\nHeight: 178cm\nWeight: 80kg\nBody Fat Percentage: 12%\nFitness Goal (weight loss, muscle building, overall fitness): Muscle Building\nPhysical Activity Level (High, Medium, Low): Medium\nHealth Information (Health conditions, injuries, or medical restrictions): None\nExercise Experience (High, Medium, Low): High\nAvailable Equipment (Yes or No): Yes\nSchedule Availability or Days/Week (3,4,5): 2\nPersonal Preference (types of exercises, intensity, duration): Major Body Parts\n\n\n🏋️‍♂️ Workout Plan 🏋️‍♂️\n\n📅 Day 1:\n\n- 🏃‍♂️ Warm-up: 10 minutes of light cardio, such as jogging or jumping jacks\n- 💪 Back and Biceps:\n    - Deadlifts: 3 sets of 8-12 reps\n    - Lat Pulldowns: 3 sets of 8-12 reps\n    - Barbell Row: 3 sets of 8-12 reps\n- 💪 Biceps:\n    - Dumbbell Bicep Curl: 3 sets of 8-12 reps\n- 💪 Shoulders:\n    - Dumbbell Shoulder Press: 3 sets of 8-12 reps\n    - Dumbbell Lateral Raises: 3 sets of 8-12 reps\n\n📅 Day 2:\n\n- 🏃‍♂️ Warm-up: 10 minutes of light cardio, such as jogging or jumping jacks\n- 💪 Chest and Triceps:\n    - Barbell Bench Press: 3 sets of 8-12 reps\n    - Dumbbell Flys: 3 sets of 8-12 reps\n    - Close Grip Bench Press: 3 sets of 8-12 reps\n    - Dips: 3 sets of 8-12 reps\n- 💪 Biceps:\n    - Barbell Curl: 3 sets of 8-12 reps\n    - Dumbbell Hammer Curl: 3 sets of 8-12 reps\n- 💪 Legs:\n    - Barbell Squats: 3 sets of 8-12 reps\n    - Dumbbell Lunges: 3 sets of 8-12 reps\n    - Leg Press: 3 sets of 8-12 reps\n\n⚠️  Note: This is a sample workout plan and can be adjusted based on individual progress and goals. It is important to consult a certified trainer or medical professional before starting any new exercise regimen.\n\n###\nCreate a workout plan with the following Inputs:\nName:${name} \nAge:${age} \nGender:${gender} \nHeight:${height} \nWeight:${weight} \nBody Fat Percentage:${bodyFatPercantage} \nFitness Goal (weight loss, muscle building, overall fitness):${fitnessGoal} \nPhysical Activity Level (High, Medium, Low): ${physicalActivityLevel} \nHealth Information (Health conditions, injuries, or medical restrictions):${healthInformation} \nExercise Experience (High, Medium, Low):${exerciseExperience} \nAvailable Equipment (Yes or No):${availableEquipment} \nSchedule Availability or Days/Week (3,4,5):${scheduleAvailability}\nPersonal Preference (types of exercises, intensity, duration):${personalPreference} \n`;

    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: "system", content: prompt }],
      model: "gpt-3.5-turbo",
    });

    let output = `${chatCompletion.choices[0].message.content}`;
   
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
    req.locals.planName = "Workout Plan";

    next();
  } catch (err) {
    // console.log(err.response);
    // console.log(err.data);
    // console.log(err.message);
  }
});

module.exports = app;
