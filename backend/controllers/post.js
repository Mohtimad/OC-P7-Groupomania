const fs = require('fs');
const jwt = require('jsonwebtoken');
const tokenConfig = require('../token-config')
const db = require("../models");
const Post = db.post;
const Comment = db.comment;
const Op = db.Sequelize.Op;

// call by createSauce() & modifySauce()
//function checkIfAuthor(authorization, authorUserId) {
//  try {
//    const token = authorization.split(' ')[1];
//    const decodedToken = jwt.verify(token, tokenConfig.secretTokenKey);
//    const userId = decodedToken.userId;
//    if (authorUserId !== userId) {
//      throw 'Invalid user ID';
//    } else {
//      console.log("user " + userId + " authorization ok")
//    }
//  } catch {
//    res.status(401).json({
//      error: 'Invalid request!'
//    });
//  }
//}

exports.getPosts = (req, res, next) => {
  Post.findAll()
    .then((allPosts) => {
      Comment.findAll({
        attributes: [['username', 'c_username'], 'postId', 'comment'], 
      })
      .then((allComment) => {
       res.status(200).json({
         result : {
          allPosts: allPosts,
          allComment: allComment
          }
         })
        })
    })
    .catch(error => res.status(400).json({ error }));
};

exports.createPost = (req, res, next) => {
  const newPost = {
    userId: req.body.userId,
    title: req.body.title,
    username: req.body.username,
    imgURL: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  };
  Post.create(newPost)
  .then((result) => {
    const newComment = {
      comment: req.body.comment,
      username : req.body.username,
      postId: result.dataValues.id
    }
    console.log(newComment)
    Comment.create(newComment)
    .then(() => {
      console.log(result)
      res.status(201).json({ message: 'Post created !' });
    })
  })
  .catch(error => res.status(500).json({ error }));
};

//exports.modifySauce = (req, res, next) => {
//  Sauce.findOne({ _id: req.params.id })
//  .then(sauce => {
//    checkIfAuthor(req.headers.authorization, sauce.userId);
//    const filename = sauce.imageUrl.split('/images/')[1];
//    const sauceObject = req.file ?
//      {
//        ...JSON.parse(req.body.sauce),
//        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
//      } : { ...req.body };
//      sauceObject.heat = !sauceObject.heat || sauceObject.heat < minHeat || sauceObject.heat > maxHeat ? 1 : sauceObject.heat;
//      if (sauceObject.imageUrl) {
//        fs.unlink(`images/${filename}`, (err) => {
//          if (err) throw err;
//          console.log(`deleted images/${filename}`);
//        });
//      }
//    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
//      .then(() => {
//        console.log('Item edited by userId ' + sauce.userId)
//        res.status(200).json({ message: 'Item changed!'})
//      })
//      .catch(error => res.status(400).json({ error }));
//  })
//  .catch(error => res.status(500).json({ error : 'Invalid user ID'}));
//};
//
//exports.deleteSauce = (req, res, next) => {
//  Sauce.findOne({ _id: req.params.id })
//    .then(sauce => {
//    checkIfAuthor(req.headers.authorization, sauce.userId);
//      const filename = sauce.imageUrl.split('/images/')[1];
//      fs.unlink(`images/${filename}`, () => {
//        console.log(`deleted images/${filename}`);
//        Sauce.deleteOne({ _id: req.params.id })
//          .then(() => {
//            console.log('Item deleted by userId ' + sauce.userId)
//            res.status(200).json({ message: 'Item deleted!'})
//          })
//          .catch(error => res.status(400).json({ error }));
//      });
//    })
//    .catch(error => res.status(500).json({ error }));
//};
//
//exports.likeOneSauce = (req, res, next) => {
//  Sauce.findOne({ _id: req.params.id })
//    .then(sauce => {
//      switch(req.body.like) {
//        case -1:
//          sauce.usersDisliked.push(req.body.userId)
//          sauce.dislikes++
//          break;        
//        case 1:
//          sauce.usersLiked.push(req.body.userId)
//          sauce.likes++
//          break;
//        default:
//          for (let i = 0; i < sauce.usersDisliked.length; i++) {
//            if (sauce.usersDisliked[i] === req.body.userId) {
//              sauce.usersDisliked.splice(i, 1);
//              sauce.dislikes--
//            }
//          }
//          for (let i = 0; i < sauce.usersLiked.length; i++) {
//            if (sauce.usersLiked[i] === req.body.userId) {
//              sauce.usersLiked.splice(i, 1);
//              sauce.likes--
//            }
//          }
//          break;
//      }
//      console.log("item " + req.params.id + " liked/disliked by " + req.body.userId)
//      Sauce.updateOne({ _id: req.params.id }, { likes: sauce.likes,
//                                                  dislikes: sauce.dislikes,
//                                                  usersDisliked: sauce.usersDisliked,
//                                                  usersLiked: sauce.usersLiked,
//                                                  _id: req.params.id})
//        
//        .then(() => res.status(200).json({ message: 'validated vote !'}))
//        .catch(error => res.status(400).json({ error }));
//      })
//    .catch(error => res.status(404).json({ error }));
//};