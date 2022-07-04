import express from 'express'
import config from './config';
import databaseConnect from './database';
import home from './api/routes/home';
import errorHandler from './api/middlewares/error-handler';

const app = express();

app.use(express.json())

// Routes
app.use(home)

// Error handler
app.use(errorHandler)

// Inicializa a aplicação
app.listen(config.port, () => {
    databaseConnect()
})
