import { Request, Response } from "express";
import User from "../../models/user";
import UserService from "../../services/user";

class UserController {
    constructor(private user: UserService) {
    }

    async createUser(req: Request, res: Response) {
        const { email, firstName, lastName, password, avatar } = req.body
        try {
            const result = await this.user.create({ email, firstName, lastName, password, avatar })
            return res.status(201).json(result)
        } catch (err) {
            return res.status(400).json({ message: "Erro ao cadastrar usuário" })
        }
    }

    async doLogin(req: Request, res: Response) {
        const { email, password } = req.body
        try {
            const result = await this.user.login(email, password)
            return res.status(200).json(result)
        } catch (err) {
            return res.status(404).json(err)
        }
    }
}


export default new UserController(new UserService(User))