import express from "express";
import cors from "cors";
import routes from "../api/";
import errorHandler from "../api/middlewares/error-handler";
require("express-async-errors");

const expressLoader = ({ app }: { app: express.Application }) => {
    app.use(cors());
    app.use(express.json());
    app.use(routes());
    app.use(errorHandler);
    console.log("Express connected");
};
export default expressLoader;