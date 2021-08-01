module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define('Post', {
        userId: Sequelize.STRING,
        title: Sequelize.STRING,
        username: Sequelize.STRING,
        imgURL: Sequelize.STRING

      })
  
    return Post
  };