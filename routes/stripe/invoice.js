const logger = require("../../logger");
const models = require("../models");
const User = models.user;

const invoice = async (eventType, data) => {
  if (!eventType.includes("invoice")) {
    return; // not a subscription event
  }
  logger.info("inside invoice main event detected");

  paid(eventType, data);
};

const paid = async (eventType, data) => {
  if (!eventType.includes("invoice.paid")) {
    return; // not a subscription event
  }
  const { object } = data;

  logger.info("inside invoice.paid");

  let credits = 0;

  if (object.amount_paid == 0) {
    credits += 0;
  } else if (object.amount_paid == 9900) {
    credits += 2000;
  } else if (object.amount_paid == 24900) {
    credits += 19000;
  } else if (object.amount_paid == 99900) {
    credits += 35000;
  } else if (object.amount_paid == 249900) {
    credits += 239000;
  } else if (object.amount_paid == 5000) {
    credits += 35000;
  } else if (object.amount_paid == 25000) {
    credits += 239000;
  } else if (object.amount_paid == 500) {
    credits += 2000;
  } else if (object.amount_paid == 2500) {
    credits += 19000;
  }

  let user = await User.findOne({
    customerId: object.customer,
  });

  logger.info("user fetch inside invoice");

  if (object.amount_paid >= 0) {
    if (user) {
      if (!user.referrerPaid) {
        let referrer = await User.findOne({
          _id: user.referrer,
        });
        if (referrer) {
          referrer.credits += 100;
          user.referrerPaid = true;
          referrer.save();
        }
      }
      user.credits += credits; //250 // 416 /2500

      //1000
      user.save();
    }
  }

  // await User
  // 	.updateOne({ customerId: object.customer },
  // 		{ $inc: { credits } })
  // 	.exec()
};

module.exports = invoice;
