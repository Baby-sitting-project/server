import {verify} from'jsonwebtoken';


const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    return res.sendStatus(401);
  } else {
    
    verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err || !user.id || !user.email || !user.password) {
        return res.sendStatus(403);
      } else {
        req.user = user;
        next();
      }
    });
  }
};

export default authenticateToken;
