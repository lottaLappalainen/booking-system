import express from 'express';
import {
  checkStatus,
  loginUser,
  logoutUser,
  registerUser,
} from '../controllers/user.mjs';
import {
  requireNotAuthenticated,
} from '../middleware/auth.mjs';
import requireJson from '../middleware/requireJson.mjs';

const router = express.Router();

router.route('/check-status').get(checkStatus);

router.route('/login').post(requireJson, requireNotAuthenticated, loginUser);

router.route('/logout').get(logoutUser);

router.route('/register').post(requireJson, requireNotAuthenticated, registerUser);

export default router;
