const Stripe = require("stripe");
require("dotenv").config();
const stripe = Stripe(process.env.STRIPE_API_KEY);

const payment = async (user, items) => {
  try {
    const customer = await stripe.customers.create({
      metadata: {
        userId: user.id,

        // cart: JSON.stringify(items),
      },
    });

    const line_items = items.map((item) => {
      return {
        price_data: {
          currency: "INR",
          product_data: {
            name: item.name,
            images: [item.image],
            description: item.description,
            metadata: {
              id: item.id,
            },
          },
          unit_amount: item.cost * 100,
        },
        quantity: item.Cart_Product.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_address_collection: {
        allowed_countries: ["IN"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 0,
              currency: "INR",
            },
            display_name: "Free shipping",
            // Delivers between 5-7 business days
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 5,
              },
              maximum: {
                unit: "business_day",
                value: 7,
              },
            },
          },
        },
      ],
      phone_number_collection: {
        enabled: true,
      },
      line_items,
      mode: "payment",
      customer: customer.id,

      success_url: `${process.env.CLIENT_URL}`,
      cancel_url: `${process.env.CLIENT_URL}`,
    });

    // res.redirect(303, session.url);
    return { url: session.url };
  } catch (err) {
    console.log(err);
    return err;
  }
};

const webhook = async (req, res) => {
  let data;
  let eventType;

  // Check if webhook signing is configured.
  let webhookSecret;
  //webhookSecret = process.env.STRIPE_WEB_HOOK;

  if (webhookSecret) {
    // Retrieve the event by verifying the signature using the raw body and secret.
    let event;
    let signature = req.headers["stripe-signature"];

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        webhookSecret
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed:  ${err}`);
      return { error: `⚠️  Webhook signature verification failed:  ${err}` };
    }
    // Extract the object from the event.
    data = event.data.object;
    eventType = event.type;
  } else {
    // Webhook signing is recommended, but if the secret is not configured in `config.js`,
    // retrieve the event data directly from the request body.
    data = req.body.data.object;
    eventType = req.body.type;
  }

  // Handle the checkout.session.completed event
  if (eventType === "checkout.session.completed") {
    stripe.customers
      .retrieve(data.customer)
      .then(async (customer) => {
        try {
          // CREATE ORDER
          return { customer, data };
        } catch (error) {
          console.log(typeof createOrder);
          console.log(err);
          return { error: error };
        }
      })
      .catch((err) => console.log(err.message));
  }

  // res.status(200).end();
  return;
};

module.exports = { payment, webhook };
