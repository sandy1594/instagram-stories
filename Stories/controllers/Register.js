const router = require("express").Router();

const sequelize = require("sequelize");

const Users = require("../models/Users");

const { registerValidation } = require("../validation");

const bcrypt = require("bcrypt");

router.get("/register", (req, res) => {
  res.render("Register");
});

router.post("/register", async (req, res) => {
  // Validate the data the user has entered
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Check if the email is already registered
  const emailExists = await Users.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (emailExists) return res.status(400).send("Email already registered!");

  //Encrypt the Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //Create new User in the DB
  let user = new Users({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    await user.save();
    res.redirect("/login");
  } catch (error) {
    res.sendStatus(404);
  }
});

module.exports = router;
