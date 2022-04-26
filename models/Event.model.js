const { Schema, model } = require("mongoose");

const eventSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },
        details: {
            type: String,
            required: true,
        },
        location: {
            type: String,
        },
        date: {
            type: Date,
            default: Date.now
        },
        img: {
            type: String,
            default: "URL", //----- some URL------//
        },
        pokemons: [String],
    },

    {
        timestamps: true,
    }
);

const Event = model("Event", eventSchema);

module.exports = Event;
