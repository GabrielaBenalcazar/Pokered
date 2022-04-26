const { Schema, model } = require("mongoose");

const userSchema = new Schema(
    {
        username: {
            type: String,
            trim: true,
            required: true,
            minlength: 3,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
        },
        role: {
            type: String,
            enum: ["ADMIN", "TRAINER", "LEADER"],
            default: "TRAINER",
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
const User = model("User", userSchema);

module.exports = User;
