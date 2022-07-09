import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
import config from "../config";

export const tokenGenerate = (content: any) => {
    return jwt.sign(
        content,
        config.jwt.jwt_secret || "12345",
        {
            expiresIn: config.jwt.jwt_expire,
        }
    );
}

export const refreshTokenGenerate = (content: any) => {
    return jwt.sign(
        content,
        config.jwt.jwt_secret || "12345",
        {
            expiresIn: config.jwt.jwt_refresh_expire,
        }
    );
}

export const hashGenerate = (text: string): string => {
    const hash = bcrypt.hashSync(text, 10);
    return hash;
};