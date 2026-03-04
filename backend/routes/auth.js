const router = require("express").Router();
const passport = require("passport");

router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
        prompt: "select_account",
    })
);
router.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: "http://localhost:5173/login",
        session: true,
    }),
    (req, res) => {
        res.redirect("http://localhost:5173/dashboard");
    }
);

router.get("/logout", (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            console.error("Logout error:", err);
            return next(err);
        }

        req.session.destroy((err) => {
            if (err) {
                console.error("Session destroy error:", err);
            }

            res.clearCookie("connect.sid", {
                path: "/",
                httpOnly: true,
                sameSite: "none",
                secure: true, 
            });

            res.redirect("http://localhost:5173/login");
        });
    });
});

module.exports = router;
