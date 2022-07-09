import { Router } from 'express'
import UserController from '../controllers/user'
import authMiddleware from '../middlewares/auth-middleware'
import validate from '../middlewares/valite'
import { markValidateRules } from '../validators/habit'
import { createValidateRules, loginValidateRules, } from '../validators/user'
const userController = new UserController()

const route = Router()

export default (app: Router) => {
    app.use("/user", route)
    route.post("/", createValidateRules(), validate, userController.createUser)
    route.post("/login", loginValidateRules(), validate, userController.doLogin)
    route.get("/me", authMiddleware, userController.me)
    route.post("/refresh", userController.refresh)
    route.post("/mark/:id", authMiddleware, markValidateRules(), validate, userController.mark)
}