const foodsModel = require("../models/foodsModel");

const joi = require("@hapi/joi");

const getFoods = async (req, res) => {
  try {
    let data;
    foodId = req.params.id;
    data = await foodsModel.getAllFoods(foodId);

    if (foodId && !data) {
      return res.status(400).json({
        status: "Fail",
        message: "Data tidak ditemukan",
      });
    }

    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const createFood = async (req, res) => {
  try {
    // validation
    const schema = joi.object({
      nama: joi.string(),
      harga: joi.number().required(),
      deskripsi: joi.string(),
    });

    const error = schema.validate(req.body).error;
    if (error)
      return res.status(402).json({
        status: "fail",
        message: error.message,
      });

    await foodsModel.addFood(req.body);
    return res.status(201).json({
      message: "Data berhasil ditambahkan",
      data: req.body,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

const updateFood = async (req, res) => {
  try {
    const idFood = req.params.id;
    await foodsModel.updateFood(idFood, req.body);
    return res.status(200).json({
      message: "Data berhasil diperbarui",
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

const deleteFood = async (req, res) => {
  try {
    const idFood = req.params.id;
    await foodsModel.deleteFood(idFood);
    return res.status(200).json({
      message: "Data berhasil dihapus",
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {
  getFoods,
  createFood,
  updateFood,
  deleteFood,
};
