const paymentServices = require("../services/payment.services");

const stripeWebhook = async (req, res) => {
  const result = await paymentServices.stripeWebhook();
};
