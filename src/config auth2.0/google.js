const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const userSchema = require("../models/user");
const generator = require("generate-password");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        const user = await userSchema.findOne({
          email: profile.emails[0].value,
        });
        const existUser = await userSchema.exists({
          email: profile.emails[0].value,
        });
        if (existUser) {
          const token = user.generateAuthToken();
          return done(null, token);
        }
      } catch (err) {
        console.log(err);
      }
      try {
        var passcode = generator.generate({
          length: 10,
          numbers: true,
        });
        const newUser = await new userSchema({
          password: passcode,
          email: profile.emails[0].value,
          name: profile.displayName,
        }).save();
        done(null, newUser);
      } catch (err) {
        console.log(err);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
