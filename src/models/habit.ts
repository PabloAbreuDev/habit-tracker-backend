import { Schema, model } from "mongoose";
import { IHabit } from "../interfaces/habit";

const habitSchema = new Schema<IHabit>({
    name: { type: String, required: true },
    status: { type: String, required: true, default: "ACTIVE" },
    completeDays: [{ type: Number }],
    description: { type: String },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
});

const Habit = model<IHabit>("Habit", habitSchema);

export default Habit


