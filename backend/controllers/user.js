const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const db = require("../models");
const User = db.user;
const Post = db.post;
const Comment = db.comment;
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
              { userId: user.dataValues.id },
              '1E0FF992C079ACF2E5310699E1FAFE45',
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.edit = (req, res, next) => {
  User.findOne({
    where: { id: req.body.userId }
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
          let newUserData = {
            username: req.body.username ? req.body.username : user.dataValues.username,
            email: req.body.email ? req.body.email : user.dataValues.email
          }
          User.update(newUserData, { where: { id: req.body.userId } })
          Comment.update({ author: newUserData.username }, { where: { authorId: req.body.userId } })
          Post.update({ username: newUserData.username }, { where: { userId: req.body.userId } })
            .then(() => {
              console.log('User Data edited by ' + user.dataValues.username)
              res.status(200).json({ message: 'User changed!' })
            })
            .catch(error => res.status(401).json({ error }));
        })
    })
    .catch(error => res.status(500).json({ error }));
};

exports.delete = (req, res, next) => {
  User.findOne({
    where: { id: req.body.userId }
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
          User.destroy({ where: { id: req.body.userId } })
          Post.findAll({ where: { userId: req.body.userId } })
            .then((result) => {
              let postsId = [];
              let postsUrlImage = []
              for (let i = 0; i < result.length; i++) {
                postsId.push(result[i].id)
                postsUrlImage.push(result[i].imgURL.split('/images/')[1])
              }
              for (let i = 0; i < postsUrlImage.length; i++) {
                fs.unlink(`images/${postsUrlImage[i]}`, (err) => {
                  if (err) { console.log(`images/${postsUrlImage[i]} not found !`); }
                  else { console.log(`deleted old images/${postsUrlImage[i]}`); }
                })
              }
              Comment.destroy({
                where: { [Op.or]: [{ authorId: 6 }, { postId: postsId }] }
              })
              Post.destroy({ where: { userId: req.body.userId } })
                .then(() => {
                  res.status(200).json({ message: 'User deleted' })
                })
            })
            .catch(error => res.status(401).json({ error }));
        })
    })
    .catch(error => res.status(500).json({ error }));
};