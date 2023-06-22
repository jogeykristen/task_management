const jwt = require('jsonwebtoken');
const { secret } = require('../config/config.json');

// module.exports = authorize;

// function authorize(roles = []) {
//   if (typeof roles === 'string') {
//     roles = [roles];
//   }

//   return (req, res, next) => {
//     const authHeader = req.headers.authorization;
//     const token = authHeader && authHeader.split(' ')[1];

//     if (!token) {
//       return res.status(401).json({ message: 'Unauthorized' });
//     }

//     jwt.verify(token, 'token', { algorithms: ['HS256'] }, (err, decodedToken) => {
//       if (err) {
//         return res.status(403).json({ message: 'Invalid token' });
//       }

//       if (roles.length && !roles.includes(decodedToken.role)) {
//         return res.status(403).json({ message: 'Insufficient permissions' });
//       }

//       req.user = decodedToken;
//       next();
//     });
//   };
// }


module.exports = authorize;

function authorize(roles = []) {
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return (req, res, next) => {
    const user = req.session.user;

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (roles.length && !roles.includes(user.roles)) {
      return res.status(403).json({ message: 'Insufficient permissions' });
    }

    next();
  };
}




