const express = require("express");
const router = express.Router();
const foodsController = require("../controllers/foodsController");
const usersController = require("../controllers/usersController");
const verifyToken = require("../middleware/verifyToken");

router.get("/foods/:id?", verifyToken, foodsController.getFoods);
router.post("/foods", foodsController.createFood);
router.put("/foods/:id", foodsController.updateFood);
router.delete("/foods/:id", foodsController.deleteFood);

// users route
router.post("/users", usersController.createUser);
router.post("/login", usersController.login);

module.exports = router;
