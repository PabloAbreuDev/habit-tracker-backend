import { Request, Response, Router } from 'express'
import config from '../../config'

const route = Router()

export default (app: Router) => {
    app.use("/", route)
    route.get("/", (req: Request, res: Response) => {
        return res.status(200).json({ message: `Api is running at port ${config.port}` })
    })
}