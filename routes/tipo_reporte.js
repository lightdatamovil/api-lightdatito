// routes/tipoReporte.js
import { Router } from 'express';
import { performance } from 'perf_hooks';
import { logRed, logPurple, logGreen } from '../src/funciones/logsCustom.js';
import { verifyAll } from '../src/funciones/verifyParameters.js';
import CustomException from '../models/custom_exception.js';
import { createTipoReporte } from '../controllers/tipo_reporte/create_tipo_reporte.js';
import { getTipoReporteById } from '../controllers/tipo_reporte/get_tipo_reporte_by_id.js';
import { getAllTipoReporte } from '../controllers/tipo_reporte/get_all_tipos_reportes.js';
import { updateTipoReporte } from '../controllers/tipo_reporte/edit_tipo_reporte.js';
import { deleteTipoReporte } from '../controllers/tipo_reporte/delete_tipo_reporte.js';

const router = Router();

// Listar todos los tipos de reporte
router.get('/', async (req, res) => {
    const start = performance.now();
    try {
        const list = await getAllTipoReporte();
        res.status(200).json({ body: list, message: 'Datos obtenidos correctamente' });
        logGreen('GET /api/tipo-reporte: éxito al listar tipos de reporte');
    } catch (error) {
        if (error instanceof CustomException) {
            logRed(`Error 400 en tipo-reporte GET: ${error}`);
            return res.status(400).json(error);
        }
        const customError = new CustomException('Internal Error', error.message, error.stack);
        logRed(`Error 500 en tipo-reporte GET: ${error}`);
        res.status(500).json(customError);
    } finally {
        logPurple(`GET /api/tipo-reporte ejecutado en ${performance.now() - start} ms`);
    }
});

// Obtener un tipo de reporte por ID
router.get('/:id', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, ['id'], []);
    if (missing.length) {
        return res.status(400).json({ message: `Faltan parámetros: ${missing.join(', ')}` });
    }
    try {
        const item = await getTipoReporteById(req.params.id);
        res.status(200).json({ body: item, message: 'Registro obtenido' });
        logGreen(`GET /api/tipo-reporte/${req.params.id}: éxito al obtener tipo de reporte`);
    } catch (error) {
        if (error instanceof CustomException) {
            logRed(`Error 400 en tipo-reporte GET/:id: ${error}`);
            return res.status(400).json(error);
        }
        const customError = new CustomException('Internal Error', error.message, error.stack);
        logRed(`Error 500 en tipo-reporte GET/:id: ${error}`);
        res.status(500).json(customError);
    } finally {
        logPurple(`GET /api/tipo-reporte/:id ejecutado en ${performance.now() - start} ms`);
    }
});

// Crear un nuevo tipo de reporte
router.post('/', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, [], ['nombre', 'color']);
    if (missing.length) {
        return res.status(400).json({ message: `Faltan parámetros: ${missing.join(', ')}` });
    }
    try {
        const newItem = await createTipoReporte(req.body);
        res.status(201).json({ body: newItem, message: 'Creado correctamente' });
        logGreen(`POST /api/tipo-reporte: éxito al crear tipo de reporte con ID ${newItem.id}`);
    } catch (error) {
        if (error instanceof CustomException) {
            logRed(`Error 400 en tipo-reporte POST: ${error}`);
            return res.status(400).json(error);
        }
        const customError = new CustomException('Internal Error', error.message, error.stack);
        logRed(`Error 500 en tipo-reporte POST: ${error}`);
        res.status(500).json(customError);
    } finally {
        logPurple(`POST /api/tipo-reporte ejecutado en ${performance.now() - start} ms`);
    }
});

// Actualizar un tipo de reporte
router.put('/:id', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, ['id'], ['nombre', 'color']);
    if (missing.length) {
        return res.status(400).json({ message: `Faltan parámetros: ${missing.join(', ')}` });
    }
    try {
        const updated = await updateTipoReporte(req.params.id, req.body);
        res.status(200).json({ body: updated, message: 'Actualizado correctamente' });
        logGreen(`PUT /api/tipo-reporte/${req.params.id}: éxito al actualizar tipo de reporte`);
    } catch (error) {
        if (error instanceof CustomException) {
            logRed(`Error 400 en tipo-reporte PUT: ${error}`);
            return res.status(400).json(error);
        }
        const customError = new CustomException('Internal Error', error.message, error.stack);
        logRed(`Error 500 en tipo-reporte PUT: ${error}`);
        res.status(500).json(customError);
    } finally {
        logPurple(`PUT /api/tipo-reporte/:id ejecutado en ${performance.now() - start} ms`);
    }
});

// Eliminar un tipo de reporte
router.delete('/:id', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, ['id'], []);
    if (missing.length) {
        return res.status(400).json({ message: `Faltan parámetros: ${missing.join(', ')}` });
    }
    try {
        await deleteTipoReporte(req.params.id);
        res.status(200).json({ message: 'Eliminado correctamente' });
        logGreen(`DELETE /api/tipo-reporte/${req.params.id}: éxito al eliminar tipo de reporte`);
    } catch (error) {
        if (error instanceof CustomException) {
            logRed(`Error 400 en tipo-reporte DELETE: ${error}`);
            return res.status(400).json(error);
        }
        const customError = new CustomException('Internal Error', error.message, error.stack);
        logRed(`Error 500 en tipo-reporte DELETE: ${error}`);
        res.status(500).json(customError);
    } finally {
        logPurple(`DELETE /api/tipo-reporte/:id ejecutado en ${performance.now() - start} ms`);
    }
});

export default router;