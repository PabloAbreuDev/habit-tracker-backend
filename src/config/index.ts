import dotenv from "dotenv";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();

if (envFound.error) {
    throw new Error("Erro ao carregar variáveis de ambiente");
}

export default {
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    mail: {
        smtp_host: process.env.SMTP_HOST,
        smtp_port: process.env.SMTP_PORT,
        smtp_user: process.env.SMTP_USER,
        smtp_pass: process.env.SMTP_PASS,
    },
    jwt: {
        jwt_secret: process.env.JWT_SECRET || '123',
        jwt_expire: process.env.JWT_EXPIRE,
        jwt_refresh_expire: process.env.JWT_REFRESH_EXPIRE
    },
};
