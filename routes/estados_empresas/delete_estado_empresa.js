import { Router } from 'express';
import { performance } from 'perf_hooks';
import { logRed, logPurple, logGreen } from '../../src/funciones/logsCustom.js';
import { verifyAll } from '../../src/funciones/verifyParameters.js';

const router = Router();

router.delete('/:id', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, ['id'], []);
    if (missing.length) return res.status(400).json({ message: `Faltan parámetros: ${missing.join(', ')}` });
    try {
        await deleteEstadoEmpresa(req.params.id);
        res.status(200).json({ message: 'Eliminado correctamente' });
        logGreen(`DELETE /api/estados-empresas/${req.params.id}: éxito al eliminar estado`);
    } catch (error) {
        logRed(`Error DELETE /api/estados-empresas/:id: ${error.stack}`);
        res.status(500).json({ message: 'Error interno' });
    } finally {
        logPurple(`DELETE /api/estados-empresas/:id ejecutado en ${performance.now() - start} ms`);
    }
});

export default router;