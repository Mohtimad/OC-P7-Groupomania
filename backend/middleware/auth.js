const jwt = require('jsonwebtoken');
const tokenConfig = require('../token-config')

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, '1E0FF992C079ACF2E5310699E1FAFE45');
    const userId = decodedToken.userId;
    console.log(decodedToken + '\n' + userId )
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};