const { Schema, model } = require("mongoose");

const gymSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: [true, "El nombre del gimnasio es obligatorio"],
        },
        details: {
            type: String,
            required: [true, "Los detalles del gimnasio son obligatorios"],
        },

        location: {
            type: String,
        },

        leader: {
            type: Schema.Types.ObjectId,
            ref: "User",
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
