const express = require("express");
const Ip = require("../models/ip");
const creditPayment = require("./creditPayment");

let app = express.Router();

const creditCheck = async (req, res, next) => {
  const ipAddress = req.clientIp;
  req.locals = {};
  let user = await Ip.findOne({ ipAddress });
  if (user.credits > 0) {
    next();
  } else {
    // res.statusMessage = 'No Credit Remaining';
    // res.sendStatus(401)
    res.json({
      success: false,
      credits: 0,
      error: "No Credits",
      message:
        "No Credits left, please recharge your account on the profile page",
    });
    return;
  }
};

const sendResponse = async (req, res, next) => {
  // if both req.locals.output is null and req.locals.outputs is null, then
  // the middleware has not been executed
  // if (!req.locals.output_id) {
  // 	res.json({
  // 		success: false,
  // 		error: "No Content",
  // 		message: "No Content was generated, please try again"
  // 	})
  // 	return
  // }

  let response = { success: true };
  response.output = req.locals.output;
  response.planName = req.locals.planName;
  response.creditsUsed = req.locals.credits;

  // if(req.locals.output_id){
  // response.output_id = req.locals.output_id
  // }

  res.json(response);
};

app.use("/", creditCheck);
app.use("/", require("./travel"));
// app.use("/", require("./code/interpret"));
// app.use("/", require("./writing/intro"));
// app.use("/", require("./jobad"));
// app.use("/", require("./helloworld"));
// app.use("/", require("./travel"));
// app.use("/", require("./mealplan"));
// app.use("/", require("./workoutplan"));
// app.use("/", require("./example"));
// app.use("/", require("./subsequentQuestion"));

// app.use("/", contentFilterCheck);
app.use("/", creditPayment);
// app.use("/", saveToHistory);

app.use("/", sendResponse);

module.exports = app;
