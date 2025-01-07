import debug from 'debug';
import { User } from '../models/user.mjs';

const log = debug('assignment-backend:auth-middleware');

const getTokenFromCookie = req => {
  if (!('signedCookies' in req) || !req.signedCookies.token) {
    log('Missing or invalid token cookie');
    return null;
  }

  return req.signedCookies.token;
};

export const getCurrentUser = (req, res, next) => {
  try {
    const cookieOptions = { ...res.app.get('cookieOptions'), signed: true };
    const token = getTokenFromCookie(req);
    if (!token) return next();

    const decodedToken = User.verifyToken(token);
    if (!decodedToken) {
      log('Invalid token.');
      res.clearCookie('token', cookieOptions);
      return res.status(403).json({ error: 'Invalid token' });
    }

    const user = User.findByEmail(decodedToken.email);
    if (!user) {
      log('Unknown user.');
      res.clearCookie('token', cookieOptions);
      return res.status(403).json({ error: 'Unknown user' });
    }

    req.user = user;
    res.cookie('token', user.getToken(), cookieOptions);
    next();
  } catch (err) {
    log('Authentication failed');
    return res.sendStatus(500);
  }
};

export const requireAuthenticated = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  next();
};

export const requireNotAuthenticated = (req, res, next) => {
  if (req.user) {
    log(`${req.originalUrl} is only for guests. Current role: '${req.user.role}'`);
    return res.status(403).json({ error: 'Only for guests' });
  }
  next();
};
