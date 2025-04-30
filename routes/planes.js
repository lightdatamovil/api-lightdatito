import { Router } from 'express';
import { performance } from 'perf_hooks';
import { logRed, logPurple, logGreen } from '../src/funciones/logsCustom.js';
import { verifyAll } from '../src/funciones/verifyParameters.js';
import CustomException from '../models/custom_exception.js';
import { createPlan } from '../controllers/planes/create_plan.js';
import { getAllPlanes } from '../controllers/planes/get_all_planes.js';
import { getPlanById } from '../controllers/planes/get_plan_by_id.js';
import { updatePlan } from '../controllers/planes/edit_plan.js';
import { deletePlan } from '../controllers/planes/delete_plan.js';

const router = Router();

// Crear un nuevo plan
router.post('/', async (req, res) => {
    const start = performance.now();
    try {
        const errorMessage = verifyAll(req, [], ['nombre', 'color']);

        if (errorMessage.length) {
            logRed(`Error en create-plan: ${errorMessage}`);
            throw new CustomException({
                title: 'Error en create-plan',
                message: errorMessage
            });
        }

        const { nombre, color } = req.body;
        const newItem = await createPlan(nombre, color);
        res.status(201).json({ body: newItem, message: 'Creado correctamente' });
        logGreen(`POST /api/planes: éxito al crear plan con ID ${newItem.id}`);
    } catch (error) {
        if (error instanceof CustomException) {
            logRed(`Error 400 en planes POST: ${error}`);
            return res.status(400).json(error);
        }
        const customError = new CustomException('Internal Error', error.message, error.stack);
        logRed(`Error 500 en planes POST: ${error}`);
        res.status(500).json(customError);
    } finally {
        logPurple(`POST /api/planes ejecutado en ${performance.now() - start} ms`);
    }
});

// Obtener todos los planes
router.get('/', async (req, res) => {
    const start = performance.now();
    try {
        const list = await getAllPlanes();
        res.status(200).json({ body: list, message: 'Datos obtenidos correctamente' });
        logGreen('GET /api/planes: éxito al listar planes');
    } catch (error) {
        if (error instanceof CustomException) {
            logRed(`Error 400 en planes GET: ${error}`);
            return res.status(400).json(error);
        }
        const customError = new CustomException('Internal Error', error.message, error.stack);
        logRed(`Error 500 en planes GET: ${error}`);
        res.status(500).json(customError);
    } finally {
        logPurple(`GET /api/planes ejecutado en ${performance.now() - start} ms`);
    }
});

// Obtener un plan por ID
router.get('/:id', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, ['id'], []);
    if (missing.length) return res.status(400).json({ message: `Faltan parámetros: ${missing.join(', ')}` });
    try {
        const item = await getPlanById(req.params.id);
        res.status(200).json({ body: item, message: 'Registro obtenido' });
        logGreen(`GET /api/planes/${req.params.id}: éxito al obtener plan`);
    } catch (error) {
        if (error instanceof CustomException) {
            logRed(`Error 400 en planes GET/:id: ${error}`);
            return res.status(400).json(error);
        }
        const customError = new CustomException('Internal Error', error.message, error.stack);
        logRed(`Error 500 en planes GET/:id: ${error}`);
        res.status(500).json(customError);
    } finally {
        logPurple(`GET /api/planes/:id ejecutado en ${performance.now() - start} ms`);
    }
});

// Actualizar un plan
router.put('/:id', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, ['id'], ['nombre', 'color']);
    if (missing.length) return res.status(400).json({ message: `Faltan parámetros: ${missing.join(', ')}` });
    try {
        const updated = await updatePlan(req.params.id, req.body);
        res.status(200).json({ body: updated, message: 'Actualizado correctamente' });
        logGreen(`PUT /api/planes/${req.params.id}: éxito al actualizar plan`);
    } catch (error) {
        if (error instanceof CustomException) {
            logRed(`Error 400 en planes PUT: ${error}`);
            return res.status(400).json(error);
        }
        const customError = new CustomException('Internal Error', error.message, error.stack);
        logRed(`Error 500 en planes PUT: ${error}`);
        res.status(500).json(customError);
    } finally {
        logPurple(`PUT /api/planes/:id ejecutado en ${performance.now() - start} ms`);
    }
});

// Eliminar un plan
router.delete('/:id', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, ['id'], []);
    if (missing.length) return res.status(400).json({ message: `Faltan parámetros: ${missing.join(', ')}` });
    try {
        await deletePlan(req.params.id);
        res.status(200).json({ message: 'Eliminado correctamente' });
        logGreen(`DELETE /api/planes/${req.params.id}: éxito al eliminar plan`);
    } catch (error) {
        if (error instanceof CustomException) {
            logRed(`Error 400 en planes DELETE: ${error}`);
            return res.status(400).json(error);
        }
        const customError = new CustomException('Internal Error', error.message, error.stack);
        logRed(`Error 500 en planes DELETE: ${error}`);
        res.status(500).json(customError);
    } finally {
        logPurple(`DELETE /api/planes/:id ejecutado en ${performance.now() - start} ms`);
    }
});

export default router;
