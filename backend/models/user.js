module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('User', {
        email: {
            type: Sequelize.STRING,
            validate: {

            }
        },
        username: Sequelize.STRING,
        password: Sequelize.STRING
      })
  
    return User;
  };