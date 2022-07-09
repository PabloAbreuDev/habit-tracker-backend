import expressLoader from "./express";
import express from "express";
import databaseConnect from "./mongo";

const startModules = async ({ app }: { app: express.Application }) => {
    databaseConnect();
    expressLoader({ app });
};

export default startModules;