import { Request, Response } from "express";
import UserService from "../../services/user";

class UserController {
    public userService: UserService

    constructor(userService = new UserService()) {
        this.userService = userService
    }

    createUser = async (req: Request, res: Response) => {
        const { email, firstName, lastName, password, avatar } = req.body
        try {
            const result = await this.userService.create({ email, firstName, lastName, password, avatar })
            return res.status(201).json(result)
        } catch (err) {
            return res.status(400).json({ message: "Erro ao cadastrar usuário" })
        }
    }

    doLogin = async (req: Request, res: Response) => {
        const { email, password } = req.body
        const result = await this.userService.login(email, password)
        return res.status(200).json(result)

    }
}


export default UserController;