const router = require("express").Router();
const User = require("../models/User");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const elleError = (err) => console.log("Elle there is a error: ", err);
router.post(
  "/register",
  body("username", "Username is required").not().isEmpty(),
  body(
    "password",
    "Please enter a password with 6 or more characters"
  ).isLength({ min: 6 }),
  body("email", "Email is required").isEmail(),
  body("password2", "Please confirm your password").not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let { username, email, password, password2 } = req.body;
    if (password !== password2)
      return res
        .status(400)
        .json({ errors: [{ msg: "Passwords do not match!" }] });

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Email has been taken" }] });
      }
      user = new User({
        email,
        username,
        loginMethod: "normal",
        password,
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      return res.send("User Registered");
    } catch (error) {
      elleError(error);
    }
  }
);

const loginMiddleware = (req, res, next) => {
  const { email, password } = req.body;
  let errors = [];
  if (!email) {
    errors.push({ msg: "Email is required" });
  }
  if (!password) {
    errors.push({ msg: "Password is required" });
  }
  if (errors.length > 0) return res.status(400).json({ errors });
  return next();
};

router.get("/user", (req, res) => {
  if (req.user) {
    return res.status(200).json(req.user);
  } else {
    return res.status(400).send("No User");
  }
});
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/redirect",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/login/google/success",
  }),
  (req, res) => {
    return res.send("logged in with google alr");
  }
);
router.post(
  "/login",
  loginMiddleware,
  passport.authenticate("local"),
  (req, res) => {
    return res.json(req.user);
  }
);
router.get("/logout", (req, res) => {
  req.logOut();
  return res.send("Logged Out");
});
module.exports = router;
