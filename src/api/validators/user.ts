import { isValid } from "date-fns";
import { body } from "express-validator";
import Habit from "../../models/habit";

export const loginValidateRules = () => {
    return [
        body("email").isEmail().withMessage("Informe um e-mail válido"),

        body("password")
            .isString()
            .withMessage("Informe uma senha")
            .isLength({ min: 3, max: 15 })
            .withMessage("Informe um password que tenha entre 3 e 15 caracteres"),
    ];
};

export const createValidateRules = () => {
    return [
        body("firstName").trim().isString().withMessage("Informe o primeiro nome").isLength({ min: 3, max: 30 }).withMessage("Informe um nome que tenha entre 3 e 30 caracteres"),

        body("lastName").trim().isString().withMessage("Informe o sobrenome").isLength({ min: 3, max: 30 }).withMessage("Informe um sobrenome que tenha entre 3 e 30 caracteres"),

        body("email").isEmail().withMessage("Informe um e-mail válido"),

        body("password")
            .isString()
            .withMessage("Informe uma senha")
            .isLength({ min: 3, max: 15 })
            .withMessage("Informe um password que tenha entre 3 e 15 caracteres"),
    ];
};

