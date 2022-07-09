import { IUser } from "../interfaces/user";
import User from "../models/user";
import MailService from "./mail";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config";
import { CustomError } from "../api/middlewares/error-handler";

class UserService {

    public user = User;

    // Cria um usuário
    async create(user: IUser) {
        try {
            const result = await this.user.create(user)

            new MailService({
                from: "me",
                to: "other than me",
                subject: "create account",
                text: "aaaa",
                type: "verify",
            }).sendMail('VERIFY');

            return { result };
        } catch (err) {
            throw new CustomError("Não foi possível criar o usuario", 400);
        }
    }

    // Realiza login na aplicação
    async login(email: string, password: string) {
        const user = await this.user.findOne({ email })

        if (!user) {
            throw new CustomError("E-mail ou senha incorretos!", 400);
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            throw new CustomError("E-mail ou senha incorretos!", 400);
        }

        const token = jwt.sign(
            { user_id: user._id },
            config.jwt.jwt_secret || "12345",
            {
                expiresIn: config.jwt.jwt_expire,
            }
        );

        return { token }

    }

    // Atualiza um cliente
    async update(schema: IUser, id: string) {
        try {
            const result = await User.updateOne({ _id: id }, schema)
            return { result }
        } catch (err) {
            throw new CustomError("Não foi possível atualizar o usuario", 400);
        }
    }
}
export default UserService