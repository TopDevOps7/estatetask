// const sequelize = require('sequelize');
// const sequelize = require('../../server').sequelize;
const Task = require("./user.model")

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    userName: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    delFlag: {
      type: Sequelize.INTEGER
    }
  });
  // User.belongsTo(Task);
  return User;
};
