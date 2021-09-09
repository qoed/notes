import express from 'express';
import { logout, getMe, deleteUser } from '../controllers/auth.js';
import { isAuthenticated } from '../middleware/auth.js';
import passport from 'passport';

const router = express.Router();

// @router /api/v1/auth/login/github
router.get('/login/github', passport.authenticate('github'));
// @router /api/v1/auth/oauth2/redirect/github
router.get(
  '/oauth2/redirect/github',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function (req, res, next) {
    res.redirect('/');
  }
);

router.get('/logout', isAuthenticated, logout);
router.get('/me', isAuthenticated, getMe);
router.delete('/delete', isAuthenticated, deleteUser);

export default router;
