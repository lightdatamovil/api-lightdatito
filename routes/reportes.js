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
    const missing = verifyAll(req, [], [
        'titulo',
        'descripcion',
        'tipo_reporte_id',
        'observador',
        'proyecto_id',
        'logistica_id']);
    if (missing.length) {
        const ex = new CustomException({
            title: 'Faltan campos',
            message: `Faltan campos: ${missing.join(', ')}`
        });
        logRed('Error 400 POST /api/reportes:', ex.toJSON());
        return res.status(400).json(ex.toJSON());
    }

    try {
        const { titulo, descripcion, tipo_reporte_id, observador, proyecto_id, logistica_id } = req.body;
        const newItem = await createReporte(titulo, descripcion, tipo_reporte_id, observador, proyecto_id, logistica_id);
        res.status(201).json({ body: newItem, message: 'Creado correctamente' });
        logGreen(`POST /api/reportes: éxito al crear reporte ID ${newItem.id}`);
    } catch (err) {
        if (err instanceof CustomException) {
            logRed('Error 400 POST /api/reportes:', err.toJSON());
            return res.status(400).json(err.toJSON());
        }
        const fatal = new CustomException({
            title: 'Internal Server Error',
            message: err.message,
            stack: err.stack
        });
        logRed('Error 500 POST /api/reportes:', fatal.toJSON());
        res.status(500).json(fatal.toJSON());
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
    } catch (err) {
        if (err instanceof CustomException) {
            logRed('Error 400 GET /api/reportes:', err.toJSON());
            return res.status(400).json(err.toJSON());
        }
        const fatal = new CustomException({
            title: 'Internal Server Error',
            message: err.message,
            stack: err.stack
        });
        logRed('Error 500 GET /api/reportes:', fatal.toJSON());
        res.status(500).json(fatal.toJSON());
    } finally {
        logPurple(`GET /api/reportes ejecutado en ${performance.now() - start} ms`);
    }
});

// Obtener un reporte por ID
router.get('/:id', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, ['id'], []);
    if (missing.length) {
        const ex = new CustomException({
            title: 'Faltan parámetros',
            message: `Faltan parámetros: ${missing.join(', ')}`
        });
        logRed(`Error 400 GET /api/reportes/${req.params.id}:`, ex.toJSON());
        return res.status(400).json(ex.toJSON());
    }

    try {
        const item = await getReporteById(req.params.id);
        res.status(200).json({ body: item, message: 'Registro obtenido' });
        logGreen(`GET /api/reportes/${req.params.id}: éxito al obtener reporte`);
    } catch (err) {
        if (err instanceof CustomException) {
            logRed(`Error 400 GET /api/reportes/${req.params.id}:`, err.toJSON());
            return res.status(400).json(err.toJSON());
        }
        const fatal = new CustomException({
            title: 'Internal Server Error',
            message: err.message,
            stack: err.stack
        });
        logRed(`Error 500 GET /api/reportes/${req.params.id}:`, fatal.toJSON());
        res.status(500).json(fatal.toJSON());
    } finally {
        logPurple(`GET /api/reportes/:id ejecutado en ${performance.now() - start} ms`);
    }
});

// Actualizar un reporte
router.put('/:id', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, ['id'], []);
    if (missing.length) {
        const ex = new CustomException({
            title: 'Faltan parámetros',
            message: `Faltan parámetros: ${missing.join(', ')}`
        });
        logRed(`Error 400 PUT /api/reportes/${req.params.id}:`, ex.toJSON());
        return res.status(400).json(ex.toJSON());
    }

    try {
        const updated = await updateReporte(req.params.id, req.body);
        res.status(200).json({ body: updated, message: 'Actualizado correctamente' });
        logGreen(`PUT /api/reportes/${req.params.id}: éxito al actualizar reporte`);
    } catch (err) {
        if (err instanceof CustomException) {
            logRed(`Error 400 PUT /api/reportes/${req.params.id}:`, err.toJSON());
            return res.status(400).json(err.toJSON());
        }
        const fatal = new CustomException({
            title: 'Internal Server Error',
            message: err.message,
            stack: err.stack
        });
        logRed(`Error 500 PUT /api/reportes/${req.params.id}:`, fatal.toJSON());
        res.status(500).json(fatal.toJSON());
    } finally {
        logPurple(`PUT /api/reportes/:id ejecutado en ${performance.now() - start} ms`);
    }
});

// Eliminar un reporte
router.delete('/:id', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, ['id'], []);
    if (missing.length) {
        const ex = new CustomException({
            title: 'Faltan parámetros',
            message: `Faltan parámetros: ${missing.join(', ')}`
        });
        logRed(`Error 400 DELETE /api/reportes/${req.params.id}:`, ex.toJSON());
        return res.status(400).json(ex.toJSON());
    }

    try {
        await deleteReporte(req.params.id);
        res.status(200).json({ message: 'Eliminado correctamente' });
        logGreen(`DELETE /api/reportes/${req.params.id}: éxito al eliminar reporte`);
    } catch (err) {
        if (err instanceof CustomException) {
            logRed(`Error 400 DELETE /api/reportes/${req.params.id}:`, err.toJSON());
            return res.status(400).json(err.toJSON());
        }
        const fatal = new CustomException({
            title: 'Internal Server Error',
            message: err.message,
            stack: err.stack
        });
        logRed(`Error 500 DELETE /api/reportes/${req.params.id}:`, fatal.toJSON());
        res.status(500).json(fatal.toJSON());
    } finally {
        logPurple(`DELETE /api/reportes/:id ejecutado en ${performance.now() - start} ms`);
    }
});

export default router;
