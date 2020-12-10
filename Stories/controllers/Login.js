const router = require("express").Router();

const { loginValidation } = require("../validation");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const Users = require("../models/Users");

router.get("/login", (req, res) => {
  res.render("Login");
});

router.post("/login", async (req, res) => {
  // Validate the info entered by the user
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if User is registered or not
  const user = await Users.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!user) return res.status(400).send("Email not registered!");

  // Verify Password
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Incorrect Password");

  // Issue token
  const email = req.body.email;
  const payload = { email };
  const token = jwt.sign(payload, "mysecret", {
    expiresIn: "1h",
  });
  res.cookie("token", token, {
    maxAge: 3600,
    httpOnly: true,
  });
  res.redirect("/home");
});

module.exports = router;
