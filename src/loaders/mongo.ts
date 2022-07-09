import { connect } from "mongoose";
import config from "../config";

const databaseConnect = () => {
    try {
        //@ts-ignore
        connect(config.database_url);
        console.log(`Database connected at ${config.database_url}`)
    } catch (err) {
        console.log(err)
    }
}

export default databaseConnect
