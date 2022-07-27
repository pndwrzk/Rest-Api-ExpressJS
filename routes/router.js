const express = require("express");
const router = express.Router();
const foodsController = require("../controllers/foodsController");
const usersController = require("../controllers/usersController");

router.get("/foods/:id?", foodsController.getFoods);
router.post("/foods", foodsController.createFood);
router.put("/foods/:id", foodsController.updateFood);
router.delete("/foods/:id", foodsController.deleteFood);

// users route
router.post("/users", usersController.createUser);

module.exports = router;
