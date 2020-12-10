const router = require("express").Router();

const withAuth = require("../Authorize");

const sequelize = require("sequelize");

const Users = require("../models/Users");

const Stories = require("../models/Stories");
const { json } = require("sequelize");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/home", withAuth, (req, res) => {
  Users.findAll({
    include: [
      {
        all: true,
        nested: true,
        model: Stories,
        required: true,
      },
    ],
    raw: true,
  }).then((items) => {
    console.log(JSON.stringify(items, null, 2));
    res.render("HomePage", { items });
  });
});

router.post("/home", async (req, res) => {
  let link = new Stories({
    link: req.body.uploadLink,
  });
  try {
    await link.save();
    res.render("HomePage");
  } catch (error) {
    res.sendStatus(404);
  }
});

module.exports = router;
