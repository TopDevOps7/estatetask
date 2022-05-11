// const db = require("../config/db.config.js");
const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
// console.log(dbConfig.options);
const sequelize = new Sequelize(dbConfig.db, dbConfig.username, dbConfig.paswsord, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  operatorsAliases: dbConfig.operatorsAliases,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
db.users = require("./user.model.js")(sequelize, Sequelize);
db.tasks = require("./task.model.js")(sequelize, Sequelize);

module.exports = db;
