const express = require('express');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const cors = require('cors');

const config = require('./config/config');
const initPassport = require('./initPassport');

const app = express();
const port = 8080;

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
);

app.use(cookieParser());
app.use(expressSession({ secret: 'secret', resave: true, saveUninitialized: true }));

initPassport(app);

app.get('/auth/twitter', passport.authenticate('twitter', {}, null));
app.get(
  '/auth/twitter/callback',
  passport.authenticate('twitter', {
    successRedirect: config.FRONTEND_URI + '?twitter=success',
    failureRedirect: config.FRONTEND_URI + '?twitter=failed',
  }, null),
);
app.get('/logout', (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      res.status(500).json({
        done: false,
        error: error.message,
      });
    } else {
      res.status(200).json({
        done: true,
      });
    }
  });
});

app.get('/profile', (req, res) => {
  if (req.user) {
    res.status(200).json({
      authenticated: true,
      user: req.user,
    });
  } else {
    res.status(401).json({
      authenticated: false,
    });
  }
});

app.listen(port, () => console.log(`Server is running on port ${port}!`));
