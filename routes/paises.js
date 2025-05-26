import { Router } from 'express';
import { performance } from 'perf_hooks';
import { logRed, logPurple, logGreen } from '../src/funciones/logsCustom.js';
import CustomException from '../models/custom_exception.js';
import { getAllPaises } from '../controllers/paises/get_all_paises.js';

const router = Router();

// Crear observación de logística
router.get('/', async (req, res) => {
    const start = performance.now();
    try {
        const list = await getAllPaises();
        res.status(200).json({ body: list, message: 'Datos obtenidos correctamente' });
        logGreen('GET /api/paises: éxito al listar países');
    } catch (err) {
        if (err instanceof CustomException) {
            logRed('Error 400 GET /api/paises:', err.toJSON());
            return res.status(400).json(err.toJSON());
        }
        const fatal = new CustomException({
            title: 'Internal Server Error',
            message: err.message,
            stack: err.stack
        });
        logRed('Error 500 GET /api/paises:', fatal.toJSON());
        res.status(500).json(fatal.toJSON());
    } finally {
        logPurple(
            `GET /api/paises ejecutado en ${performance.now() - start} ms`
        );
    }
});

// Exportar el router
export default router;