const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
const config = require("config");
const bcrypt = require("bcryptjs");
const initialisePassport = (passport) => {
  const authenticateUser = async (email, password, done) => {
    const user = await User.findOne({ email });
    if (!user) {
      done(null, false);
    }
    if (user && user.googleId) {
      done(null, false);
    }
    try {
      const compare = await bcrypt.compare(password, user.password);
      if (!compare) {
        done(null, false);
      } else {
        done(null, user);
      }
    } catch (error) {
      done(error);
    }
  };
  passport.use(
    new GoogleStrategy(
      {
        clientID: config.get("googleClientId"),
        clientSecret: config.get("googleClientSecret"),
        callbackURL: "/api/auth/google/redirect",
      },
      async (accessToken, refreshToken, profile, done) => {
        let user = await User.findOne({ googleId: profile.id });
        if (user) {
          done(null, user);
        } else {
          let newUser = new User({
            email: profile.emails[0].value,
            googleId: profile.id,
            username: profile.displayName,
            loginMethod: "google",
            avatar: profile._json.picture,
          });
          await newUser.save();
          done(null, newUser);
        }
      }
    )
  );
  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
  });
};
module.exports = initialisePassport;
