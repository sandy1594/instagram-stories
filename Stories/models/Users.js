const sequelize = require("sequelize");

const db = require("../dbConfig");

const Stories = require("./Stories");

const Users = db.define("users", {
  name: {
    type: sequelize.STRING,
    required: true,
  },
  email: {
    type: sequelize.STRING,
    required: true,
  },
  password: {
    type: sequelize.STRING,
    required: true,
  },
});

Users.associate = (models) => {
  Users.hasMany(Stories, { foreignKey: "storyid" });
};

db.sync({})
  .then(() => {
    console.log("Users Synced");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = Users;
