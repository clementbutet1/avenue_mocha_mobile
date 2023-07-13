require("dotenv").config();
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const moment = require("moment");
const momenttz = require("moment-timezone");
const dateFrance = momenttz.tz(Date.now(), "Europe/Paris");
const CommandsModel = require("../models/commands");
const CoffeCommandModel = require("../models/coffeeCommand");

const createCommand = async (req, res) => {
  const commandCheck = await CommandsModel.find({
    userId: { $in: [req.body.userId] },
  });
  for (let i = 0; i < commandCheck.length; i++) {
    if (commandCheck[i].old === false) {
      return (res.status(200).json("Shop Already Create"));
    }
  }
  try {
    const CommandList = new CommandsModel({
      usersId: req.body.usersId
    });
    const CommandListB = await CommandList.save();
    return (res.status(200).json(CommandListB));
  } catch (err) {
    return (res.status(500).json({ err: "error on creation" }));
  }
};

const getAllOldCommand = async (req, res) => {
  const commandCheck = await CommandsModel.find({
    userId: { $in: [req.params.user_id] },
  });
  let tab = [];
  for (let i = 0; i < commandCheck.length; i++) {
    if (commandCheck[i].old === true) {
      tab.push(commandCheck[i]);
    }
  }
  let new_tab = [];
  for (let j = 0; j < tab.length; j++) {
    const allShopList = await CoffeCommandModel.find({
      commandId: { $eq: [tab[j]._id] },
    })
    let allcoffee = [];
    for (let k = 0; k < allShopList.length; k++) {
      let obj = {
        titre: allShopList[k].coffeeId.titre,
        price: allShopList[k].coffeeId.price,
        photo: allShopList[k].coffeeId.photo,
        quantity: allShopList[k].quantity,
        size: allShopList[k].size,
        glass: allShopList[k].glass,
        cream: allShopList[k].cream,
        sugar: allShopList[k].sugar,
      };
      allcoffee.push(obj);
    }
    new_tab.push({"command": tab[j], "allCoffee": allcoffee});
  }
  return (res.status(200).json(new_tab));
};

const getOneShopActive = async (req, res) => {
  const commandCheck = await CommandsModel.find({
    userId: { $in: [req.params.user_id] },
  });
  let tab = [];
  for (let i = 0; i < commandCheck.length; i++) {
    if (commandCheck[i].old === false) {
      return (res.status(200).json(commandCheck[i]));
    }
  }
};

const updateShopId = async (req, res) => {
  try {
    await CommandsModel.updateMany(
      { _id: req.params.id },
      { $set: req.body }
    ).exec();
    res.status(200).json({ message: "Command good" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};



module.exports = {
  createCommand,
  getAllOldCommand,
  getOneShopActive,
  updateShopId
};
