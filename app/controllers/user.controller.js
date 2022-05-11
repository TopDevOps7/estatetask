const { DEL_FLAG_EXIST } = require("../constants/constants");
const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

exports.signup = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    }); 
    return;
  }
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userName: req.body.userName,
    password: req.body.password,
    delFlag: DEL_FLAG_EXIST
  };
  const userName = user.userName
  var condition = userName ? { userName: userName } : null;
  User.findAll({ where: condition })
    .then(data => {
      if(data.length === 0) {
        User.create(user)
          .then(data => {
            user.id = data.dataValues.id;
            res.send(user);
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the User."
            });
        });
      } else {
        res.send(false);
      }
      // res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
}

exports.signin = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    }); 
    return;
  }
  const userName = req.body.userName;
  const password = req.body.password;
  const condition = userName && password ? {userName: userName, password: password} : null;
  User.findAll({where: condition})
  .then(data => {
      if(data.length > 0) {
        res.send(data[0]);
      } else {
        res.end(false);
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
}