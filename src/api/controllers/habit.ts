import { Request, Response } from "express";
import HabitService from "../../services/habit";

class HabitController {
    public habitService: HabitService;
    constructor(habitService = new HabitService()) {
        this.habitService = habitService;
    }

    create = async (req: Request, res: Response) => {
        const { name, description } = req.body;

        const result = await this.habitService.create({
            name,
            description,
            owner: req.user.user_id,
        });

        return res.status(201).json(result);
    };

    delete = async (req: Request, res: Response) => {
        const { id } = req.params
        const result = await this.habitService.deleteHabit(id, req.user.user_id)
        return res.status(200).json(result);
    }
}

export default HabitController;
