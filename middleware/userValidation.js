const Joi = require("@hapi/joi");

const validation = (data) => {
  const schema = Joi.object({
    nama: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
  });

  const error = schema.validate(data).error;
  return error;
};

module.exports = validation;
