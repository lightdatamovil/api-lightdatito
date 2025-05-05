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

router.get('/', async (req, res) => {
    const start = performance.now();
    try {
        const list = await getAllTipoReporte();
        res.status(200).json({ body: list, message: 'Datos obtenidos correctamente' });
        logGreen('GET /api/tipo-reporte: éxito al listar tipos de reporte');
    } catch (err) {
        if (err instanceof CustomException) {
            logRed('Error 400 GET /api/tipo-reporte:', err.toJSON());
            return res.status(400).json(err.toJSON());
        }
        const fatal = new CustomException({
            title: 'Internal Server Error',
            message: err.message,
            stack: err.stack
        });
        logRed('Error 500 GET /api/tipo-reporte:', fatal.toJSON());
        res.status(500).json(fatal.toJSON());
    } finally {
        logPurple(`GET /api/tipo-reporte ejecutado en ${performance.now() - start} ms`);
    }
});

// Obtener un tipo de reporte por ID
router.get('/:id', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, ['id'], []);
    if (missing.length) {
        const ex = new CustomException({
            title: 'Faltan parámetros',
            message: `Faltan parámetros: ${missing.join(', ')}`
        });
        logRed(`Error 400 GET /api/tipo-reporte/${req.params.id}:`, ex.toJSON());
        return res.status(400).json(ex.toJSON());
    }

    try {
        const item = await getTipoReporteById(req.params.id);
        res.status(200).json({ body: item, message: 'Registro obtenido' });
        logGreen(`GET /api/tipo-reporte/${req.params.id}: éxito al obtener tipo de reporte`);
    } catch (err) {
        if (err instanceof CustomException) {
            logRed(`Error 400 GET /api/tipo-reporte/${req.params.id}:`, err.toJSON());
            return res.status(400).json(err.toJSON());
        }
        const fatal = new CustomException({
            title: 'Internal Server Error',
            message: err.message,
            stack: err.stack
        });
        logRed(`Error 500 GET /api/tipo-reporte/${req.params.id}:`, fatal.toJSON());
        res.status(500).json(fatal.toJSON());
    } finally {
        logPurple(`GET /api/tipo-reporte/:id ejecutado en ${performance.now() - start} ms`);
    }
});

// Crear un nuevo tipo de reporte
router.post('/', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, [], ['nombre', 'color']);
    if (missing.length) {
        const ex = new CustomException({
            title: 'Faltan campos',
            message: `Faltan campos: ${missing.join(', ')}`
        });
        logRed('Error 400 POST /api/tipo-reporte:', ex.toJSON());
        return res.status(400).json(ex.toJSON());
    }

    try {
        const { nombre, color } = req.body;
        const newItem = await createTipoReporte(nombre, color);
        res.status(201).json({ body: newItem, message: 'Creado correctamente' });
        logGreen(`POST /api/tipo-reporte: éxito al crear tipo de reporte con ID ${newItem.id}`);
    } catch (err) {
        if (err instanceof CustomException) {
            logRed('Error 400 POST /api/tipo-reporte:', err.toJSON());
            return res.status(400).json(err.toJSON());
        }
        const fatal = new CustomException({
            title: 'Internal Server Error',
            message: err.message,
            stack: err.stack
        });
        logRed('Error 500 POST /api/tipo-reporte:', fatal.toJSON());
        res.status(500).json(fatal.toJSON());
    } finally {
        logPurple(`POST /api/tipo-reporte ejecutado en ${performance.now() - start} ms`);
    }
});

// Actualizar un tipo de reporte
router.put('/:id', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, ['id'], ['nombre', 'color']);
    if (missing.length) {
        const ex = new CustomException({
            title: 'Faltan campos',
            message: `Faltan campos: ${missing.join(', ')}`
        });
        logRed(`Error 400 PUT /api/tipo-reporte/${req.params.id}:`, ex.toJSON());
        return res.status(400).json(ex.toJSON());
    }

    try {
        const updated = await updateTipoReporte(req.params.id, req.body);
        res.status(200).json({ body: updated, message: 'Actualizado correctamente' });
        logGreen(`PUT /api/tipo-reporte/${req.params.id}: éxito al actualizar tipo de reporte`);
    } catch (err) {
        if (err instanceof CustomException) {
            logRed(`Error 400 PUT /api/tipo-reporte/${req.params.id}:`, err.toJSON());
            return res.status(400).json(err.toJSON());
        }
        const fatal = new CustomException({
            title: 'Internal Server Error',
            message: err.message,
            stack: err.stack
        });
        logRed(`Error 500 PUT /api/tipo-reporte/${req.params.id}:`, fatal.toJSON());
        res.status(500).json(fatal.toJSON());
    } finally {
        logPurple(`PUT /api/tipo-reporte/:id ejecutado en ${performance.now() - start} ms`);
    }
});

// Eliminar un tipo de reporte
router.delete('/:id', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, ['id'], []);
    if (missing.length) {
        const ex = new CustomException({
            title: 'Faltan parámetros',
            message: `Faltan parámetros: ${missing.join(', ')}`
        });
        logRed(`Error 400 DELETE /api/tipo-reporte/${req.params.id}:`, ex.toJSON());
        return res.status(400).json(ex.toJSON());
    }

    try {
        await deleteTipoReporte(req.params.id);
        res.status(200).json({ message: 'Eliminado correctamente' });
        logGreen(`DELETE /api/tipo-reporte/${req.params.id}: éxito al eliminar tipo de reporte`);
    } catch (err) {
        if (err instanceof CustomException) {
            logRed(`Error 400 DELETE /api/tipo-reporte/${req.params.id}:`, err.toJSON());
            return res.status(400).json(err.toJSON());
        }
        const fatal = new CustomException({
            title: 'Internal Server Error',
            message: err.message,
            stack: err.stack
        });
        logRed(`Error 500 DELETE /api/tipo-reporte/${req.params.id}:`, fatal.toJSON());
        res.status(500).json(fatal.toJSON());
    } finally {
        logPurple(`DELETE /api/tipo-reporte/:id ejecutado en ${performance.now() - start} ms`);
    }
});

export default router;