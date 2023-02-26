const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const PlanSchema = new Schema({
  api: { type: String, default: "" },
  url: { type: String, default: "" },
  //   favorite: { type: Boolean, default: false }, // star //

  inputLength: {
    type: Number,
    default: 0,
    integer: true,
    get: (v) => Math.round(v),
    set: (v) => Math.round(v),
  },

  outputLength: {
    type: Number,
    default: 0,
    integer: true,
    get: (v) => Math.round(v),
    set: (v) => Math.round(v),
  },

  credits: {
    type: Number,
    default: 0,
    integer: true,
    get: (v) => Math.round(v),
    set: (v) => Math.round(v),
  },

  price: { type: Number, default: 0 },

  created: { type: Date, default: Date.now },
  user: {
    type: ObjectId,
    ref: "user",
  },
  output: {
    type: ObjectId,
    ref: "editorOutput",
  },
  planName: {
    type: String,
    required: true,
  },
  planFormFields: {
    type: Map,
    of: String,
  },
});

PlanSchema.plugin(AutoIncrement, { inc_field: "id" });

const Plan = mongoose.model("Plan", PlanSchema);

// Apply the auto-increment plugin to your schema
module.exports = Plan;

// autoIncrement.initialize(mongoose.connection); // This is important. You can remove initialization in different file

// PlanSchema.plugin(autoIncrement.plugin, {
//   model: "Plan",
//   field: "plan_id",
//   startAt: 100,
//   incrementBy: 100,
// });

// bookSchema.plugin(autoIncrement.plugin, 'Book');

// const TestPlan = new Plan({
//   formName: "My Form",
//   formFields: {
//     field1: "Text input",
//     field2: "Checkbox",
//     field3: "Radio button",
//   },
// });

// TestPlan.save((err, form) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log(form);
//   }
// });
