const db = require("../../models");

const Plan = db.plan;
const Editor = db.output;

const saveToHistory = async (req, res, next) => {
  let enteredPlan = {};

  if (req.url) {
    enteredPlan.api = req.originalUrl;
    enteredPlan.url = req.originalUrl;
  }

  if (req.locals.inputLength) {
  enteredPlan.inputLength = req.locals.inputLength;
  }

  if (req.locals.inputLength) {
    enteredPlan.inputLength = req.locals.inputLength;
  }
  if (req.locals.outputLength) {
    enteredPlan.outputLength = req.locals.outputLength;
  }
  if (req.locals.price) {
    enteredPlan.price = req.locals.price;
  }

  if (req.locals.credits) {
    enteredPlan.credits = req.locals.credits;
  }

  if (req.user._id) {
    enteredPlan.user = req.user._id;
  }

  if (req.locals.planName) {
    enteredPlan.planName = req.locals.planName;
  }

  if (req.body.plan) {
    enteredPlan.planFormFields = req.body.plan;
  }

  let editor = new Editor({
    question: req.locals.input,
    answer: req.locals.output,
    user: req.user._id,
  });

  const editorResult = await editor.save();
  req.locals.output_id = editorResult._id;
  let plan = new Plan({ ...enteredPlan, output: editorResult._id });
  await plan.save();
  next();
};

module.exports = saveToHistory;
