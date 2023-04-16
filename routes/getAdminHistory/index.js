const express = require("express");
const db = require("../models");
const Plan = db.plan;

let app = express.Router();

app.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;

  // Calculate the number of documents to skip and limit
  const numToSkip = (page - 1) * pageSize;
  const numToLimit = pageSize;

  Plan.find({}, null, { skip: numToSkip, limit: numToLimit })
    .sort({ created: -1 })
    .exec(async (err, docs) => {
      if (err) throw err;
      console.log(docs);
      const alldocs = await Plan.find({}).exec();
      res.json({ docs: docs, count: alldocs.length });
    });
});

module.exports = app;
