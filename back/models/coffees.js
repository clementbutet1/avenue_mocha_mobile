const mongoose = require('mongoose');
const moment = require('moment-timezone');
const dateFrance = moment.tz(Date.now(), 'Europe/Paris');

const Coffees = mongoose.Schema(
    {
        photo: {
            type: String,
            default: '',
        },
        titre: {
            type: String,
            default: '',
        },
        ingredients: {
            type: String,
            default: '',
        },
        description: {
            type: String,
            default: '',
        },
        nutrition: {
            type: String,
            default: '',
        },
        calorie: {
            type: Number,
            default: '',
        },
        proteine: {
            type: Number,
            default: '',
        },
        time: {
            type: Number,
            default: '',
        },
        price: {
            type: Number,
            default: '',
        },
        cafeine: {
            type: Number,
            default: '',
        },
        price: {
            type: Number,
            default: '',
        },
        createdAt: {
            type: Date,
            default: dateFrance,
        },
        updatedAt: {
            type: Date,
        },
    },
    {
        collection: 'coffees',
    },
);

Coffees.index({ '$**': 'text' });
Coffees.index({ token: 1 }, { unique: true });
Coffees.index({ subscribed_on: 1 }, { expireAfterSeconds: 604800 });
Coffees.plugin(require('mongoose-autopopulate'));

const CoffeesModel = mongoose.model('coffees', Coffees);

module.exports = CoffeesModel;