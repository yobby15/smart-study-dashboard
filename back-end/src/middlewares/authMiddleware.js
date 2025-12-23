const jwt = require('jsonwebtoken');
const AuthenticationError = require('../exceptions/AuthenticationError');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; 

  if (!token) {
    return next(new AuthenticationError('Anda perlu login untuk mengakses resource ini'));
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);

    req.user = decoded; 

    next(); 
  } catch (error) {
    return next(new AuthenticationError('Token tidak valid'));
  }
};

module.exports = authMiddleware;