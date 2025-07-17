import { Router } from 'express';
import { performance } from 'perf_hooks';
import { logPurple, logGreen } from '../src/funciones/logsCustom.js';
import { createEstadoLogistica } from '../controllers/estado_logistica/create_estado_logistica.js';
import { getAllEstadosLogisticas } from '../controllers/estado_logistica/get_all_estados_logistica.js';
import { getEstadoLogisticaById } from '../controllers/estado_logistica/get_estado_logistica_by_id.js';
import { updateEstadoLogistica } from '../controllers/estado_logistica/edit_estado_logistica.js';
import { deleteEstadoLogistica } from '../controllers/estado_logistica/delete_estado_logistica.js';
import { handleError } from '../src/funciones/handle_error.js';
import { verificarTodo } from '../src/funciones/verificarAll.js';
import { Status } from '../models/status.js';

const router = Router();
const requiredBodyFields = ['nombre', 'color'];

// Crear estado de logística
router.post('/', async (req, res) => {
    const start = performance.now();
    // validación de body
    if (!verificarTodo(req, res, requiredBodyFields)) return;
    try {
        const newItem = await createEstadoLogistica(req);
        res.status(Status.created).json({ body: newItem, message: 'Creado correctamente' });
        logGreen(`POST /api/estados-logistica: éxito al crear estado con ID ${newItem.id}`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(
            `POST /api/estados-logistica ejecutado en ${performance.now() - start} ms`
        );
    }
});

// Listar todos los estados de logística
router.get('/', async (req, res) => {
    const start = performance.now();
    try {
        const list = await getAllEstadosLogisticas();
        res.status(Status.ok).json({ body: list, message: 'Datos obtenidos correctamente' });
        logGreen('GET /api/estados-logistica: éxito al listar estados');
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(
            `GET /api/estados-logistica ejecutado en ${performance.now() - start} ms`
        );
    }
});

// Obtener un estado de logística por ID
router.get('/:id', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, ['id'], [])) return;
    try {
        const item = await getEstadoLogisticaById(req);
        res.status(Status.ok).json({ body: item, message: 'Registro obtenido' });
        logGreen(`GET /api/estados-logistica/${req.params.id}: éxito al obtener estado`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(
            `GET /api/estados-logistica/:id ejecutado en ${performance.now() - start} ms`
        );
    }
});


router.put('/:id', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, ['id'], requiredBodyFields)) return;
    try {
        const updated = await updateEstadoLogistica(req);
        res.status(Status.ok).json({ body: updated.toJson(), message: 'Actualizado correctamente' });
        logGreen(`PUT /api/estados-logistica/${req.params.id}: éxito al actualizar estado`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(
            `PUT /api/estados-logistica/:id ejecutado en ${performance.now() - start} ms`
        );
    }
});

// Eliminar estado de logística
router.delete('/:id', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, ['id'])) return;
    try {
        await deleteEstadoLogistica(req);
        res.status(Status.ok).json({ message: 'Eliminado correctamente' });
        logGreen(`DELETE /api/estados-logistica/${req.params.id}: éxito al eliminar estado`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(
            `DELETE /api/estados-logistica/:id ejecutado en ${performance.now() - start} ms`
        );
    }
});

export default router;
