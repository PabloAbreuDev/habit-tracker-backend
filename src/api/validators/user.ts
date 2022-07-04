import { body } from "express-validator";

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
