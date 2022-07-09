import { Request, Response } from "express";
import HabitService from "../../services/habit";
import UserService from "../../services/user";

class UserController {
    public userService: UserService
    public habitService: HabitService

    constructor(userService = new UserService(), habitService = new HabitService()) {
        this.userService = userService
        this.habitService = habitService
    }

    createUser = async (req: Request, res: Response) => {
        const { email, firstName, lastName, password, avatar } = req.body
        const result = await this.userService.create({ email, firstName, lastName, password, avatar })
        return res.status(201).json(result)
    }

    doLogin = async (req: Request, res: Response) => {
        const { email, password } = req.body
        const result = await this.userService.login(email, password)
        return res.status(200).json(result)
    }

    me = async (req: Request, res: Response) => {
        const { user } = req
        const result = await this.userService.me(user.user_id)
        return res.status(200).json(result)
    }

    refresh = async (req: Request, res: Response) => {
        const { refresh_token } = req.body
        const result = await this.userService.refresh(refresh_token)
        return res.status(200).json(result)
    }

    mark = async (req: Request, res: Response) => {
        const { data_timestamp } = req.body
        const { id } = req.params
        const result = await this.habitService.markComplete(id, req.user.user_id, data_timestamp)
        return res.status(200).json(result)
    }
}


export default UserController;