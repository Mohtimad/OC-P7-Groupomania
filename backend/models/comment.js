module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define('Comment', {
        author: Sequelize.STRING,
        postId: Sequelize.STRING,
        comment: Sequelize.STRING
      })
  
    return Comment
  };