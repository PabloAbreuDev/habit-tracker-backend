import { Router } from 'express'
import UserController from '../controllers/user'
import validate from '../middlewares/valite'
import { loginValidateRules } from '../validators/user'

const userController = new UserController()

const route = Router()

export default (app: Router) => {
    app.use("/user", route)
    route.post("/", userController.createUser)
    route.post("/login", loginValidateRules(), validate, userController.doLogin)
}