const Joi = require("@hapi/joi");
const usersModel = require("../models/usersModel");
const userValidation = require("../middleware/userValidation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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

    const userId = user.id;
    const nama = user.nama;
    const email = user.email;

    const accessToken = await jwt.sign(
      { userId, nama, email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15s",
      }
    );

    const refreshToken = await jwt.sign(
      { userId, nama, email },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );

    await usersModel.updateRefreshToken(userId, refreshToken);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ accessToken: accessToken });
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {
  createUser,
  login,
};
