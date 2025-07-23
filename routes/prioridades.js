// routes/prioridades.js
import { Router } from 'express';
import { performance } from 'perf_hooks';
import { logPurple, logGreen } from '../src/funciones/logsCustom.js';
import { handleError } from '../src/funciones/handle_error.js';
import { verificarTodo } from '../src/funciones/verificarAll.js';
import { Status } from '../models/status.js';
import { getAllPrioridades } from '../controllers/prioridades/get_all_prioridades.js';
import { getPrioridadesById } from '../controllers/prioridades/get_prioridades_by_id.js';
import { createPrioridades } from '../controllers/prioridades/create_prioridades.js';
import { updatePrioridades } from '../controllers/prioridades/edit_prioridades.js';
import { deletePrioridades } from '../controllers/prioridades/delete_prioridades.js';

const router = Router();
const requiredBodyFields = ['nombre', 'color'];


router.get('/', async (req, res) => {
    const start = performance.now();
    try {
        const list = await getAllPrioridades();
        res.status(Status.ok).json({ body: list, message: 'Datos obtenidos correctamente' });
        logGreen('GET /api/tipo-ticket: éxito al listar tipos de ticket');
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`GET /api/tipo-ticket ejecutado en ${performance.now() - start} ms`);
    }
});

// Obtener un tipo de ticket por ID
router.get('/:id', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, ['id'], [])) return;
    try {
        const item = await getPrioridadesById(req);
        res.status(Status.ok).json({ body: item, message: 'Registro obtenido', success: true });
        logGreen(`GET /api/tipo-ticket/${req.params.id}: éxito al obtener tipo de ticket`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`GET /api/tipo-ticket/:id ejecutado en ${performance.now() - start} ms`);
    }
});

// Crear un nuevo tipo de ticket
router.post('/', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, [], requiredBodyFields)) return;
    try {
        const newItem = await createPrioridades(req);
        res.status(Status.created).json({ body: newItem, message: 'Creado correctamente', success: true });
        logGreen(`POST /api/tipo-ticket: éxito al crear tipo de ticket con ID ${newItem.id}`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`POST /api/tipo-ticket ejecutado en ${performance.now() - start} ms`);
    }
});

// Actualizar un tipo de ticket
router.put('/:id', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, ['id'], requiredBodyFields)) return;
    try {
        const updated = await updatePrioridades(req);
        res.status(Status.ok).json({ body: updated, message: 'Actualizado correctamente', success: true });
        logGreen(`PUT /api/tipo-ticket/${req.params.id}: éxito al actualizar tipo de ticket`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`PUT /api/tipo-ticket/:id ejecutado en ${performance.now() - start} ms`);
    }
});

// Eliminar un tipo de ticket
router.delete('/:id', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, ['id'], [])) return;
    try {
        await deletePrioridades(req);
        res.status(Status.ok).json({ message: 'Eliminado correctamente', success: true });
        logGreen(`DELETE /api/tipo-ticket/${req.params.id}: éxito al eliminar tipo de ticket`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`DELETE /api/tipo-ticket/:id ejecutado en ${performance.now() - start} ms`);
    }
});

export default router;