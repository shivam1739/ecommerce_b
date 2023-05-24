const authServices = require("../services/auth.services");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const signup = async (req, res) => {
  /* route for signup */
  console.log(req.body, "================");
  try {
    // if (req.params.userType == "admin") {
    //   res.status(401).json({
    //     message: "you are not authorizesd person please contact with adimn",
    //   });
    // }
    const response = await authServices.signup(
      req.body,
      req.file.path,
      req.params.userType
    );
    return res.status(201).json({
      message: "succsessfull signup",
      success: true,
      data: response,
    });
  } catch (err) {
    console.log(err);
    return res.status(409).json(err.errors[0].message);
  }
};

const signin = async (req, res) => {
  const userData = await authServices.getuserbyEmail(req.body.email);

  if (!userData) {
    return res.status(401).json({
      message: "invalid email and password please try again",
    });
  }

  const passwordVerified = authServices.verifyPassword(
    req.body.password,
    userData.password
  );

  if (!passwordVerified) {
    return res.status(401).json({
      message: "invalid email and password please try again",
    });
  }
  var token = jwt.sign(
    {
      email: userData.email,
      password: userData.password,
      username: userData.username,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "2h" }
  );
  userData.password = undefined;
  return res.status(200).json({
    message: "successfully sign in ",
    success: true,
    data: userData,
    token: token,
  });
};

const addRollToUser = async (req, res) => {
  const response = await authServices.addRollToUser(
    req.params.userId,
    body.roleId
  );
  return res.json({
    message: "successfully add role ",
    code: 200,
    success: true,
    data: response,
  });
};

const getuserbyId = async (req, res) => {
  const response = await authServices.getuserbyId(req.params.userId);
  return res.json({
    response,
  });
};
module.exports = { signup, signin, addRollToUser, getuserbyId };
