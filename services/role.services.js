const { Role, User } = require("../models/index");
const authServices = require("../services/auth.services");
const helperService = require("../services/helper.service");

const addRoleToUser = async (userEmail, roleName) => {
  try {
    const user = await helperService.getuserbyEmail(userEmail);
    const role = await getRoleByName(roleName);
    await user.addRole(role);
    return user;
  } catch (err) {
    console.log(err);
  }
};

const removeRoleFromUser = async (userEmail, roleName) => {
  try {
    const user = await authServices.getuserbyEmail(userEmail);
    const role = await getRoleByName(roleName);
    //   console.log(role);
    await user.removeRole(role);
    return user;
  } catch (err) {
    console.log(err);
  }
};
const getRoleByName = async (roleName) => {
  try {
    const response = await Role.findOne({
      where: {
        name: roleName,
      },
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};
/*const getRoleById = async (id) => {
  try {
    const response = await Role.findByPk();
    return response;
  } catch (err) {
    console.log(err);
  }
};*/
module.exports = {
  addRoleToUser,
  removeRoleFromUser,
  getRoleByName,
};
