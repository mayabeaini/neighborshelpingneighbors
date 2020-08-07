const express = require("express");
const session = require("express-session");
const cors = require('cors');
const helmet = require('helmet');
const logger = require('morgan');
const app = express();

const PORT = process.env.PORT || 8080;

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const routes = require('./routes');
 
// // require .env files for private data
require('dotenv').config();
 
const passportConfig = {
 clientID: "314042531945-9m1cipmq29a7f4vatqm6sjhiog3mieqm.apps.googleusercontent.com",
 clientSecret: "M7jcFBizQWA4JgpxHjl1570l",
 callbackURL: "http://localhost:8080/auth/google/callback"
};
 
app.use(express.json());
 
app.use(helmet());
 
app.use(logger('dev'));
 
// enable cors
app.use(cors({
 origin: true,
 credentials: true
}));
 
app.use(
 session({
   secret: "74632e5ac02f55a3a4a50491da00b68f66eea861c15be3cc69f4a6a1b1e4e788",
   resave: false,
   saveUninitialized: true
 })
);
 
app.use(passport.initialize());
 
app.use(passport.session());
 
// initialize google & facebook strategy middleware
// http://www.passportjs.org/docs/google/
// http://www.passportjs.org/docs/facebook/
passport.use(
 new GoogleStrategy(passportConfig, function(
   _accessToken,
   _refreshToken,
   profile,
   cb
 ) {
   return cb(null, profile);
 })
);

passport.use(
  new GoogleStrategy(passportConfig,
function(_accessToken, _refreshToken, profile, cb) {
    cb(null, profile);
}
));
 
passport.serializeUser((user, cb) => {
 cb(null, user);
});
 
passport.deserializeUser((user, cb) => {
 cb(null, user);
});
app.use('/', routes);


//  =========================
//          DATABASE
//  =========================
app.use(express.urlencoded({extended: false}));

const usersRoute = require("./routes/user");
const ordersRoute = require("./routes/order");
const itemsRoute = require("./routes/item")
const itemsOrderRoute = require("./routes/item_order")

app.use("/user", usersRoute);
app.use("/order", ordersRoute);
app.use("/item", itemsRoute)
app.use("/item-order", itemsOrderRoute)

app.listen(PORT, () => {
 console.log(`Server listening on port ${PORT}.`);
});
