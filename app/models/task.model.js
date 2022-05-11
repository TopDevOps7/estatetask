const User = require("./user.model")

module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define("tasks", {
      userId: {
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      tags: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.INTEGER
      },
      delFlag: {
        type: Sequelize.INTEGER
      }
    });
    // Task.hasOne(User);
    return Task;
  };