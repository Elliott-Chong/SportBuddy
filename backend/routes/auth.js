const router = require("express").Router();
const User = require("../models/User");
const config = require("config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const querystring = require("querystring");
const auth = require("../middleware/auth");
const { body, validationResult } = require("express-validator");
const production = require('dotenv').config({path:'../.env'}).parsed.REACT_APP_PRODUCTION === 'true'

function getTokens(code, clientId, clientSecret, redirectUri) {
  /*
  Returns:
  Promise<{
    access_token: string;
    expires_in: Number;
    refresh_token: string;
    scope: string;
    id_token: string;
  }>
  */
  const url = "https://oauth2.googleapis.com/token";
  const values = {
    code,
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
    grant_type: "authorization_code",
  };

  return axios
    .post(url, querystring.stringify(values), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      throw new Error(error.message);
    });
}

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
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get("jwt_secret"),
        { expiresIn: 360000000 },
        (err, token) => {
          if (err) throw err;
          return res.json({ token });
        }
      );
    } catch (error) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Server Error at line 62" }] });
    }
  }
);

router.get("/user", auth, (req, res) => {
  if (req.user) {
    return res.status(200).json(req.user);
  } else {
    return res.status(400).send("No User");
  }
});
// router.get(
//   "/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );
router.get("/google/redirect", async (req, res) => {
  const code = req.query.code;
  const { id_token, access_token } = await getTokens(
    code,
    config.get("googleClientId"),
    config.get("googleClientSecret"),
    !production
      ? "http://localhost:5001/api/auth/google/redirect"
      : "https://elliott-project.com/api/auth/google/redirect"
  );
  const response = await axios.get(
    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
    {
      headers: {
        Authorization: `Bearer ${id_token}`,
      },
    }
  );

  let profile = response.data;
  let user = await User.findOne({ googleId: profile.id });
  if (user) {
    let payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(payload, config.get("jwt_secret"), (err, token) => {
      if (err) throw err;
      return res.redirect(
        !production
          ? `http://localhost:3000/google/success/${token}`
          : `https://sportbuddy.elliottchong.com/google/success/${token}`
      );
    });
  } else {
    let newUser = new User({
      email: profile.email,
      googleId: profile.id,
      username: profile.name,
      loginMethod: "google",
      avatar: profile.picture,
    });
    await newUser.save();
    let payload = {
      user: {
        id: newUser.id,
      },
    };
    jwt.sign(payload, config.get("jwt_secret"), (err, token) => {
      if (err) throw err;
      return res.redirect(
        !production
          ? `http://localhost:3000/google/success/${token}`
          : `https://sportbuddy.elliottchong.com/google/success/${token}`
      );
    });
  }
});
router.post(
  "/login",
  body("email", "Please provide a valid email").isEmail(),
  body("password", "Password is required").not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const payload = {
        user: { id: user.id },
      };

      jwt.sign(payload, config.get("jwt_secret"), (err, token) => {
        if (err) {
          throw err;
        }
        return res.json({ token });
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ errors: [{ msg: "Server Error" }] });
    }
  }
);

module.exports = router;
