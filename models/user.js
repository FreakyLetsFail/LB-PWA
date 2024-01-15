import { Schema, model, models } from "mongoose";

const UserSchema = new Schema ({
    email: {
        type: String,
        unique: [true, "Email already exists!"],
        required: [true, "Email is required!"],
    },
    username: {
        type: String,
        unique: [true, "User already exists!"],
        required: [true, 'Username is required!'],
        match: [/^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._äöüÄÖÜß]+(?<![_.])$/, "Username invalid, it should contain 4-20 alphanumeric letters and be unique!"]
    },
    password: {
        type: String,
        required: [false, "Password is required"]
    },
    image: {
        type: String,
    },
    userlevel: {
        type: Number,
        min: 1,
        max: 4,
        required: [false, "Userlevel is required"]
    },
    verbindungsid: {
        type: Schema.Types.ObjectId,
        ref: 'Verbindung',
        required: [false, "Verbindungsid is required!"]
    }
});

const User = models.User || model("User", UserSchema, "users");

export default User;
