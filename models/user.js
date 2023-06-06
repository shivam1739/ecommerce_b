"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Role, { through: "User_Roles" });
      this.hasMany(models.Product, {
        foreignKey: {
          name: "sellerId",
        },
      });
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          /* validations are being validated at sequelize level in the project */
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        /* validations are being validated at sequelize level in the project */
        allowNull: false,
        validate:
          /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/,
      },
      username: { type: DataTypes.STRING },
      image: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  /* this beforeCreate is a simple function known as a hook, will be running
 everytime before creating the user object in user table */
  User.beforeCreate((user) => {
    const salt = bcrypt.genSaltSync(10);
    let hashedPassword = bcrypt.hashSync(user.password, salt);
    user.password = hashedPassword; //this line will replace user's actual password with hashed password
  });

  return User;
};
