const models = require("../models");
const logger = require("../../logger");
const User = models.user;

const subscription = async (eventType, data) => {
  if (!eventType.includes("subscription")) {
    return; // not a subscription event
  }

  logger.info("inside sunscription main event detected");

  created(eventType, data);
  updated(eventType, data);
  deleted(eventType, data);
};

const created = async (eventType, data) => {
  if (!eventType.includes("subscription.created")) {
    return; // not a subscription event
  }
  const { object } = data;
  logger.info("inside subscription.created");
  console.log("data", data);
  console.log(`object.status`, object.plan.status);
  console.log(`object.id`, object.id);
  console.log(`object.customer`, object.customer);
  console.log(`object.trial_end`, object.trial_end);
  console.log(`object.current_period_end`, object.current_period_end);
  console.log(`object.cancel_at_period_end`, object.cancel_at_period_end);

  await User.updateOne(
    { customerId: object.customer },
    {
      status: object.status,
      plan: object.items.data[0].plan.nickname,
      trial_end: object.trial_end,
      current_period_end: object.current_period_end,
      cancel_at_period_end: object.cancel_at_period_end,
    }
  ).exec();
};

const updated = async (eventType, data) => {
  if (!eventType.includes("subscription.updated")) {
    return; // not a subscription event
  }
  const { object } = data;

  logger.info("inside subscription.updated");
  logger.info(
    `subscription.updated object.status
    ${JSON.stringify(object.plan.status)}`
  );
  logger.info(`subscription.updated object.id ${JSON.stringify(object.id)}`);
  logger.info(
    `subscription.updated object.customer
    ${JSON.stringify(object.customer)}`
  );
  logger.info(
    `subscription.updated object.trial_end
    ${JSON.stringify(object.trial_end)}`
  );
  logger.info(
    `subscription.updated object.current_period_end
    ${JSON.stringify(object.current_period_end)}`
  );
  logger.info(
    `subscription.updated object.cancel_at_period_end
    ${JSON.stringify(object.cancel_at_period_end)}`
  );

  logger.info(
    `subscription.updated customerId ${JSON.stringify(object.customer)}`
  );
  logger.info(
    `subscription.updated object.status ${JSON.stringify(object.status)}`
  );
  logger.info(
    `subscription.updated object.items.data[0].plan.nickname ${JSON.stringify(
      object.items.data[0].plan.nickname
    )}`
  );
  logger.info(
    `subscription.updated  object.trial_end ${JSON.stringify(object.trial_end)}`
  );
  logger.info(
    `subscription.updated object.current_period_end ${JSON.stringify(
      object.current_period_end
    )}`
  );
  logger.info(
    `subscription.updated cancel_at_period_end ${JSON.stringify(
      object.cancel_at_period_end
    )}`
  );

  await User.updateOne(
    { customerId: object.customer },
    {
      status: object.status,
      plan: object.items.data[0].plan.nickname,
      trial_end: object.trial_end,
      current_period_end: object.current_period_end,
      cancel_at_period_end: object.cancel_at_period_end,
    }
  ).exec();
};

const deleted = async (eventType, data) => {
  if (!eventType.includes("subscription.deleted")) {
    return; // not a subscription event
  }
  logger.info("inside subscription.deleted");
  const { object } = data;
  console.log(`object.status`, object.plan.status);
  console.log(`object.id`, object.id);
  console.log(`object.customer`, object.customer);
  console.log(`object.trial_end`, object.trial_end);
  console.log(`object.current_period_end`, object.current_period_end);
  console.log(`object.cancel_at_period_end`, object.cancel_at_period_end);

  await User.updateOne(
    { customerId: object.customer },
    {
      status: object.status,
      plan: "N/A",
      trial_end: object.trial_end,
      current_period_end: object.current_period_end,
      cancel_at_period_end: object.cancel_at_period_end,
    }
  ).exec();
};

module.exports = subscription;
