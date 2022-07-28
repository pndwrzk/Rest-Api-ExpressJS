const sequelize = require("sequelize");

const db = require("../config/db");

const foodsModel = db.define("foods", {
  nama: { type: sequelize.STRING },
  harga: { type: sequelize.INTEGER },
  deskripsi: { type: sequelize.STRING },
});

const getAllFoods = async (id) => {
  let data;

  if (!id) {
    data = await foodsModel.findAll();
  } else {
    data = await foodsModel.findOne({
      where: {
        id: id,
      },
    });
  }

  return data;
};

const addFood = async (food) => {
  await foodsModel.create({
    nama: food.nama,
    harga: food.harga,
    deskripsi: food.deskripsi,
  });
};

const updateFood = async (id, food) => {
  await foodsModel.update(food, {
    where: {
      id: id,
    },
  });
};

const deleteFood = async (id) => {
  await foodsModel.destroy({
    where: {
      id: id,
    },
  });
};

module.exports = {
  getAllFoods,
  addFood,
  deleteFood,
  updateFood,
};
