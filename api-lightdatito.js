import express, { json, urlencoded } from 'express';
import { logBlue, logPurple, logRed } from './src/funciones/logsCustom.js';
import cors from 'cors';
import allRoutes from './routes/exports.js';
import { Status } from './models/status.js';
import { performance } from 'perf_hooks';
import 'dotenv/config';

const PORT = 13000;
const app = express();

// Middlewares
app.use(json({ limit: '50mb' }));
app.use(urlencoded({ limit: '50mb', extended: true }));
app.use(cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

// Ruta de prueba
app.post('/api/testapi', async (req, res) => {
    const startTime = performance.now();
    const endTime = performance.now();
    logPurple(`Tiempo de ejecución: ${endTime - startTime} ms`);
    res.status(Status.ok).json({ message: 'API funcionando correctamente' });
});

// Cargar rutas principales
try {
    app.use('/api', allRoutes);
} catch (err) {
    logRed('❌ Error cargando rutas:', err);
}

// Iniciar servidor
app.listen(PORT, () => {
    logBlue(`🟢 Worker ${process.pid} escuchando en el puerto ${PORT}`);
});

// Captura de errores silenciosos
process.on('unhandledRejection', reason => {
    console.error('❌ unhandledRejection:', reason);
});
process.on('uncaughtException', err => {
    console.error('❌ uncaughtException:', err);
});
