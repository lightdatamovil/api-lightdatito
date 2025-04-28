import { Router } from 'express';
import { performance } from 'perf_hooks';
import { logRed, logPurple, logGreen } from '../src/funciones/logsCustom.js';
import { verifyAll } from '../src/funciones/verifyParameters.js';


const estadosReporteRouter = Router();

estadosReporteRouter.get('/', async (req, res) => {
    const start = performance.now();
    try {
        const list = await getAllEstadosReporte();
        res.status(200).json({ body: list, message: 'Datos obtenidos correctamente' });
        logGreen('GET /api/estados-reporte: éxito al listar estados de reporte');
    } catch (error) {
        logRed(`Error GET /api/estados-reporte: ${error.stack}`);
        res.status(500).json({ message: 'Error interno' });
    } finally {
        logPurple(`GET /api/estados-reporte ejecutado en ${performance.now() - start} ms`);
    }
});

estadosReporteRouter.get('/:id', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, ['id'], []);
    if (missing.length) return res.status(400).json({ message: `Faltan parámetros: ${missing.join(', ')}` });
    try {
        const item = await getEstadoReporteById(req.params.id);
        res.status(200).json({ body: item, message: 'Registro obtenido' });
        logGreen(`GET /api/estados-reporte/${req.params.id}: éxito al obtener estado de reporte`);
    } catch (error) {
        logRed(`Error GET /api/estados-reporte/:id: ${error.stack}`);
        res.status(500).json({ message: 'Error interno' });
    } finally {
        logPurple(`GET /api/estados-reporte/:id ejecutado en ${performance.now() - start} ms`);
    }
});

estadosReporteRouter.post('/', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, [], ['nombre', 'color']);
    if (missing.length) return res.status(400).json({ message: `Faltan parámetros: ${missing.join(', ')}` });
    try {
        const newItem = await createEstadoReporte(req.body);
        res.status(201).json({ body: newItem, message: 'Creado correctamente' });
        logGreen(`POST /api/estados-reporte: éxito al crear estado de reporte con ID ${newItem.id}`);
    } catch (error) {
        logRed(`Error POST /api/estados-reporte: ${error.stack}`);
        res.status(500).json({ message: 'Error interno' });
    } finally {
        logPurple(`POST /api/estados-reporte ejecutado en ${performance.now() - start} ms`);
    }
});

estadosReporteRouter.put('/:id', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, ['id'], []);
    if (missing.length) return res.status(400).json({ message: `Faltan parámetros: ${missing.join(', ')}` });
    try {
        const updated = await updateEstadoReporte(req.params.id, req.body);
        res.status(200).json({ body: updated, message: 'Actualizado correctamente' });
        logGreen(`PUT /api/estados-reporte/${req.params.id}: éxito al actualizar estado de reporte`);
    } catch (error) {
        logRed(`Error PUT /api/estados-reporte/:id: ${error.stack}`);
        res.status(500).json({ message: 'Error interno' });
    } finally {
        logPurple(`PUT /api/estados-reporte/:id ejecutado en ${performance.now() - start} ms`);
    }
});

estadosReporteRouter.delete('/:id', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, ['id'], []);
    if (missing.length) return res.status(400).json({ message: `Faltan parámetros: ${missing.join(', ')}` });
    try {
        await deleteEstadoReporte(req.params.id);
        res.status(200).json({ message: 'Eliminado correctamente' });
        logGreen(`DELETE /api/estados-reporte/${req.params.id}: éxito al eliminar estado de reporte`);
    } catch (error) {
        logRed(`Error DELETE /api/estados-reporte/:id: ${error.stack}`);
        res.status(500).json({ message: 'Error interno' });
    } finally {
        logPurple(`DELETE /api/estados-reporte/:id ejecutado en ${performance.now() - start} ms`);
    }
});

export default estadosReporteRouter;