// routes/auth.js
const router = require("express").Router();
const passport = require("passport");

// ============================
// 🔵 GOOGLE LOGIN
// ============================
router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
        prompt: "select_account",
    })
);

// ============================
// 🟢 GOOGLE CALLBACK
// ============================
router.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: "http://localhost:5173/login",
        session: true,
    }),
    (req, res) => {
        // ✅ After successful login → go to dashboard
        res.redirect("http://localhost:5173/dashboard");
    }
);

// ============================
// 🔴 LOGOUT
// ============================
// ============================
// 🔴 LOGOUT
// ============================
router.get("/logout", (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            console.error("Logout error:", err);
            return next(err);
        }

        // destroy session completely
        req.session.destroy((err) => {
            if (err) {
                console.error("Session destroy error:", err);
            }

            // clear cookie properly
            res.clearCookie("connect.sid", {
                path: "/",
                httpOnly: true,
                sameSite: "none",
                secure: true, // keep true if using HTTPS (Render/Vercel)
            });

            // redirect to frontend login page
            res.redirect("http://localhost:5173/login");
        });
    });
});

module.exports = router;