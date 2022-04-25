const { Schema, model } = require("mongoose");

const gymSchema = new Schema(
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

        leader: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },

        img: {
            type: String,
            default: "URL", //----- some URL------//
        },
    },

    {
        timestamps: true,
    }
);

const Gym = model("Gym", gymSchema);

module.exports = Gym;
