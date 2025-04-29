// routes/reportes.js
import { Router } from 'express';
import { performance } from 'perf_hooks';
import { logRed, logPurple, logGreen } from '../src/funciones/logsCustom.js';
import { verifyAll } from '../src/funciones/verifyParameters.js';
import { createReporte } from '../controllers/reporte/create_reporte.js';
import { getAllReportes } from '../controllers/reporte/get_all_reportes.js';
import { getReporteById } from '../controllers/reporte/get_reporte_by_id.js';
import { updateReporte } from '../controllers/reporte/edit_reporte.js';
import { deleteReporte } from '../controllers/reporte/delete_reporte.js';

const reportesRouter = Router();

reportesRouter.post('/', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, [], ['titulo', 'tipo_reporte_id', 'observador', 'proyecto_id', 'logistica_id']);
    if (missing.length) return res.status(400).json({ message: `Faltan parámetros: ${missing.join(', ')}` });
    try {
        const newItem = await createReporte(req.body);
        res.status(201).json({ body: newItem, message: 'Creado correctamente' });
        logGreen(`POST /api/reportes: éxito al crear reporte ID ${newItem.id}`);
    } catch (error) {
        logRed(`Error POST /api/reportes: ${error.stack}`);
        res.status(500).json({ message: 'Error interno' });
    } finally {
        logPurple(`POST /api/reportes ejecutado en ${performance.now() - start} ms`);
    }
});

reportesRouter.get('/', async (req, res) => {
    const start = performance.now();
    try {
        const list = await getAllReportes();
        res.status(200).json({ body: list, message: 'Datos obtenidos' });
        logGreen('GET /api/reportes: éxito al listar reportes');
    } catch (error) {
        logRed(`Error GET /api/reportes: ${error.stack}`);
        res.status(500).json({ message: 'Error interno' });
    } finally {
        logPurple(`GET /api/reportes ejecutado en ${performance.now() - start} ms`);
    }
});

reportesRouter.get('/:id', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, ['id'], []);
    if (missing.length) return res.status(400).json({ message: `Faltan parámetros: ${missing.join(', ')}` });
    try {
        const item = await getReporteById(req.params.id);
        res.status(200).json({ body: item, message: 'Registro obtenido' });
        logGreen(`GET /api/reportes/${req.params.id}: éxito al obtener reporte`);
    } catch (error) {
        logRed(`Error GET /api/reportes/:id: ${error.stack}`);
        res.status(500).json({ message: 'Error interno' });
    } finally {
        logPurple(`GET /api/reportes/:id ejecutado en ${performance.now() - start} ms`);
    }
});

reportesRouter.put('/:id', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, ['id'], []);
    if (missing.length) return res.status(400).json({ message: `Faltan parámetros: ${missing.join(', ')}` });
    try {
        const updated = await updateReporte(req.params.id, req.body);
        res.status(200).json({ body: updated, message: 'Actualizado correctamente' });
        logGreen(`PUT /api/reportes/${req.params.id}: éxito al actualizar reporte`);
    } catch (error) {
        logRed(`Error PUT /api/reportes/:id: ${error.stack}`);
        res.status(500).json({ message: 'Error interno' });
    } finally {
        logPurple(`PUT /api/reportes/:id ejecutado en ${performance.now() - start} ms`);
    }
});

reportesRouter.delete('/:id', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, ['id'], []);
    if (missing.length) return res.status(400).json({ message: `Faltan parámetros: ${missing.join(', ')}` });
    try {
        await deleteReporte(req.params.id);
        res.status(200).json({ message: 'Eliminado correctamente ' });
        logGreen(`DELETE /api/reportes/${req.params.id}: éxito al eliminar reporte`);
    } catch (error) {
        logRed(`Error DELETE /api/reportes/:id: ${error.stack}`);
        res.status(500).json({ message: 'Error interno' });
    } finally {
        logPurple(`DELETE /api/reportes/:id ejecutado en ${performance.now() - start} ms`);
    }
});

export default reportesRouter;