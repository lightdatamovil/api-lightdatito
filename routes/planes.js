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
    const missing = verifyAll(req, [], ['nombre', 'color']);
    if (missing.length) {
        const ex = new CustomException({
            title: 'Faltan campos',
            message: `Faltan campos: ${missing.join(', ')}`
        });
        logRed('Error 400 POST /api/planes:', ex.toJSON());
        return res.status(400).json(ex.toJSON());
    }

    try {
        const { nombre, color } = req.body;
        const newPlan = await createPlan(nombre, color);
        res.status(201).json({ body: newPlan, message: 'Creado correctamente' });
        logGreen(`POST /api/planes: éxito al crear plan con ID ${newPlan.id}`);
    } catch (err) {
        if (err instanceof CustomException) {
            logRed('Error 400 POST /api/planes:', err.toJSON());
            return res.status(400).json(err.toJSON());
        }
        const fatal = new CustomException({
            title: 'Internal Server Error',
            message: err.message,
            stack: err.stack
        });
        logRed('Error 500 POST /api/planes:', fatal.toJSON());
        res.status(500).json(fatal.toJSON());
    } finally {
        logPurple(`POST /api/planes ejecutado en ${performance.now() - start} ms`);
    }
});

// Listar todos los planes
router.get('/', async (req, res) => {
    const start = performance.now();
    try {
        const list = await getAllPlanes();
        res.status(200).json({ body: list, message: 'Datos obtenidos correctamente' });
        logGreen('GET /api/planes: éxito al listar planes');
    } catch (err) {
        if (err instanceof CustomException) {
            logRed('Error 400 GET /api/planes:', err.toJSON());
            return res.status(400).json(err.toJSON());
        }
        const fatal = new CustomException({
            title: 'Internal Server Error',
            message: err.message,
            stack: err.stack
        });
        logRed('Error 500 GET /api/planes:', fatal.toJSON());
        res.status(500).json(fatal.toJSON());
    } finally {
        logPurple(`GET /api/planes ejecutado en ${performance.now() - start} ms`);
    }
});

// Obtener un plan por ID
router.get('/:id', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, ['id'], []);
    if (missing.length) {
        const ex = new CustomException({
            title: 'Faltan parámetros',
            message: `Faltan parámetros: ${missing.join(', ')}`
        });
        logRed(`Error 400 GET /api/planes/${req.params.id}:`, ex.toJSON());
        return res.status(400).json(ex.toJSON());
    }

    try {
        const plan = await getPlanById(req.params.id);
        res.status(200).json({ body: plan, message: 'Registro obtenido' });
        logGreen(`GET /api/planes/${req.params.id}: éxito al obtener plan`);
    } catch (err) {
        if (err instanceof CustomException) {
            logRed(`Error 400 GET /api/planes/${req.params.id}:`, err.toJSON());
            return res.status(400).json(err.toJSON());
        }
        const fatal = new CustomException({
            title: 'Internal Server Error',
            message: err.message,
            stack: err.stack
        });
        logRed(`Error 500 GET /api/planes/${req.params.id}:`, fatal.toJSON());
        res.status(500).json(fatal.toJSON());
    } finally {
        logPurple(
            `GET /api/planes/:id ejecutado en ${performance.now() - start} ms`
        );
    }
});

// Actualizar un plan
router.put('/:id', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, ['id'], ['nombre', 'color']);
    if (missing.length) {
        const ex = new CustomException({
            title: 'Faltan campos',
            message: `Faltan campos: ${missing.join(', ')}`
        });
        logRed(`Error 400 PUT /api/planes/${req.params.id}:`, ex.toJSON());
        return res.status(400).json(ex.toJSON());
    }

    try {
        const updated = await updatePlan(req.params.id, req.body);
        res.status(200).json({ body: updated, message: 'Actualizado correctamente' });
        logGreen(`PUT /api/planes/${req.params.id}: éxito al actualizar plan`);
    } catch (err) {
        if (err instanceof CustomException) {
            logRed(`Error 400 PUT /api/planes/${req.params.id}:`, err.toJSON());
            return res.status(400).json(err.toJSON());
        }
        const fatal = new CustomException({
            title: 'Internal Server Error',
            message: err.message,
            stack: err.stack
        });
        logRed(`Error 500 PUT /api/planes/${req.params.id}:`, fatal.toJSON());
        res.status(500).json(fatal.toJSON());
    } finally {
        logPurple(
            `PUT /api/planes/:id ejecutado en ${performance.now() - start} ms`
        );
    }
});

// Eliminar un plan
router.delete('/:id', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, ['id'], []);
    if (missing.length) {
        const ex = new CustomException({
            title: 'Faltan parámetros',
            message: `Faltan parámetros: ${missing.join(', ')}`
        });
        logRed(`Error 400 DELETE /api/planes/${req.params.id}:`, ex.toJSON());
        return res.status(400).json(ex.toJSON());
    }

    try {
        await deletePlan(req.params.id);
        res.status(200).json({ message: 'Eliminado correctamente' });
        logGreen(`DELETE /api/planes/${req.params.id}: éxito al eliminar plan`);
    } catch (err) {
        if (err instanceof CustomException) {
            logRed(`Error 400 DELETE /api/planes/${req.params.id}:`, err.toJSON());
            return res.status(400).json(err.toJSON());
        }
        const fatal = new CustomException({
            title: 'Internal Server Error',
            message: err.message,
            stack: err.stack
        });
        logRed(`Error 500 DELETE /api/planes/${req.params.id}:`, fatal.toJSON());
        res.status(500).json(fatal.toJSON());
    } finally {
        logPurple(
            `DELETE /api/planes/:id ejecutado en ${performance.now() - start} ms`
        );
    }
});

export default router;
