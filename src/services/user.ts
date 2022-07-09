import { IUser } from "../interfaces/user";
import User from "../models/user";
import bcrypt from "bcrypt";
import { CustomError } from "../api/middlewares/error-handler";
import {
    hashGenerate,
    refreshTokenGenerate,
    tokenGenerate,
} from "../utils/generators";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import config from "../config";

class UserService {
    public user: typeof User;
    constructor(user = User) {
        this.user = user
    }

    // Cria um usuário
    async create(user: IUser) {
        const user_exists = await this.user.findOne({ email: user.email });

        if (user_exists) {
            throw new CustomError("Este email já está em uso", 400);
        }

        try {
            user.verifyToken = uuidv4();
            user.password = hashGenerate(user.password);
            const result = await this.user.create(user);

            // TODO: Adicionar evento de e-mail
            console.log("E-mail event");


            return { result };
        } catch (err) {
            console.log(err);
            throw new CustomError("Não foi possível criar o usuario", 400);
        }
    }

    // Realiza login na aplicação
    async login(email: string, password: string) {
        const user = await this.user.findOne({ email });

        if (!user) {
            throw new CustomError("E-mail ou senha incorretos!", 400);
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            throw new CustomError("E-mail ou senha incorretos!", 400);
        }
        return {
            access_token: tokenGenerate({ user_id: user._id }),
            refresh_token: refreshTokenGenerate({ user_id: user._id }),
        };
    }

    // Recupera minhas informações
    async me(id: string) {
        return await this.user
            .findOne({ _id: id })
            .select("-password -verified -verifyToken");
    }

    // Recupera um token com base no refresh
    async refresh(refresh_token: string) {
        const decoded: any = jwt.verify(refresh_token, config.jwt.jwt_secret)
        if (!decoded) {
            throw new CustomError("Não autorizado!", 406);
        }
        return { access_token: tokenGenerate({ user_id: decoded.user_id }) };
    }


}
export default UserService;
