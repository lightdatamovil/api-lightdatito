import express, { json, urlencoded } from 'express';
import { logBlue, logPurple, logRed } from './src/funciones/logsCustom.js';
import cors from 'cors';
import allRoutes from './routes/exports.js';
import { Status } from './models/status.js';
import { performance } from 'perf_hooks';

import 'dotenv/config';

const PORT = 13000;

const app = express();
app.use(json({ limit: '50mb' }));
app.use(urlencoded({ limit: '50mb', extended: true }));
app.use(cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.post('/api/testapi', async (req, res) => {
    const startTime = performance.now();
    const endTime = performance.now();
    logPurple(`Tiempo de ejecución: ${endTime - startTime} ms`)
    res.status(Status.ok).json({ message: 'API funcionando correctamente' });
});

(async () => {
    try {
        app.use('/api', allRoutes);
        app.listen(PORT, () => {
            logBlue(`Worker ${process.pid} escuchando en el puerto ${PORT}`);
        });
    } catch (err) {
        logRed('Error al iniciar el servidor:', err);
    }
})();


// todo cambiar la tabla paises con un update por lta de logistica en un pais