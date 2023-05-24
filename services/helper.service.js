const { User } = require("../models/index");
const getuserbyEmail = async (emailData) => {
  const response = await User.findOne({
    where: {
      email: emailData,
    },
  });

  return response;
};

module.exports = { getuserbyEmail };
