const { User, Role } = require("../models/index");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const roleService = require("./role.services");

const signup = async (body, usertType) => {
  const signupResponse = await User.create({
    email: body.email,
    password: body.password,
    username: body.username,
    image: body.image,
  });
  const role = await roleService.getRoleByName(usertType);
  await signupResponse.addRole(role);
  return signupResponse;
};

const getuserbyEmail = async (emailData) => {
  const response = await User.findOne({
    where: {
      email: emailData,
    },
    include: Role,
  });

  return response;
};
const getuserbyId = async (id) => {
  const response = await User.findOne({
    where: {
      id: id,
    },
    include: Role,
  });

  return response;
};

const verifyPassword = (pass, hashPass) => {
  const response = bcrypt.compareSync(pass, hashPass);
  return response;
};

const verifyToken = (token) => {
  try {
    const response = jwt.verify(token, process.env.JWT_SECRET_KEY);
    return response;
  } catch (err) {
    console.log(err);
  }
};

const addRollToUser = async (userId, roleId) => {
  const user = await User.findOne({
    where: {
      id: userId,
    },
  });
  const role = await Role.findOne({
    where: {
      id: roleId,
    },
  });
  user.addRole(role);
  return user;
};
module.exports = {
  signup,
  getuserbyEmail,
  verifyPassword,
  verifyToken,
  addRollToUser,
  getuserbyId,
};
