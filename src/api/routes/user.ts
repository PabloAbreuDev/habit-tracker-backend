import { Router } from 'express'
import UserController from '../controllers/user'

const app = Router()


app.post("/user", UserController.createUser)


export default app