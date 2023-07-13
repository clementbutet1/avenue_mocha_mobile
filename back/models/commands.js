const mongoose = require('mongoose');
const moment = require('moment-timezone');
const dateFrance = moment.tz(Date.now(), 'Europe/Paris');

const CommandsSchema = mongoose.Schema(
    {
        usersId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Userid",
            // id user
            autopopulate: true,
        },
        facture: {
            type: String,
            default: '',
        },
        price: {
            type: Number,
            default: 0,
        },
        old: {
            type: Boolean,
            default: false,
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
        collection: 'commands',
    },
);

CommandsSchema.index({ '$**': 'text' });
CommandsSchema.index({ token: 1 }, { unique: true });
CommandsSchema.index({ subscribed_on: 1 }, { expireAfterSeconds: 604800 });
CommandsSchema.plugin(require('mongoose-autopopulate'));

const CommandsModel = mongoose.model('commands', CommandsSchema);

module.exports = CommandsModel;