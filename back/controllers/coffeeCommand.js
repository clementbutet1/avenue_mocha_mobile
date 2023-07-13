require("dotenv").config();
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const moment = require("moment");
const momenttz = require("moment-timezone");
const dateFrance = momenttz.tz(Date.now(), "Europe/Paris");
const CoffeCommandModel = require("../models/coffeeCommand");
const CommandsModel = require("../models/commands");

const createCoffeeCommand = async (req, res) => {
  let _id = 0;
  const commandCheck = await CommandsModel.find({
    userId: { $in: [req.body.userId] },
  });
  for (let i = 0; i < commandCheck.length; i++) {
    if (commandCheck[i].old === false) {
      _id = commandCheck[i]._id;
    }
  }
  const CoffeeCommand = new CoffeCommandModel({
    commandId: _id,
    userId: req.body.userId,
    coffeeId: req.body.coffeeId,
    quantity: req.body.quantity,
    temperature: req.body.temperature,
    size: req.body.size,
    glass: req.body.glass,
    cream: req.body.cream,
    sugar: req.body.sugar,
  });
  CoffeeCommand.save()
    .then(() => res.status(201).json({ message: 'Coffee command created' }))
    .catch(() => res.status(203).json({ error: 'error creation' }));
};

const remove = async (req, res) => {
  try {
    const deleted = await CoffeCommandModel.deleteOne({ _id: req.params.coffe_id });
    res.status(200).json({
      message: "CoffeeCommand been deleted",
      data: deleted,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getShopList = async (req, res) => {
  let _id = 0;
  const commandCheck = await CommandsModel.find({
    userId: { $in: [req.params.user_id] },
  });
  for (let i = 0; i < commandCheck.length; i++) {
    if (commandCheck[i].old === false) {
      _id = commandCheck[i]._id;
    }
  }
  try {
  const allShopList = await CoffeCommandModel.find({
    commandId: { $eq: [_id] },
  })
    res.status(200).json(allShopList);
  } catch (error) {
    res.status(203).json({ message: "Nothing" });
  }
};

module.exports = {
  createCoffeeCommand,
  remove,
  getShopList,
};