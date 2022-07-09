import { Router } from "express";
import user from "./routes/user";
import home from "./routes/home";
import habit from "./routes/habit";

export default () => {
    const app = Router();
    home(app);
    user(app);
    habit(app)
    return app;
};