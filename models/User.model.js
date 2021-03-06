const { Schema, model } = require("mongoose");

const userSchema = new Schema(
    {
        username: {
            type: String,
            trim: true,
            required: [true, "El nombre de usuario es obligatorio"],
            minlength: 3,
        },
        email: {
            type: String,
            required: [true, "El email es obligatorio"],
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
            default: "https://i.stack.imgur.com/34AD2.jpg",
        },
        pokemons: {
            type: [String],
            default: ["bulbasaur", "charmander", "squirtle"],
        },
    },
    {
        timestamps: true,
    }
);
const User = model("User", userSchema);

User.syncIndexes();

module.exports = User;
