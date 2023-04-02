const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
db.user = require("./user");
db.feedback = require("./feedback");
db.history = require("./history");
db.tool = require("./tool");
db.plan = require("./plan");
db.output = require("./output");
db.ip = require("./ip");



module.exports = db;