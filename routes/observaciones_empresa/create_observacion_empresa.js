import { Router } from 'express';
import { performance } from 'perf_hooks';
import { logRed, logPurple, logGreen } from '../../src/funciones/logsCustom.js';
import { verifyAll } from '../../src/funciones/verifyParameters.js';

const router = Router();

router.post('/', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, [], []);
    if (missing.length) return res.status(400).json({ message: `Faltan parámetros: ${missing.join(', ')}` });
    try {
        const newItem = await createObservacionEmpresa(req.body);
        res.status(201).json({ body: newItem, message: 'Creado correctamente' });
        logGreen(`POST /api/observaciones-empresa: éxito al crear observación con ID ${newItem.id}`);
    } catch (error) {
        logRed(`Error POST /api/observaciones-empresa: ${error.stack}`);
        res.status(500).json({ message: 'Error interno' });
    } finally {
        logPurple(`POST /api/observaciones-empresa ejecutado en ${performance.now() - start} ms`);
    }
});

export default router;