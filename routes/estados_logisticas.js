import { Router } from 'express';
import { performance } from 'perf_hooks';
import { logRed, logPurple, logGreen } from '../src/funciones/logsCustom.js';
import { verifyAll } from '../src/funciones/verifyParameters.js';

const router = Router();

router.post('/', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, [], []);
    if (missing.length) return res.status(400).json({ message: `Faltan parámetros: ${missing.join(', ')}` });
    try {
        const newItem = await createEstadoLogistica(req.body);
        res.status(201).json({ body: newItem, message: 'Creado correctamente' });
        logGreen(`POST /api/estados-logisticas: éxito al crear estado con ID ${newItem.id}`);
    } catch (error) {
        logRed(`Error POST /api/estados-logisticas: ${error.stack}`);
        res.status(500).json({ message: 'Error interno' });
    } finally {
        logPurple(`POST /api/estados-logisticas ejecutado en ${performance.now() - start} ms`);
    }
});

router.delete('/:id', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, ['id'], []);
    if (missing.length) return res.status(400).json({ message: `Faltan parámetros: ${missing.join(', ')}` });
    try {
        await deleteEstadoLogistica(req.params.id);
        res.status(200).json({ message: 'Eliminado correctamente' });
        logGreen(`DELETE /api/estados-logisticas/${req.params.id}: éxito al eliminar estado`);
    } catch (error) {
        logRed(`Error DELETE /api/estados-logisticas/:id: ${error.stack}`);
        res.status(500).json({ message: 'Error interno' });
    } finally {
        logPurple(`DELETE /api/estados-logisticas/:id ejecutado en ${performance.now() - start} ms`);
    }
});

router.put('/:id', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, ['id'], []);
    if (missing.length) return res.status(400).json({ message: `Faltan parámetros: ${missing.join(', ')}` });
    try {
        const updated = await updateEstadoLogistica(req.params.id, req.body);
        res.status(200).json({ body: updated, message: 'Actualizado correctamente' });
        logGreen(`PUT /api/estados-logisticas/${req.params.id}: éxito al actualizar estado`);
    } catch (error) {
        logRed(`Error PUT /api/estados-logisticas/:id: ${error.stack}`);
        res.status(500).json({ message: 'Error interno' });
    } finally {
        logPurple(`PUT /api/estados-logisticas/:id ejecutado en ${performance.now() - start} ms`);
    }
});

router.get('/:id', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, ['id'], []);
    if (missing.length) return res.status(400).json({ message: `Faltan parámetros: ${missing.join(', ')}` });
    try {
        const item = await getEstadoLogisticaById(req.params.id);
        res.status(200).json({ body: item, message: 'Registro obtenido' });
        logGreen(`GET /api/estados-logisticas/${req.params.id}: éxito al obtener estado`);
    } catch (error) {
        logRed(`Error GET /api/estados-logisticas/:id: ${error.stack}`);
        res.status(500).json({ message: 'Error interno' });
    } finally {
        logPurple(`GET /api/estados-logisticas/:id ejecutado en ${performance.now() - start} ms`);
    }
});

router.get('/', async (req, res) => {
    const start = performance.now();
    try {
        const list = await getAllEstadosLogisticas();
        res.status(200).json({ body: list, message: 'Datos obtenidos correctamente' });
        logGreen('GET /api/estados-logisticas: éxito al listar estados');
    } catch (error) {
        logRed(`Error GET /api/estados-logisticas: ${error.stack}`);
        res.status(500).json({ message: 'Error interno' });
    } finally {
        logPurple(`GET /api/estados-logisticas ejecutado en ${performance.now() - start} ms`);
    }
});

export default router;