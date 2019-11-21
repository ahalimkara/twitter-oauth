const passport = require('passport');
const TwitterStrategy = require('passport-twitter');
const { query } = require('./database');

const config = require('./config/config');

function initPassport(app) {
  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });

  passport.deserializeUser((userId, cb) => {
    query('SELECT * FROM users WHERE id = ?;', [userId])
      .then(results => {
        if (results.length > 0) {
          cb(null, results[0]);
        } else {
          cb(new Error('User not found'));
        }
      })
      .catch(error => {
        cb(error);
      });
  });

  passport.use(
    new TwitterStrategy(
      {
        consumerKey: config.TWITTER_API_KEY,
        consumerSecret: config.TWITTER_API_SECRET,
        callbackURL: '/auth/twitter/callback',
      },
      async (token, tokenSecret, profile, cb) => {
        let [user] = await query('SELECT * FROM users WHERE id_str = ?;', [profile._json.id_str]);

        if (!user) {
          await query('INSERT INTO users SET id_str = ?, name = ?, screen_name = ?, profile_image_url = ?;', [
            profile._json.id_str,
            profile._json.name,
            profile._json.screen_name,
            profile._json.profile_image_url,
          ]);

          [user] = await query('SELECT * FROM users WHERE id_str = ?;', [profile._json.id_str]);
        }

        return cb(null, user);
      },
    ),
  );

  app.use(passport.initialize({}));
  app.use(passport.session({}));
}

module.exports = initPassport;
