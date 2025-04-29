import { Router } from 'express';
import { performance } from 'perf_hooks';
import { logRed, logPurple, logGreen } from '../src/funciones/logsCustom.js';
import { verifyAll } from '../src/funciones/verifyParameters.js';
import CustomException from '../models/custom_exception.js';
import { createLogistica } from '../controllers/logisticas/create_logistica.js';
import { getAllLogisticas } from '../controllers/logisticas/get_all_logisticas.js';
import { getLogisticaById } from '../controllers/logisticas/get_logistica_by_id.js';
import { updateLogistica } from '../controllers/logisticas/edit_logistica.js';
import { deleteLogistica } from '../controllers/logisticas/delete_logistica.js';

const router = Router();

// Crear logística
router.post('/', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, [], []); // TODO: definir campos obligatorios para body
    if (missing.length) return res.status(400).json({ message: `Faltan parámetros: ${missing.join(', ')}` });

    try {
        const newItem = await createLogistica(req.body);
        res.status(201).json({ body: newItem, message: 'Creado correctamente' });
        logGreen(`POST /api/logisticas: éxito al crear logística con ID ${newItem.id}`);
    } catch (error) {
        if (error instanceof CustomException) {
            logRed(`Error 400 en logisticas POST: ${error}`);
            return res.status(400).json(error);
        }
        const customError = new CustomException('Internal Error', error.message, error.stack);
        logRed(`Error 500 en logisticas POST: ${error}`);
        res.status(500).json(customError);
    } finally {
        logPurple(`POST /api/logisticas ejecutado en ${performance.now() - start} ms`);
    }
});

// Eliminar logística
router.delete('/:id', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, ['id'], []);
    if (missing.length) return res.status(400).json({ message: `Faltan parámetros: ${missing.join(', ')}` });

    try {
        await deleteLogistica(req.params.id);
        res.status(200).json({ message: 'Eliminado correctamente' });
        logGreen(`DELETE /api/logisticas/${req.params.id}: éxito al eliminar logística`);
    } catch (error) {
        if (error instanceof CustomException) {
            logRed(`Error 400 en logisticas DELETE: ${error}`);
            return res.status(400).json(error);
        }
        const customError = new CustomException('Internal Error', error.message, error.stack);
        logRed(`Error 500 en logisticas DELETE: ${error}`);
        res.status(500).json(customError);
    } finally {
        logPurple(`DELETE /api/logisticas/:id ejecutado en ${performance.now() - start} ms`);
    }
});

// Actualizar logística
router.put('/:id', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, ['id'], []); // TODO: definir campos obligatorios para body
    if (missing.length) return res.status(400).json({ message: `Faltan parámetros: ${missing.join(', ')}` });

    try {
        const updated = await updateLogistica(req.params.id, req.body);
        res.status(200).json({ body: updated, message: 'Actualizado correctamente' });
        logGreen(`PUT /api/logisticas/${req.params.id}: éxito al actualizar logística`);
    } catch (error) {
        if (error instanceof CustomException) {
            logRed(`Error 400 en logisticas PUT: ${error}`);
            return res.status(400).json(error);
        }
        const customError = new CustomException('Internal Error', error.message, error.stack);
        logRed(`Error 500 en logisticas PUT: ${error}`);
        res.status(500).json(customError);
    } finally {
        logPurple(`PUT /api/logisticas/:id ejecutado en ${performance.now() - start} ms`);
    }
});

// Obtener logística por ID
router.get('/:id', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, ['id'], []);
    if (missing.length) return res.status(400).json({ message: `Faltan parámetros: ${missing.join(', ')}` });

    try {
        const item = await getLogisticaById(req.params.id);
        res.status(200).json({ body: item, message: 'Registro obtenido' });
        logGreen(`GET /api/logisticas/${req.params.id}: éxito al obtener logística`);
    } catch (error) {
        if (error instanceof CustomException) {
            logRed(`Error 400 en logisticas GET/:id: ${error}`);
            return res.status(400).json(error);
        }
        const customError = new CustomException('Internal Error', error.message, error.stack);
        logRed(`Error 500 en logisticas GET/:id: ${error}`);
        res.status(500).json(customError);
    } finally {
        logPurple(`GET /api/logisticas/:id ejecutado en ${performance.now() - start} ms`);
    }
});

// Listar todas las logísticas
router.get('/', async (req, res) => {
    const start = performance.now();
    // No required fields for list
    try {
        const list = await getAllLogisticas();
        res.status(200).json({ body: list, message: 'Datos obtenidos correctamente' });
        logGreen('GET /api/logisticas: éxito al listar logísticas');
    } catch (error) {
        if (error instanceof CustomException) {
            logRed(`Error 400 en logisticas GET: ${error}`);
            return res.status(400).json(error);
        }
        const customError = new CustomException('Internal Error', error.message, error.stack);
        logRed(`Error 500 en logisticas GET: ${error}`);
        res.status(500).json(customError);
    } finally {
        logPurple(`GET /api/logisticas ejecutado en ${performance.now() - start} ms`);
    }
});

export default router;