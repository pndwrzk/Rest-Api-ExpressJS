const Joi = require("@hapi/joi");
const usersModel = require("../models/usersModel");
const userValidation = require("../middleware/userValidation");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  try {
    const error = userValidation(req.body);
    if (error) {
      return res.status(402).json({
        status: "fail",
        message: error.message,
      });
    }
    await usersModel.addUser(req.body);
    return res.status(201).json({
      status: "success",
      message: "data user berhasil di tambahkan",
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

const login = async (req, res) => {
  try {
    const schema = Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
    });

    const error = schema.validate(req.body).error;
    if (error) {
      return res.status(402).json({
        status: "failed",
        massage: error.message,
      });
    }

    const user = await usersModel.getUserByUsername(req.body.username);
    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "username tidak terdaftar dalam database",
      });
    }

    const resultLogin = await bcrypt.compare(req.body.password, user.password);
    if (!resultLogin) {
      return res.status(400).json({
        status: "fail",
        message: "password yang anda masukan salah",
      });
    }
    console.log("user succes login");
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {
  createUser,
  login,
};
