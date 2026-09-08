const jwt = require('jsonwebtoken');
const config = require('../config/config');

const generateToken = (id, role = 'user') => {
  return jwt.sign({ id, role }, config.jwtSecret, {
    expiresIn: config.jwtExpire,
  });
};

module.exports = generateToken;
