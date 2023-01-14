const winston = require("winston");

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: "logs/planner.log",
    }),
  ],
  format: winston.format.combine(
    winston.format.label({
      label: `Label🏷️`,
    }),
    winston.format.timestamp({
      format: "MMM-DD-YYYY HH:mm:ss",
    }),
    winston.format.printf((info) => {
      return `${info.level}: ${info.label}: ${[info.timestamp]}: ${
        info.message
      }`;
    })
  ),
});

module.exports = logger;
