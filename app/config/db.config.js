// const Sequelize = require("sequelize")

// const dbConfig = new Sequelize({
//     db: "testdb",
//     username: "root",
//     password: "",
//     host: "localhost",
//     dialect: "mysql",
//     operatorsAliases: false,
//     pool: {
//         max: 5,
//         min: 0,
//         acquire:30000,
//         idle:10000
//     }
// })

// module.exports = dbConfig

module.exports = {
  db: "testdb",
  username: "root",
  password: "",
  host: "localhost",
  dialect: "mysql",
  operatorsAliases: false,
  pool: {
      max: 5,
      min: 0,
      acquire:30000,
      idle:10000
  }
};

// module.exports = {
//   HOST: "localhost",
//   USER: "root",
//   PASSWORD: "",
//   DB: "testdb",
//   dialect: "mysql",
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   }
// };
