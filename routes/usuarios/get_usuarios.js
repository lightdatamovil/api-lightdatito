import { Router } from 'express';
import { performance } from 'perf_hooks';
import { logRed, logPurple, logGreen } from '../../src/funciones/logsCustom.js';
import { verifyAll } from '../../src/funciones/verifyParameters.js';

const router = Router();

router.get('/', async (req, res) => {
    const start = performance.now();
    try {
        const list = await getAllUsuarios();
        res.status(200).json({ body: list, message: 'Datos obtenidos correctamente' });
        logGreen('GET /api/usuarios: éxito al listar usuarios');
    } catch (error) {
        logRed(`Error GET /api/usuarios: ${error.stack}`);
        res.status(500).json({ message: 'Error interno' });
    } finally {
        logPurple(`GET /api/usuarios ejecutado en ${performance.now() - start} ms`);
    }
});

export default router;