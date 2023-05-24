const express = require("express");
require("dotenv").config();
const { sequelize } = require("./models/index");
const cors = require("cors");
const categoryRoute = require("./routes/category.routes");
const productRoute = require("./routes/product.routes");
const authRoute = require("./routes/auth.routes");
const bodyParser = require("body-parser");
const port = process.env.PORT || 8000;
console.log(port);
const app = express();

app.use("/Images", express.static("./Images"));
app.use(express.json());

app.use(cors());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,PATCH"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, x-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, x-access-token"
  );
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));

categoryRoute(app);
productRoute(app);
authRoute(app);

app.get("/", async (req, res) => {
  res.send("<h1>hellow<h1>");
});

app.listen(port, async () => {
  await sequelize.sync();
  console.log(`server is listening to port ${port}`);
});
