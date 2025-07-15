import express, { json, urlencoded } from 'express';
import cluster from 'cluster';
import { logBlue, logPurple, logRed } from './src/funciones/logsCustom.js';
import cors from 'cors';
import allRoutes from './routes/exports.js';
import { Status } from './models/status.js';


const numCPUs = 2;
const PORT = 13000;
if (cluster.isPrimary) {
    logBlue(`Proceso master ${process.pid} ejecutándose...`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    // eslint-disable-next-line no-unused-vars
    cluster.on('exit', (worker, code, signal) => {
        logBlue(`Worker ${worker.process.pid} murió, reiniciando...`);
        cluster.fork();
    });
} else {
    const app = express();
    app.use(json({ limit: '50mb' }));
    app.use(urlencoded({ limit: '50mb', extended: true }));
    app.use(json());
    app.use(
        cors({
            origin: "*",
            methods: ["GET", "POST"],
            allowedHeaders: ["Content-Type", "Authorization"],
        })
    );
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
}
