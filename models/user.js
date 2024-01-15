import { Schema, model, models } from "mongoose";

const UserSchema = new Schema ({
    email: {
        type: String,
        unique: [true, "email already exists!"],
        required: [true, "Email is required!"],
    },
    username: {
        type: String,
        required: [true, 'Username is required!'],
        match: [/^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._äöüÄÖÜß]+(?<![_.])$/, "Username invalid, it should contain 4-20 alphanumeric letters and be unique!"]
    },
    image: {
        type: String,
    },
    userlevel:{
        type: Number,
    }
});

const User = models.User || model("User", UserSchema, "users");

export default User; 