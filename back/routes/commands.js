const express = require("express");
const router = express.Router();
const { createCommand, getAllOldCommand, getOneShopActive, updateShopId} = require("../controllers/commands");
const multer = require("multer");
const path = require("path");
const CommandsModel = require("../models/commands");
const checkAuth = require("../middleware/checkAuth");

router.post("/create", [checkAuth], createCommand);
router.get("/allold/:user_id", [checkAuth], getAllOldCommand);
router.get("/activeshop/:user_id", [checkAuth], getOneShopActive);
router.put("/update/:id", [checkAuth], updateShopId);

module.exports = router;