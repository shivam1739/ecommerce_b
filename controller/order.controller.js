const orderServices = require("../services/order.service");
const cartService = require("../services/cart.service");
const productService = require("../services/product.service");
const paymentService = require("../services/payment.services");
const Stripe = require("stripe");
require("dotenv").config();

const stripe = Stripe(process.env.STRIPE_API_KEY);

const checkout = async (req, res) => {
  const response = {};
  let statusCode;
  console.log(req.user.id);
  const cart = await cartService.getCartByUser(req.user);
  // console.log(
  //   "ppppppppppppppppppppppppppppppppppppppppppppp",
  //   cart.Products,
  //   "+=============================================================================================="
  // );

  if (!cart) {
    response.message = "cat not found";
    statusCode = 404;
  } else if (cart.Products.length === 0) {
    response.error = "Cart does not have any products";
    statusCode = 404;
  } else {
    for (const buyProduct of cart.Products) {
      const product = await productService.getProductById(buyProduct.id);
      if (product.status != "published") {
        response.message += `${buyProduct} is out of stock or unpublished \n`;
        statusCode = 400;
      } else if (product.stock < buyProduct.Cart_Product.quantity) {
        response.message += `Insufficient stock for product ${buyProduct} \n`;
        statusCode = 400;
      }
    }
    // return res.status(200).send(cart.Products);

    const pay = await paymentService.payment(req.user, cart.Products);
    statusCode = 200;
    response.data = pay;
  }
  return res.status(statusCode).send(response);
};

const createOrder = async (req, res) => {
  const response = {};
  let statusCode;
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
          console.log(customer.email, data, "Customer");
          const cart = await cartService.getCartByUser({
            id: customer.metadata.userId,
          });
          const result = await orderServices.orderCreate(
            cart,
            data.payment_intent
          );
          if (result.error) {
            response.error = result;
            statusCode = 400;
          } else {
            await cart.setProducts([]);
            await cart.save();
            response.data = result;

            statusCode = 200;
            response.message = "successfully order placed";
          }
          res.status(statusCode).send(response);
        } catch (err) {
          console.log(typeof createOrder);
          console.log(err);
          res.status(400).send({ error: err });
        }
      })
      .catch((err) => {
        console.log(err.message);
        res.status(400).send({ error: err });
      });
  }

  // console.log(req.body.data, "req");
  // const paymentData = await paymentService.webhook(req, res);
  // // const cart = await cartService.getCartByUser({
  // //   id: req.body.data.metadata.userId,
  // // });
  // console.log(paymentData);
  // // if (error != undefined) {
  // //   req.status(400).send(error);
  // // }

  // console.log(paymentData, "paymentdata");
  // // const result = await orderServices.orderCreate(cart);
  // // if (result.error) {
  // //   response.error = result;
  // //   statusCode = 400;
  // // } else {
  // //   await cart.setProducts([]);
  // //   await cart.save();
  // //   response.data = result;
  // //   statusCode = 200;
  // // }

  // // console.log(
  // //   response,
  // //   "=========================================================="
  // // );
  // // res.status(statusCode).send(response);
};

module.exports = { checkout, createOrder };
