const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token; // Assuming you're sending the token as a cookie

  if (!token) {
    return res.status(401).json({ message: 'Authentication failed: No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Authentication failed: Invalid token' });
    }

    // If token is valid, attach the decoded user information to the request object
    req.user = decoded;
    next();
  });
};

module.exports = authenticateToken;
