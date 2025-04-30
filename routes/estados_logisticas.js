import { Router } from 'express';
import { performance } from 'perf_hooks';
import { logRed, logPurple, logGreen } from '../src/funciones/logsCustom.js';
import { verifyAll } from '../src/funciones/verifyParameters.js';
import CustomException from '../models/custom_exception.js';
import { createEstadoLogistica } from '../controllers/estado_logistica/create_estado_logistica.js';
import { getAllEstadosLogisticas } from '../controllers/estado_logistica/get_all_estados_logistica.js';
import { getEstadoLogisticaById } from '../controllers/estado_logistica/get_estado_logistica_by_id.js';
import { updateEstadoLogistica } from '../controllers/estado_logistica/edit_estado_logistica.js';
import { deleteEstadoLogistica } from '../controllers/estado_logistica/delete_estado_logistica.js';

const router = Router();

// Crear estado de logística
router.post('/', async (req, res) => {
    const start = performance.now();
    try {
        const errorMessage = verifyAll(req, [], ['nombre', 'color']);

        if (errorMessage.length) {
            logRed(`Error en create-estado-logistica: ${errorMessage}`);
            throw new CustomException({
                title: 'Error en create-estado-logistica',
                message: errorMessage
            });
        }

        const { nombre, color } = req.body;
        const newItem = await createEstadoLogistica(nombre, color);
        res.status(201).json({ body: newItem, message: 'Creado correctamente' });
        logGreen(`POST /api/estados-logisticas: éxito al crear estado con ID ${newItem.id}`);
    } catch (error) {
        if (error instanceof CustomException) {
            logRed(`Error 400 en estados-logisticas POST: ${error}`);
            return res.status(400).json(error);
        }
        const customError = new CustomException('Internal Error', error.message, error.stack);
        logRed(`Error 500 en estados-logisticas POST: ${error}`);
        res.status(500).json(customError);
    } finally {
        logPurple(`POST /api/estados-logisticas ejecutado en ${performance.now() - start} ms`);
    }
});

// Listar todos los estados de logística
router.get('/', async (req, res) => {
    const start = performance.now();
    try {
        const list = await getAllEstadosLogisticas();
        res.status(200).json({ body: list, message: 'Datos obtenidos correctamente' });
        logGreen('GET /api/estados-logisticas: éxito al listar estados');
    } catch (error) {
        if (error instanceof CustomException) {
            logRed(`Error 400 en estados-logisticas GET: ${error}`);
            return res.status(400).json(error);
        }
        const customError = new CustomException('Internal Error', error.message, error.stack);
        logRed(`Error 500 en estados-logisticas GET: ${error}`);
        res.status(500).json(customError);
    } finally {
        logPurple(`GET /api/estados-logisticas ejecutado en ${performance.now() - start} ms`);
    }
});

// Obtener un estado de logística
router.get('/:id', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, ['id'], []);
    if (missing.length) return res.status(400).json({ message: `Faltan parámetros: ${missing.join(', ')}` });
    try {
        const item = await getEstadoLogisticaById(req.params.id);
        res.status(200).json({ body: item, message: 'Registro obtenido' });
        logGreen(`GET /api/estados-logisticas/${req.params.id}: éxito al obtener estado`);
    } catch (error) {
        if (error instanceof CustomException) {
            logRed(`Error 400 en estados-logisticas GET/:id: ${error}`);
            return res.status(400).json(error);
        }
        const customError = new CustomException('Internal Error', error.message, error.stack);
        logRed(`Error 500 en estados-logisticas GET/:id: ${error}`);
        res.status(500).json(customError);
    } finally {
        logPurple(`GET /api/estados-logisticas/:id ejecutado en ${performance.now() - start} ms`);
    }
});

// Actualizar estado de logística
router.put('/:id', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, ['id'], []);
    if (missing.length) return res.status(400).json({ message: `Faltan parámetros: ${missing.join(', ')}` });
    try {
        const updated = await updateEstadoLogistica(req.params.id, req.body);
        res.status(200).json({ body: updated, message: 'Actualizado correctamente' });
        logGreen(`PUT /api/estados-logisticas/${req.params.id}: éxito al actualizar estado`);
    } catch (error) {
        if (error instanceof CustomException) {
            logRed(`Error 400 en estados-logisticas PUT: ${error}`);
            return res.status(400).json(error);
        }
        const customError = new CustomException('Internal Error', error.message, error.stack);
        logRed(`Error 500 en estados-logisticas PUT: ${error}`);
        res.status(500).json(customError);
    } finally {
        logPurple(`PUT /api/estados-logisticas/:id ejecutado en ${performance.now() - start} ms`);
    }
});

// Eliminar estado de logística
router.delete('/:id', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, ['id'], []);
    if (missing.length) return res.status(400).json({ message: `Faltan parámetros: ${missing.join(', ')}` });
    try {
        await deleteEstadoLogistica(req.params.id);
        res.status(200).json({ message: 'Eliminado correctamente' });
        logGreen(`DELETE /api/estados-logisticas/${req.params.id}: éxito al eliminar estado`);
    } catch (error) {
        if (error instanceof CustomException) {
            logRed(`Error 400 en estados-logisticas DELETE: ${error}`);
            return res.status(400).json(error);
        }
        const customError = new CustomException('Internal Error', error.message, error.stack);
        logRed(`Error 500 en estados-logisticas DELETE: ${error}`);
        res.status(500).json(customError);
    } finally {
        logPurple(`DELETE /api/estados-logisticas/:id ejecutado en ${performance.now() - start} ms`);
    }
});

export default router;