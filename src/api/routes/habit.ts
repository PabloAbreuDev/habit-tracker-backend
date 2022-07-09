import { Router } from 'express'
import { createHabitValidateRules, } from '../validators/habit'
import HabitController from '../controllers/habit'
import authMiddleware from '../middlewares/auth-middleware'
import validate from '../middlewares/valite'




const habitController = new HabitController()

const route = Router()
export default (app: Router) => {
    app.use("/habit", route)
    route.post("/", authMiddleware, createHabitValidateRules(), validate, habitController.create)
}