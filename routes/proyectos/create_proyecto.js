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
        const newItem = await createProyecto(req.body);
        res.status(201).json({ body: newItem, message: 'Creado correctamente' });
        logGreen(`POST /api/proyectos: éxito al crear proyecto con ID ${newItem.id}`);
    } catch (error) {
        logRed(`Error POST /api/proyectos: ${error.stack}`);
        res.status(500).json({ message: 'Error interno' });
    } finally {
        logPurple(`POST /api/proyectos ejecutado en ${performance.now() - start} ms`);
    }
});

export default router;