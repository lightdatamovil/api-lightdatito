// routes/reportes.js
import { Router } from 'express';
import { performance } from 'perf_hooks';
import { logRed, logPurple, logGreen } from '../src/funciones/logsCustom.js';
import { verifyAll } from '../src/funciones/verifyParameters.js';
import CustomException from '../models/custom_exception.js';
import { createReporte } from '../controllers/reporte/create_reporte.js';
import { getAllReportes } from '../controllers/reporte/get_all_reportes.js';
import { getReporteById } from '../controllers/reporte/get_reporte_by_id.js';
import { updateReporte } from '../controllers/reporte/edit_reporte.js';
import { deleteReporte } from '../controllers/reporte/delete_reporte.js';

const router = Router();

// Crear un nuevo reporte
router.post('/', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, [], ['titulo', 'tipo_reporte_id', 'observador', 'proyecto_id', 'logistica_id']);
    if (missing.length) {
        return res.status(400).json({ message: `Faltan parámetros: ${missing.join(', ')}` });
    }
    try {
        const newItem = await createReporte(req.body);
        res.status(201).json({ body: newItem, message: 'Creado correctamente' });
        logGreen(`POST /api/reportes: éxito al crear reporte ID ${newItem.id}`);
    } catch (error) {
        if (error instanceof CustomException) {
            logRed(`Error 400 en reportes POST: ${error}`);
            return res.status(400).json(error);
        }
        const customError = new CustomException('Internal Error', error.message, error.stack);
        logRed(`Error 500 en reportes POST: ${error}`);
        res.status(500).json(customError);
    } finally {
        logPurple(`POST /api/reportes ejecutado en ${performance.now() - start} ms`);
    }
});

// Listar todos los reportes
router.get('/', async (req, res) => {
    const start = performance.now();
    try {
        const list = await getAllReportes();
        res.status(200).json({ body: list, message: 'Datos obtenidos correctamente' });
        logGreen('GET /api/reportes: éxito al listar reportes');
    } catch (error) {
        if (error instanceof CustomException) {
            logRed(`Error 400 en reportes GET: ${error}`);
            return res.status(400).json(error);
        }
        const customError = new CustomException('Internal Error', error.message, error.stack);
        logRed(`Error 500 en reportes GET: ${error}`);
        res.status(500).json(customError);
    } finally {
        logPurple(`GET /api/reportes ejecutado en ${performance.now() - start} ms`);
    }
});

// Obtener un reporte por ID
router.get('/:id', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, ['id'], []);
    if (missing.length) {
        return res.status(400).json({ message: `Faltan parámetros: ${missing.join(', ')}` });
    }
    try {
        const item = await getReporteById(req.params.id);
        res.status(200).json({ body: item, message: 'Registro obtenido' });
        logGreen(`GET /api/reportes/${req.params.id}: éxito al obtener reporte`);
    } catch (error) {
        if (error instanceof CustomException) {
            logRed(`Error 400 en reportes GET/:id: ${error}`);
            return res.status(400).json(error);
        }
        const customError = new CustomException('Internal Error', error.message, error.stack);
        logRed(`Error 500 en reportes GET/:id: ${error}`);
        res.status(500).json(customError);
    } finally {
        logPurple(`GET /api/reportes/:id ejecutado en ${performance.now() - start} ms`);
    }
});

// Actualizar un reporte
router.put('/:id', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, ['id'], []);
    if (missing.length) {
        return res.status(400).json({ message: `Faltan parámetros: ${missing.join(', ')}` });
    }
    try {
        const updated = await updateReporte(req.params.id, req.body);
        res.status(200).json({ body: updated, message: 'Actualizado correctamente' });
        logGreen(`PUT /api/reportes/${req.params.id}: éxito al actualizar reporte`);
    } catch (error) {
        if (error instanceof CustomException) {
            logRed(`Error 400 en reportes PUT: ${error}`);
            return res.status(400).json(error);
        }
        const customError = new CustomException('Internal Error', error.message, error.stack);
        logRed(`Error 500 en reportes PUT: ${error}`);
        res.status(500).json(customError);
    } finally {
        logPurple(`PUT /api/reportes/:id ejecutado en ${performance.now() - start} ms`);
    }
});

// Eliminar un reporte
router.delete('/:id', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, ['id'], []);
    if (missing.length) {
        return res.status(400).json({ message: `Faltan parámetros: ${missing.join(', ')}` });
    }
    try {
        await deleteReporte(req.params.id);
        res.status(200).json({ message: 'Eliminado correctamente' });
        logGreen(`DELETE /api/reportes/${req.params.id}: éxito al eliminar reporte`);
    } catch (error) {
        if (error instanceof CustomException) {
            logRed(`Error 400 en reportes DELETE: ${error}`);
            return res.status(400).json(error);
        }
        const customError = new CustomException('Internal Error', error.message, error.stack);
        logRed(`Error 500 en reportes DELETE: ${error}`);
        res.status(500).json(customError);
    } finally {
        logPurple(`DELETE /api/reportes/:id ejecutado en ${performance.now() - start} ms`);
    }
});

export default router;
