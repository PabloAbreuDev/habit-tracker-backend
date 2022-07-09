import { CustomError } from "../api/middlewares/error-handler";
import { IHabit } from "../interfaces/habit";
import Habit from "../models/habit";
import User from "../models/user";

class HabitService {
    public habit = Habit
    public user = User

    // Cria um hábito
    async create(habit: IHabit) {
        try {
            const result = await this.habit.create(habit)
            await this.user.updateOne({ _id: result.owner }, { $push: { habits: result._id } }, { new: true })
            return { result }
        } catch (err) {
            console.log(err);
            throw new CustomError("Não foi possível criar o hábito", 400);
        }
    }

    // Marca um dia como concluído
    async markComplete(habit: string, user_id: string, day: number) {
        console.log({ habit, user_id, day })
        try {
            const result = await this.habit.findOneAndUpdate({ _id: habit, owner: user_id }, { $push: { completeDays: day } }, { new: true });
            return { result };
        } catch (err) {
            throw new CustomError("Houve um erro ao concluir a ação!", 400);
        }
    }

}

export default HabitService