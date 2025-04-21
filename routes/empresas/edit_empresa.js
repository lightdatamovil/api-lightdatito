import { Router } from 'express';
import { performance } from 'perf_hooks';
import { logRed, logPurple, logGreen } from '../../src/funciones/logsCustom.js';
import { verifyAll } from '../../src/funciones/verifyParameters.js';

const router = Router();

router.put('/:id', async (req, res) => {
    const start = performance.now();
    // TODO: definir campos obligatorios para body
    const missing = verifyAll(req, ['id'], []);
    if (missing.length) return res.status(400).json({ message: `Faltan parámetros: ${missing.join(', ')}` });

    try {
        const updated = await updateEmpresa(req.params.id, req.body);
        res.status(200).json({ body: updated, message: 'Actualizado correctamente' });
        logGreen(`PUT /api/empresas/${req.params.id}: éxito al actualizar empresa`);
    } catch (error) {
        logRed(`Error PUT /api/empresas/:id: ${error.stack}`);
        res.status(500).json({ message: 'Error interno' });
    } finally {
        logPurple(`PUT /api/empresas/:id ejecutado en ${performance.now() - start} ms`);
    }
});

export default router;