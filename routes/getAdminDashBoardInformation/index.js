const express = require("express");
const stripe = require("../middlewares/stripe");
const db = require("../models");
const User = db.user;
const Plan = db.plan;

let app = express.Router();

app.get("/plansGrouping", async (req, res) => {
  Plan.aggregate([
    {
      $group: {
        _id: "$planName",
        count: { $sum: 1 },
      },
    },
  ]).exec((err, results) => {
    if (err) {
      // handle error
    } else {
      const plans = results.map(({ count, _id }) => {
        return {
          planName: _id,
          count: count,
        };
      });
      // console.log(results);
      res.send({ plans });
    }
  });
});

app.get("/productGrouping", async (req, res) => {
  User.aggregate([
    {
      $group: {
        _id: "$plan",
        count: { $sum: 1 },
      },
    },
  ]).exec((err, results) => {
    if (err) {
      // handle error
    } else {
      const products = results.map(({ count, _id }) => {
        return {
          plan: _id,
          count: count,
        };
      });
      res.send({ products });
    }
  });
});

app.get("/", async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  User.aggregate(
    [
      // Match documents created today
      {
        $match: {
          createdAt: {
            $gte: today,
          },
        },
      },
      // Group by null to count all documents
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
        },
      },
    ],
    (err, userResult) => {
      if (err) {
        // console.log(err);
      } else {
        const todayUserCount = userResult.length > 0 ? userResult[0].count : 0;
        // To get the total number of users signed up so far
        User.countDocuments({}, (err, userCount) => {
          if (err) {
            // console.log(err);
          } else {
            // Get plan counts
            Plan.aggregate(
              [
                // Match documents created today
                {
                  $match: {
                    createdAt: {
                      $gte: today,
                    },
                  },
                },
                // Group by null to count all documents
                {
                  $group: {
                    _id: null,
                    count: { $sum: 1 },
                  },
                },
              ],
              (err, planResult) => {
                if (err) {
                  // console.log(err);
                } else {
                  const todayPlanCount =
                    planResult.length > 0 ? planResult[0].count : 0;
                  // To get the total number of plans created so far
                  Plan.countDocuments({}, (err, planCount) => {
                    if (err) {
                      // console.log(err);
                    } else {
                      res.send({
                        totalusersSignedInToday: todayUserCount,
                        totalUsersSignedInSoFar: userCount,
                        totalPlansCreatedToday: todayPlanCount,
                        totalPlansCreatedSoFar: planCount,
                      });
                    }
                  });
                }
              }
            );
          }
        });
      }
    }
  );
});

app.get("/moneyFigures", async (req, res) => {
  stripe.balance.retrieve(function(err, balance) {
    // Handle any errors
    if (err) {
      // console.log("Error retrieving balance:", err);
      return;
    }

    // Log the balance object
    res.send({
      availableAmount: balance.available[0].amount,
      pendingAmount: balance.pending[0].amount,
    });
    
  });
});

module.exports = app;
