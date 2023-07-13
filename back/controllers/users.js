require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const generator = require("generate-password");
const moment = require("moment");
const momenttz = require("moment-timezone");
const dateFrance = momenttz.tz(Date.now(), "Europe/Paris");
const UserModel = require("../models/users");


const createUser = async (req, res) => {
  const existingUser = await UserModel.find({ email: req.body.email });
  if (existingUser.length !== 0) {
    return res.status(203).json({ error: "The user already exist" });
  }
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new UserModel({
      email: req.body.email,
      password: hash,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      phone: req.body.phone
    });
    user.save()
      .then(() => res.status(201).json({ message: 'User created' }))
      .catch(() => res.status(203).json({ error: 'error hash' }));
  }).catch(() => res.status(203).json({ error: "Problem with password" }));
};

const createUserGoogle = async (req, res) => {
  const existingUser = await UserModel.find({ email: req.body.email });
  if (existingUser.length !== 0) {
    return res.status(203).json({ error: "The user already exist" });
  }
  const user = new UserModel({
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    tokenGoogle: req.body.tokenGoogle
  });
  user.save()
    .then(() => res.status(201).json({ message: 'User created' }))
    .catch(error => res.status(400).json({ error: "error google" }) && console.log(error));
};

const loginGoogle = async (req, res) => {
  UserModel.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      return res.status(203).json({ error: 'User not found Google' });
    }
    if (user.tokenGoogle && req.body.tokenGoogle) {
      return (getToken(user, res));
    } else {
      return res.status(203).json({ error: 'User not found Google' });
    }

  })
    .catch(error => res.status(500).json({ error }));
};

const login = async (req, res) => {
  UserModel.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(203).json({ error: 'User not found' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(203).json({ error: 'Password incorrect' });
          }
          return (getToken(user, res));
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

const getToken = async (user, res) => {
  const token = jwt.sign({
    email: user.email,
    userId: user._id,
    firstname: user.firstname,
    lastname: user.lastname,
  },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
  res.status(200).json({
    message: "Auth successful",
    user,
    token: token,
  });
};

const getUserById = async (req, res) => {
  try {
    const user = await UserModel.find({ _id: req.params.user_id });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const update = async (req, res) => {
  try {
    let data = {
      ...req.body,
      updatedAt: Date.now(),
      lastModified: Date.now(),
    };
    delete data.password;
    await UserModel.updateOne(
      { _id: req.params.user_id },
      { $set: data }
    ).exec();
    res.status(200).json(req.body);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const updatePassword = (req, res) => {
  try {
    UserModel.findOne({ _id: req.params.user_id })
      .exec()
      .then(async (user) => {
        user.password = await bcrypt.hash(req.body.password, 10);
        const emptyString = "";
        user = _.extend(user, user.password, emptyString);
        user.save((err, result) => {
          if (err) {
            throw err;
          } else {
            res
              .status(200)
              .json({ message: "Your password has been changed." });
          }
        });
      })
      .catch((error) => {
        res.status(500).json({ message: `Error : ${error}` });
      });
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateProfilPicture = async (req, res) => {
    try {
        await UserModel.updateOne(
          { _id: req.params.user_id },
          {   $set: {
              profilepic: req.file.filename,
              updatedAt: Date.now(),
              lastModified: Date.now(),
            },
          }
        ).exec();
        return res.status(200).json({message: "Update success"});
    } catch (err) {
      return res.status(500).json({ message: err });
    }
};

module.exports = {
  createUser,
  createUserGoogle,
  loginGoogle,
  getUserById,
  login,
  update,
  updatePassword,
  updateProfilPicture,
};
