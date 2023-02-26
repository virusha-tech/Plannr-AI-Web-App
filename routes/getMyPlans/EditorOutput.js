const express = require("express");
const db = require("../models");
const { mongoose } = require("../models/index");
const { ObjectId } = mongoose.Types;

const Editor = db.output;

let app = express.Router();

app.get("/output/:output_id", async (req, res) => {
  const userId = req.user._id;
  const outputId = req.params.output_id;

  if (!ObjectId.isValid(outputId)) {
    return res.status(400).json({ error: "Invalid id" });
  }

  try {
    const output = await Editor.findOne({ user: userId, _id: outputId });
    res.json(output);
  } catch (err) {
    throw err;
  }
});

app.put("/output/:output_id", async (req, res) => {
  const userId = req.user._id;
  const outputId = req.params.output_id;
  const { answer } = req.body;

  if (!ObjectId.isValid(outputId)) {
    return res.status(400).json({ error: "Invalid id" });
  }

  try {
    const updatedDoc = await Editor.findOneAndUpdate(
      { user: userId, _id: outputId },
      { answer },
      { new: true }
    );
    if (!updatedDoc) {
      return res.status(404).json({ error: "Document not found" });
    }

    res.json(updatedDoc);
  } catch (err) {
    throw err;
  }
});

module.exports = app;
