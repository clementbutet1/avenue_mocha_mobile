const express = require("express");
const router = express.Router();
const { createCoffeeCommand, remove, getShopList } = require("../controllers/coffeeCommand");
const multer = require("multer");
const path = require("path");
const CoffeCommandModel = require("../models/coffeeCommand");
const checkAuth = require("../middleware/checkAuth");

router.post("/create", [checkAuth], createCoffeeCommand);

router.delete('/rm/:coffe_id', [checkAuth], remove);

router.get('/shoplist/:user_id', [checkAuth], getShopList);

module.exports = router;