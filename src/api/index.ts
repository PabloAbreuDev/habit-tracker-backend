import { Router } from "express";
import user from "./routes/user";
import home from "./routes/home";

export default () => {
    const app = Router();
    home(app);
    user(app);
    return app;
};