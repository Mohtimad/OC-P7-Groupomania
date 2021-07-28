const { Sequelize } = require('sequelize');

const dbConfig = {
  HOST: "localhost",
  USER: "mohtimad",
  PASSWORD: "12921292",
  DB: "groupomania",
  dialect: "mysql",
};

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
});

try {
  sequelize.authenticate();
  console.log('Connecté à la base de données MySQL!');
} catch (error) {
  console.log('Impossible de se connecter, erreur suivante :', error);
}

module.exports = sequelize;


