const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["email", "profile"] })
  );
  
  router.get(
    "/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/auth/failure",
      session: false,
    }),
    async function (req, res) {
      const token = req.user;
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        secure: false,
      }); // secure true to allow https only
      res.status(200).send({ token: token, statusCode: 200 });
    }
  );
  
  router.get("/auth/failure", (req, res) => {
    res.status(401).send({ message: "error al autenticarse", statusCode: 401 });
  });
  module.exports = router;