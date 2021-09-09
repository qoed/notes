import passport from 'passport';
import { Strategy as GithubStrategy } from 'passport-github2';
import User from '../models/User.js';

const setupPassport = () => {
  passport.use(
    new GithubStrategy(
      {
        clientID: process.env.GITHUB_OAUTH_ID,
        clientSecret: process.env.GITHUB_OAUTH_SECRET,
        callbackURL: process.env.GITHUB_OAUTH_CALLBACK,
      },
      async function (accessToken, refreshToken, profile, done) {
        let user;
        user = await User.findOne({ githubId: profile.id });
        if (!user) {
          user = await User.create({
            githubId: profile.id,
            name: profile.username,
            email: profile._json.email,
            avatar: profile._json.avatar_url,
          });
        }
        return done(null, user);
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err, false);
    }
  });
};

export { setupPassport };
