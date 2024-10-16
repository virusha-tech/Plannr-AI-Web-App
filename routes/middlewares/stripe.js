const dotenv = require('dotenv');
dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

// console.log('stripe',process.env.NODE_ENV);
const stripe = require('stripe')(process.env.STRIPE_SK);

module.exports = stripe