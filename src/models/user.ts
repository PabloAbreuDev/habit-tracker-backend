import { Schema, model } from "mongoose";
import { IUser } from "../interfaces/user";

const userSchema = new Schema<IUser>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: String,
    password: { type: String, required: true },
    verifyToken: { type: String, required: true },
    verified: { type: Boolean, default: false },
    habits: [{
        type: Schema.Types.ObjectId,
        ref: "Habit",
    }]
});

const User = model<IUser>("User", userSchema);

export default User


