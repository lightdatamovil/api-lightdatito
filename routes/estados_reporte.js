import { Router } from 'express';
import { performance } from 'perf_hooks';
import { logRed, logPurple, logGreen } from '../src/funciones/logsCustom.js';
import { verifyAll } from '../src/funciones/verifyParameters.js';
import CustomException from '../models/custom_exception.js';
import { createEstadoReporte } from '../controllers/estado_reporte/create_estado_reporte.js';
import { getAllEstadosReporte } from '../controllers/estado_reporte/get_all_estados_reportes.js';
import { getEstadoReporteById } from '../controllers/estado_reporte/get_estado_reporte_by_id.js';
import { updateEstadoReporte } from '../controllers/estado_reporte/edit_estado_reporte.js';
import { deleteEstadoReporte } from '../controllers/estado_reporte/delete_estado_reporte.js';

const router = Router();

// Listar todos los estados de reporte
router.get('/', async (req, res) => {
    const start = performance.now();
    try {
        const list = await getAllEstadosReporte();
        res.status(200).json({ body: list, message: 'Datos obtenidos correctamente' });
        logGreen('GET /api/estados-reporte: éxito al listar estados de reporte');
    } catch (error) {
        if (error instanceof CustomException) {
            logRed(`Error 400 en estados-reporte GET: ${error}`);
            return res.status(400).json(error);
        }
        const customError = new CustomException('Internal Error', error.message, error.stack);
        logRed(`Error 500 en estados-reporte GET: ${error}`);
        res.status(500).json(customError);
    } finally {
        logPurple(`GET /api/estados-reporte ejecutado en ${performance.now() - start} ms`);
    }
});

// Obtener un estado de reporte por ID
router.get('/:id', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, ['id'], []);
    if (missing.length) return res.status(400).json({ message: `Faltan parámetros: ${missing.join(', ')}` });
    try {
        const item = await getEstadoReporteById(req.params.id);
        res.status(200).json({ body: item, message: 'Registro obtenido' });
        logGreen(`GET /api/estados-reporte/${req.params.id}: éxito al obtener estado de reporte`);
    } catch (error) {
        if (error instanceof CustomException) {
            logRed(`Error 400 en estados-reporte GET/:id: ${error}`);
            return res.status(400).json(error);
        }
        const customError = new CustomException('Internal Error', error.message, error.stack);
        logRed(`Error 500 en estados-reporte GET/:id: ${error}`);
        res.status(500).json(customError);
    } finally {
        logPurple(`GET /api/estados-reporte/:id ejecutado en ${performance.now() - start} ms`);
    }
});

// Crear un nuevo estado de reporte
router.post('/', async (req, res) => {
    const start = performance.now();
    try {
        const errorMessage = verifyAll(req, [], ['nombre', 'color']);

        if (errorMessage.length) {
            logRed(`Error en create-estado-reporte: ${errorMessage}`);
            throw new CustomException({
                title: 'Error en create-estado-reporte',
                message: errorMessage
            });
        }

        const { nombre, color } = req.body;
        const newItem = await createEstadoReporte(nombre, color);
        res.status(201).json({ body: newItem, message: 'Creado correctamente' });
        logGreen(`POST /api/estados-reporte: éxito al crear estado de reporte con ID ${newItem.id}`);
    } catch (error) {
        if (error instanceof CustomException) {
            logRed(`Error 400 en estados-reporte POST: ${error}`);
            return res.status(400).json(error);
        }
        const customError = new CustomException('Internal Error', error.message, error.stack);
        logRed(`Error 500 en estados-reporte POST: ${error}`);
        res.status(500).json(customError);
    } finally {
        logPurple(`POST /api/estados-reporte ejecutado en ${performance.now() - start} ms`);
    }
});

// Actualizar un estado de reporte
router.put('/:id', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, ['id'], []);
    if (missing.length) return res.status(400).json({ message: `Faltan parámetros: ${missing.join(', ')}` });
    try {
        const updated = await updateEstadoReporte(req.params.id, req.body);
        res.status(200).json({ body: updated, message: 'Actualizado correctamente' });
        logGreen(`PUT /api/estados-reporte/${req.params.id}: éxito al actualizar estado de reporte`);
    } catch (error) {
        if (error instanceof CustomException) {
            logRed(`Error 400 en estados-reporte PUT: ${error}`);
            return res.status(400).json(error);
        }
        const customError = new CustomException('Internal Error', error.message, error.stack);
        logRed(`Error 500 en estados-reporte PUT: ${error}`);
        res.status(500).json(customError);
    } finally {
        logPurple(`PUT /api/estados-reporte/:id ejecutado en ${performance.now() - start} ms`);
    }
});

// Eliminar un estado de reporte
router.delete('/:id', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, ['id'], []);
    if (missing.length) return res.status(400).json({ message: `Faltan parámetros: ${missing.join(', ')}` });
    try {
        await deleteEstadoReporte(req.params.id);
        res.status(200).json({ message: 'Eliminado correctamente' });
        logGreen(`DELETE /api/estados-reporte/${req.params.id}: éxito al eliminar estado de reporte`);
    } catch (error) {
        if (error instanceof CustomException) {
            logRed(`Error 400 en estados-reporte DELETE: ${error}`);
            return res.status(400).json(error);
        }
        const customError = new CustomException('Internal Error', error.message, error.stack);
        logRed(`Error 500 en estados-reporte DELETE: ${error}`);
        res.status(500).json(customError);
    } finally {
        logPurple(`DELETE /api/estados-reporte/:id ejecutado en ${performance.now() - start} ms`);
    }
});

export default router;
