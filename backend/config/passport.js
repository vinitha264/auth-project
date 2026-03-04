const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
if (
    !process.env.GOOGLE_CLIENT_ID ||
    !process.env.GOOGLE_CLIENT_SECRET ||
    !process.env.GOOGLE_CALLBACK_URL
) {
    console.error("❌ Missing Google OAuth environment variables in .env");
    process.exit(1);
}

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
            scope: ["profile", "email"],
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const googleId = profile.id;
                const name = profile.displayName || "";
                const email = profile.emails?.[0]?.value || "";
                const photo = profile.photos?.[0]?.value || "";

                if (!email) {
                    console.log("⚠️ No email received from Google");
                }

                let user = await User.findOne({ googleId });

                if (!user) {
                    user = await User.create({
                        googleId,
                        name,
                        email,
                        photo,
                    });
                } else {
                    user.name = name;
                    user.email = email;
                    user.photo = photo;
                    await user.save();
                }

                return done(null, user);
            } catch (error) {
                console.error("❌ Google Auth Error:", error);
                return done(error, null);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

module.exports = passport;
