const mongoose = require('mongoose');
const moment = require('moment-timezone');
const dateFrance = moment.tz(Date.now(), 'Europe/Paris');

const CoffeesCommandSchema = mongoose.Schema(
    {
        commandId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "commands",
            autopopulate: true,
            index: true
        },
        coffeeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "coffees",
            autopopulate: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            autopopulate: true,
        },
        typeof: {
            type: String,
            default: '',
        },
        quantity: {
            type: Number,
            default: null,
        },
        temperature: {
            type: Boolean,
            default: null,
        },
        size: {
            type: String,
            default: '',
        },
        glass: {
            type: String,
            default: '',
        },
        cream: {
            type: String,
            default: '',
        },
        sugar: {
            type: String,
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
        collection: 'coffeecommands',
    },
);

CoffeesCommandSchema.index({ '$**': 'text' });
CoffeesCommandSchema.index({ token: 1 }, { unique: true });
CoffeesCommandSchema.index({ subscribed_on: 1 }, { expireAfterSeconds: 604800 });
CoffeesCommandSchema.plugin(require('mongoose-autopopulate'));

const CoffeCommandModel = mongoose.model('coffeecommands', CoffeesCommandSchema);

module.exports = CoffeCommandModel;