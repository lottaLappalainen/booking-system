import debug from 'debug';
import Joi from 'joi';
import { ValidationError } from '../models/base.mjs';
import { userSchema } from '../models/schemas/user.mjs';
import { User } from '../models/user.mjs';

const log = debug('user-controller');

const validationSchema = Joi.object(userSchema);

const respondWithErrorMessages = (req, res, err) => {
  log(err.message);

  if (err instanceof ValidationError) {
    log('%O', err.details);
    res.status(400);
    return res.json({ error: err.details, message: err.message });
  }

  const error = err.details.reduce((messages, d) => {
    messages[d.path] = d.message;
    log('%O', messages);
    return messages;
  }, {});

  log('%O', error);
  res.status(400);
  return res.json({ error });
};

export const checkStatus = (req, res) => {
  if (!req.user) {
    return res.json({ user: { role: 'guest' } });
  }

  res.json({ user: req.user });
};

export const loginUser = async (req, res) => {
  const {
    value: { email, password },
    error
  } = validationSchema.tailor('login').validate(req.body);
  if (error) return respondWithErrorMessages(req, res, error);

  const user = await User.findByEmail(email);
  if (!user) {
    log('Login failed. Unknown user. Check email.');
    return res.status(403).json({ error: 'Login failed. Check email and password.' });
  }

  const result = await user.checkPassword(password);
  if (!result) {
    log('Login failed. Check password.');
    return res.status(403).json({ error: 'Login failed. Check email and password.' });
  }

  // save token to cookie and send user data to the frontend
  log('Login successful!');
  const token = user.getToken();
  res.cookie('token', token, { ...res.app.get('cookieOptions'), signed: true });
  return res.json({ user });
};

export const logoutUser = (req, res) => {
  if (req.user) {
    res.clearCookie('token', { ...res.app.get('cookieOptions'), signed: true });
  }

  log('Logout successful!');
  res.status(200).json({ message: 'User logged out!' });
};

export const registerUser = async (req, res) => {
  const { value, error } = validationSchema.tailor('register').validate(req.body);
  if (error) return respondWithErrorMessages(req, res, error);

  const existingUser = await User.findByEmail(value.email);
  if (existingUser) {
    log('Registration failed. User with the same email already exists.');
    return res.status(400).json({ error: { email: 'User with the same email address already exists.' } });
  }

  try {
    const user = new User(value);
    await user.save();

    // save token to cookie and send user data to the frontend
    log('Registration successful!');
    const token = user.getToken();
    res.cookie('token', token, { ...res.app.get('cookieOptions'), signed: true });
    res.status(201).json({ user });
  } catch (err) {
    if (err instanceof ValidationError) return respondWithErrorMessages(req, res, err);
    log('Registration failed!');
    return res.sendStatus(500);
  }
};
