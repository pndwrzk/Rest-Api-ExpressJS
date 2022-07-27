const Joi = require("@hapi/joi");
const usersModel = require("../models/usersModel");

const createUser = async (req, res) => {
  try {
    const schema = Joi.object({
      nama: Joi.string().required(),
      username: Joi.string().required(),
      password: Joi.string().required(),
    });
    const error = schema.validate(req.body).error;
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
    return res.send(error);
  }
};

module.exports = {
  createUser,
};
