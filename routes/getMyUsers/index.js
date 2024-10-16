const express = require("express");
const db = require("../models");
const User = db.user;

let app = express.Router();

const pipeline = [
  {
    $lookup: {
      from: "plans", // The name of the plans collection
      localField: "_id",
      foreignField: "user",
      as: "plans",
    },
  },
  {
    $project: {
      _id: 1,
      fname: 1,
      lname: 1,
      email: 1,
      creditsUsed: 1,
      profilePhoto: 1,
      created: 1,
      plan: 1,
      planCount: { $size: "$plans" }, // Count the number of plans for each user
    },
  },
];

// Define the API endpoint
app.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;

  // Calculate the number of documents to skip and limit
  const numToSkip = (page - 1) * pageSize;
  const numToLimit = pageSize;

  try {
    const data = await User.aggregate(pipeline)
      .sort({ created: -1 })
      .skip(numToSkip)
      .limit(numToLimit);
    const alldocs = await User.find({}).exec();

    res.status(200).json({
      data: data,
      count: alldocs.length,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = app;
