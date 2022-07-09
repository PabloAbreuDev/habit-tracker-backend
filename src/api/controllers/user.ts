import { Request, Response } from "express";
import UserService from "../../services/user";

class UserController {
    public userService: UserService

    constructor(userService = new UserService()) {
        this.userService = userService
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
}


export default UserController;