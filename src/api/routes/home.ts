import { Request, Response, Router } from 'express'
import config from '../../config'

const home = Router()

home.get("/", (req: Request, res: Response) => {
    return res.status(200).json({ message: `Api is running at port ${config.port}` })
})

export default home