import express from 'express'
import config from './config';
import startModules from './loaders';


const app = express();

// Inicializa a aplicação
app.listen(config.port, async () => {
    await startModules({ app })
})
