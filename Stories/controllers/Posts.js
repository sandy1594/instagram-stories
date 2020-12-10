const router = require("express").Router();

const posts = [
  {
    name: "Naren",
    post: "Image1",
  },
  {
    name: "Damon",
    post: "Image2",
  },
];

router.get("/posts", (req, res) => {
  res.json(posts);
});

module.exports = router;
