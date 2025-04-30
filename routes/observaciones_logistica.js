import { Router } from 'express';
import { performance } from 'perf_hooks';
import { logRed, logPurple, logGreen } from '../src/funciones/logsCustom.js';
import { verifyAll } from '../src/funciones/verifyParameters.js';
import CustomException from '../models/custom_exception.js';
import { createObservacionLogistica } from '../controllers/observacion_logistica/create_observacion_logistica.js';
import { getAllObservacionesLogisticas } from '../controllers/observacion_logistica/get_all_observaciones_logistica.js';
import { getObservacionLogisticaById } from '../controllers/observacion_logistica/get_observaciones_logistica_by_id.js';
import { updateObservacionLogistica } from '../controllers/observacion_logistica/edit_observacion_logistica.js';
import { deleteObservacionLogistica } from '../controllers/observacion_logistica/delete_observacion_logistica.js';

const observacionesLogisticaRouter = Router();

// Crear observación de logística
observacionesLogisticaRouter.post('/', async (req, res) => {
    const start = performance.now();
    try {
        const errorMessage = verifyAll(req, [], ['nombre']);

        if (errorMessage.length) {
            logRed(`Error en create-observacion-logistica: ${errorMessage}`);
            throw new CustomException({
                title: 'Error en create-observacion-logistica',
                message: errorMessage
            });
        }

        const { nombre } = req.body;
        const newItem = await createObservacionLogistica(nombre);
        res.status(201).json({ body: newItem, message: 'Creado correctamente' });
        logGreen(`POST /api/observaciones-logistica: éxito al crear observación con ID ${newItem.id}`);
    } catch (error) {
        if (error instanceof CustomException) {
            logRed(`Error 400 en observaciones-logistica POST: ${error}`);
            return res.status(400).json(error);
        }
        const customError = new CustomException('Internal Error', error.message, error.stack);
        logRed(`Error 500 en observaciones-logistica POST: ${error}`);
        res.status(500).json(customError);
    } finally {
        logPurple(`POST /api/observaciones-logistica ejecutado en ${performance.now() - start} ms`);
    }
});

// Listar observaciones de logística
observacionesLogisticaRouter.get('/', async (req, res) => {
    const start = performance.now();
    try {
        const list = await getAllObservacionesLogisticas();
        res.status(200).json({ body: list, message: 'Datos obtenidos correctamente' });
        logGreen('GET /api/observaciones-logistica: éxito al listar observaciones');
    } catch (error) {
        if (error instanceof CustomException) {
            logRed(`Error 400 en observaciones-logistica GET: ${error}`);
            return res.status(400).json(error);
        }
        const customError = new CustomException('Internal Error', error.message, error.stack);
        logRed(`Error 500 en observaciones-logistica GET: ${error}`);
        res.status(500).json(customError);
    } finally {
        logPurple(`GET /api/observaciones-logistica ejecutado en ${performance.now() - start} ms`);
    }
});

// Obtener observación de logística por ID
observacionesLogisticaRouter.get('/:id', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, ['id'], []);
    if (missing.length) return res.status(400).json({ message: `Faltan parámetros: ${missing.join(', ')}` });
    try {
        const item = await getObservacionLogisticaById(req.params.id);
        res.status(200).json({ body: item, message: 'Registro obtenido' });
        logGreen(`GET /api/observaciones-logistica/${req.params.id}: éxito al obtener observación`);
    } catch (error) {
        if (error instanceof CustomException) {
            logRed(`Error 400 en observaciones-logistica GET/:id: ${error}`);
            return res.status(400).json(error);
        }
        const customError = new CustomException('Internal Error', error.message, error.stack);
        logRed(`Error 500 en observaciones-logistica GET/:id: ${error}`);
        res.status(500).json(customError);
    } finally {
        logPurple(`GET /api/observaciones-logistica/:id ejecutado en ${performance.now() - start} ms`);
    }
});

// Actualizar observación de logística
observacionesLogisticaRouter.put('/:id', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, ['id'], []);
    if (missing.length) return res.status(400).json({ message: `Faltan parámetros: ${missing.join(', ')}` });
    try {
        const updated = await updateObservacionLogistica(req.params.id, req.body);
        res.status(200).json({ body: updated, message: 'Actualizado correctamente' });
        logGreen(`PUT /api/observaciones-logistica/${req.params.id}: éxito al actualizar observación`);
    } catch (error) {
        if (error instanceof CustomException) {
            logRed(`Error 400 en observaciones-logistica PUT: ${error}`);
            return res.status(400).json(error);
        }
        const customError = new CustomException('Internal Error', error.message, error.stack);
        logRed(`Error 500 en observaciones-logistica PUT: ${error}`);
        res.status(500).json(customError);
    } finally {
        logPurple(`PUT /api/observaciones-logistica/:id ejecutado en ${performance.now() - start} ms`);
    }
});

// Eliminar observación de logística
observacionesLogisticaRouter.delete('/:id', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, ['id'], []);
    if (missing.length) return res.status(400).json({ message: `Faltan parámetros: ${missing.join(', ')}` });
    try {
        await deleteObservacionLogistica(req.params.id);
        res.status(200).json({ message: 'Eliminado correctamente' });
        logGreen(`DELETE /api/observaciones-logistica/${req.params.id}: éxito al eliminar observación`);
    } catch (error) {
        if (error instanceof CustomException) {
            logRed(`Error 400 en observaciones-logistica DELETE: ${error}`);
            return res.status(400).json(error);
        }
        const customError = new CustomException('Internal Error', error.message, error.stack);
        logRed(`Error 500 en observaciones-logistica DELETE: ${error}`);
        res.status(500).json(customError);
    } finally {
        logPurple(`DELETE /api/observaciones-logistica/:id ejecutado en ${performance.now() - start} ms`);
    }
});

export default observacionesLogisticaRouter;