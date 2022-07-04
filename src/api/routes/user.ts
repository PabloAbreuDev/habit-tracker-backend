import { Router } from 'express'
import UserController from '../controllers/user'
import validate from '../middlewares/valite'
import { loginValidateRules } from '../validators/user'

const app = Router()


app.post("/user", UserController.createUser)
app.post("/login", loginValidateRules(), validate, UserController.doLogin)


export default app