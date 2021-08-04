
const fs = require('fs');
const db = require("../models");
const User = db.user;
const Comment = db.comment;
const Op = db.Sequelize.Op;

exports.addComment = (req, res, next) => {
    User.findOne({
      attributes: ['username'], 
      where: { id: req.body.userId }
    })
    .then(user => {
      const newComment = {
        author: user.dataValues.username,
        authorId: req.body.userId,
        postId: req.params.id,
        comment: req.body.comment, 
      };
      Comment.create(newComment)
        .then(() => {
          res.status(201).json({ message: 'Comment created !' });
      })
    })
    .catch(error => res.status(500).json({ error }));
  };

  exports.modifyComment = (req, res, next) => {
    User.findOne({
      attributes: ['username'], 
      where: { id: req.body.userId }
    })
    .then(user => {
      const newComment = {
        author: user.dataValues.username,
        authorId: req.body.userId,
        postId: req.params.id,
        comment: req.body.comment, 
      };
      Comment.create(newComment)
        .then(() => {
          res.status(201).json({ message: 'Comment created !' });
      })
    })
    .catch(error => res.status(500).json({ error }));
  };

  exports.deleteComment = (req, res, next) => {
    User.findOne({
      attributes: ['username'], 
      where: { id: req.body.userId }
    })
    .then(user => {
      const newComment = {
        author: user.dataValues.username,
        authorId: req.body.userId,
        postId: req.params.id,
        comment: req.body.comment, 
      };
      Comment.create(newComment)
        .then(() => {
          res.status(201).json({ message: 'Comment created !' });
      })
    })
    .catch(error => res.status(500).json({ error }));
  };