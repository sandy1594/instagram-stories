const sequelize = require("sequelize");

const db = require("../dbConfig");

const Users = require("./Users");

const Stories = db.define("stories", {
  link: {
    type: sequelize.STRING,
    required: true,
  },
});

Stories.associate = (models) => {
  Stories.belongsTo(Users, { foreignKey: "userid" });
};

db.sync({})
  .then(() => {
    console.log("Stories Synced");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = Stories;
