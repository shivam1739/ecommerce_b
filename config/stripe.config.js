const stripe = require("stripe");
require("dotenv").config();
const stripGateway = stripe(process.env.STRIPE_API_KEY);
module.exports = stripGateway;
