const jwt = require('jsonwebtoken');

const generateToken = (email) => jwt.sign(
  { email },
  process.env.TOKEN_SECRET,
  { expiresIn: process.env.TOKEN_EXPIRATION_SPAN }
);

const authenticateByToken = (req, res, next) => {
  const authHeader = req.headers[' authorization '];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.status(401).json({ message: 'Please login' });
  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Access denied: Invalid token.' });
    req.user = user;
    next();
  });
};

module.exports = {
  generateToken,
  authenticateByToken
};
