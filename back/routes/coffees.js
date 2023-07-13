const express = require("express");
const router = express.Router();
const { createCoffee, getAllCoffees } = require("../controllers/coffees");
const multer = require("multer");
const path = require("path");
const CoffeesModel = require("../models/coffees");
const checkAuth = require("../middleware/checkAuth");

const storage = multer.diskStorage({
    destination: "./public/uploads/images",
    filename: (req, file, cb) => {
      return cb(
        null,
        `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
      );
    },
  });

  const fileFilter = (req, file, cb) => {
    if (
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

const uploadFile = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
      fileSize: 2048 * 2048 * 5,
    },
  });

router.put("/create", [uploadFile.single("photo")], createCoffee);
router.get("/", [checkAuth], getAllCoffees);

module.exports = router;