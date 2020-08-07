const express = require('express');
const passport = require('passport');
const router = express.Router();
 
let authRedirect = '/';
 
// login failure endpoint
router.get('/loginFailed', (_req, res, _next) => {
 res.status(401).send('Could not authenticate with OAuth provider');
});
 
// login endpoint which kickstarts the auth process
router.get('/login', (req, res) => {
  authRedirect = req.query.from;
  passport.authenticate('google', { scope: 'https://www.googleapis.com/auth/plus.login'})(req, res);
 });
 
// logout path
router.get('/logout', (req, res) => {
 req.logout();
 res.redirect(req.query.from);
})

router.get('/auth/google/callback',
 passport.authenticate('google', { scope: 'https://www.googleapis.com/auth/plus.login'}),
 function (_req, res){
   res.redirect('http://localhost:3000/profile');
 });
 
// endpoint for checking user's auth status
router.get('/check-auth', (req, res) => {
 if (req.user === undefined) return res.status(401).send('Unauthorized');
 res.status(200).json(req.user);
});

module.exports = router;