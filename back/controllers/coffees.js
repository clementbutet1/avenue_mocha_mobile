require("dotenv").config();
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const moment = require("moment");
const momenttz = require("moment-timezone");
const dateFrance = momenttz.tz(Date.now(), "Europe/Paris");
const CoffeesModel = require("../models/coffees");

const createCoffee = async (req, res) => {
  const coffee = new CoffeesModel({
    titre: req.body.titre,
    ingredients: req.body.ingredients,
    description: req.body.description,
    nutrition: req.body.nutrition,
    calorie: req.body.calorie,
    proteine: req.body.proteine,
    cafeine: req.body.cafeine,
    time: req.body.time,
    price: req.body.price,
    photo: req.file.filename,
  });
  coffee.save()
    .then(() => res.status(201).json({ message: 'Coffee created' }))
    .catch(() => res.status(203).json({ error: 'error hash' }));
};

const getAllCoffees = async (req, res) => {
    try {
      let coffees = await CoffeesModel.find();
      res.status(200).json(coffees);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
};


module.exports = {
  createCoffee,
  getAllCoffees,
};
