const sequelize = require("sequelize");
const bcrypt = require("bcrypt");

const db = require("../config/db");

const usersModel = db.define("users", {
  nama: { type: sequelize.STRING },
  username: { type: sequelize.STRING },
  password: { type: sequelize.STRING },
});

const addUser = async (user) => {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await usersModel.create({
    nama: user.nama,
    username: user.username,
    password: user.password,
  });
};

const getUserByUsername = async (username) => {
  data = await usersModel.findOne({
    where: {
      username: username,
    },
  });

  return data;
};

module.exports = {
  addUser,
  getUserByUsername,
};
