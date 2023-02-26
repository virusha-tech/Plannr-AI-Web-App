const express = require("express");
const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 200, // maximum of 200 requests per windowMs
});

let app = express.Router();

const authJwt = require("./auth/authJwt");
const openai = require("./middlewares/openai");

// Webhooks and things
app.use("/stripe", require("./stripe"));

app.use("/", apiLimiter);

// Signup and Authentication
app.use("/auth", require("./auth"));

// Everything after this requires user authentication
app.use("/", authJwt.verifyToken);

// Already signed up user routes
app.use("/user", require("./user"));

app.use("/getMyPlans", require("./getMyPlans"));
app.use("/Editor", require("./getMyPlans/EditorOutput"));

// Using AI Platform
app.use("/ai", require("./ai"));

module.exports = app;
