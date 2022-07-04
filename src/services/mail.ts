import nodemailer from "nodemailer";
import { CustomError } from "../api/middlewares/error-handler";
import config from "../config";
import verifyTemplate from "../helpers/verify";
import { IMail } from "../interfaces/email";


class MailService {
    transporter = nodemailer.createTransport({
        //@ts-ignore
        host: config.mail.smtp_host,
        port: config.mail.smtp_port,
        secure: false,
        auth: {
            user: config.mail.smtp_user,
            pass: config.mail.smtp_pass,
        },
    });
    mail: IMail

    constructor(mail: IMail) {
        this.mail = mail
    }

    async sendMail(option: string) {
        try {
            switch (option) {
                case 'VERIFY':
                    await this.transporter.sendMail({
                        from: this.mail.from,
                        to: this.mail.to,
                        subject: this.mail.subject,
                        text: this.mail.text,
                        html: verifyTemplate(this.mail.text),
                    });
                    break;
                default:
                    console.log("Selecione uma operação")
            }
        } catch (err) {
            throw new CustomError("Erro ao enviar e-mail", 400);
        }

    }


}

export default MailService