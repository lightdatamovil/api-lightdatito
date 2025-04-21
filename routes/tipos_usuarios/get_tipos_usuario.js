import { Router } from 'express';
import { performance } from 'perf_hooks';
import { logRed, logPurple, logGreen } from '../../src/funciones/logsCustom.js';
import { verifyAll } from '../../src/funciones/verifyParameters.js';

const router = Router();

router.get('/', async (req, res) => {
    const start = performance.now();
    try {
        const list = await getAllTipoUsuario();
        res.status(200).json({ body: list, message: 'Datos obtenidos correctamente' });
        logGreen('GET /api/tipo-usuario: éxito al listar tipos');
    } catch (error) {
        logRed(`Error GET /api/tipo-usuario: ${error.stack}`);
        res.status(500).json({ message: 'Error interno' });
    } finally {
        logPurple(`GET /api/tipo-usuario ejecutado en ${performance.now() - start} ms`);
    }
});

export default router;