import { Router } from 'express';
import { performance } from 'perf_hooks';
import { logRed, logPurple, logGreen } from '../../src/funciones/logsCustom.js';
import { verifyAll } from '../../src/funciones/verifyParameters.js';

const router = Router();

router.post('/', async (req, res) => {
    const start = performance.now();
    // TODO: definir campos obligatorios para body
    const missing = verifyAll(req, [], []);
    if (missing.length) return res.status(400).json({ message: `Faltan parámetros: ${missing.join(', ')}` });

    try {
        const newItem = await createEmpresa(req.body);
        res.status(201).json({ body: newItem, message: 'Creado correctamente' });
        logGreen(`POST /api/empresas: éxito al crear empresa con ID ${newItem.id}`);
    } catch (error) {
        logRed(`Error POST /api/empresas: ${error.stack}`);
        res.status(500).json({ message: 'Error interno' });
    } finally {
        logPurple(`POST /api/empresas ejecutado en ${performance.now() - start} ms`);
    }
});

export default router;