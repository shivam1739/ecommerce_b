const roleService = require("../services/role.services");
const isAdmin = async (req, res, next) => {
  const user = req.user;
  const adminRole = await roleService.getRoleByName("admin");
  const isAdmin = await user.hasRole(adminRole);
  if (!isAdmin) {
    return res.json({
      status: 401,
      message: "User is not admin",
      data: {},
      err: "Not authorized",
    });
  }

  next();
};

const isSeller = async (req, res, next) => {
  const user = req.user;
  const adminRole = await roleService.getRoleByName("seller");
  const isAdmin = await user.hasRole(adminRole);
  if (!isAdmin) {
    return res.json({
      status: 401,
      message: "User is not admin",
      data: {},
      err: "Not authorized",
    });
  }

  next();
};

module.exports = { isAdmin, isSeller };
