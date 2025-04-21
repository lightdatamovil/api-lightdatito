import { Router } from 'express';
import { performance } from 'perf_hooks';
import { logRed, logPurple, logGreen } from '../../src/funciones/logsCustom.js';
import { verifyAll } from '../../src/funciones/verifyParameters.js';

const router = Router();

router.get('/', async (req, res) => {
    const start = performance.now();
    try {
        const list = await getAllPuestos();
        res.status(200).json({ body: list, message: 'Datos obtenidos correctamente' });
        logGreen('GET /api/puestos: éxito al listar puestos');
    } catch (error) {
        logRed(`Error GET /api/puestos: ${error.stack}`);
        res.status(500).json({ message: 'Error interno' });
    } finally {
        logPurple(`GET /api/puestos ejecutado en ${performance.now() - start} ms`);
    }
});

export default router;