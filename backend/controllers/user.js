const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const tokenConfig = require('../token-config')
const sequelize = require("../config/db.config");

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = {
          email: req.body.email,
          password: hash,
          username: req.body.username
        };
        sequelize.query(`INSERT INTO Users VALUES (NULL, '${user.password}', '${user.email}', '${user.username}');`)
        .then(([results, metadata]) => {
          console.log(results);
          res.status(201).json({ message: 'User created !' });
        })
        .catch(() => res.status(400).json({ error: 'Email already used!' }));
      })
      .catch(error => res.status(500).json({ error }));
  };

  exports.login = (req, res, next) => {
    const encyptedEmail = encryptMail(req.body.email);
    User.findOne({ email: encyptedEmail })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'User not found!' });
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Incorrect password !' });
            }
            res.status(200).json({
              userId: user._id,
              token: jwt.sign(
                { userId: user._id},
                `${tokenConfig.secretTokenKey}`,
                { expiresIn: '15m' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };