import { isValid } from "date-fns";
import { body, param } from "express-validator";
import Habit from "../../models/habit";

export const createHabitValidateRules = () => {
    return [
        body("name").trim().isString().withMessage("Informe um nome válido").isLength({ min: 3, max: 15 }).withMessage("Informe o nome do hábito entre 3 e 15 caracteres"),

        body("description")
            .if(body("description").exists())
            .isString()
            .withMessage("Informe a descrição")
            .isLength({ min: 3, max: 15 })
            .withMessage("Informe uma descrição entre 3 e 15 caracteres"),
    ];
};
export const markValidateRules = () => {
    return [

        param("id").custom(async (value) => {
            const exist = await Habit.findById(value)
            if (!exist) {
                throw new Error("Hábito não encontrado")
            }
        }),

        body("data_timestamp").isNumeric().withMessage("Informe um data válida").custom(async (value) => {
            if (!isValid(value)) {
                throw new Error("Data inválida")
            }
        })
    ]
}