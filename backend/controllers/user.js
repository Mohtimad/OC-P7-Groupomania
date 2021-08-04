const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const tokenConfig = require('../token-config')
const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

exports.signup = (req, res, next) => {
  User.findOne({
    attributes: ['email'], 
    where: { email: req.body.email }
  })
  .then(user => {
    if (!user) {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const newUser = {
          password: hash,
          username: req.body.username,
          email: req.body.email,
          isAdmin: false,
        };
        User.create(newUser)
        .then(() => {
          res.status(201).json({ message: 'User created !' });
        })
      })
      .catch(error => res.status(500).json({ error }));
    } else {
        res.status(409).json({ error: 'Email already used!' })
    }
  })
};

  exports.login = (req, res, next) => {
    User.findOne({
      where: { email: req.body.email }
    })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'User not found!' });
        }
        bcrypt.compare(req.body.password, user.dataValues.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Incorrect password !' });
            }
            res.status(200).json({
              username: user.dataValues.username,
              id: user.dataValues.id,
              isAdmin: user.dataValues.isAdmin,
              token: jwt.sign(
                { userId: user.dataValues.id},
                '1E0FF992C079ACF2E5310699E1FAFE45',
                { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };