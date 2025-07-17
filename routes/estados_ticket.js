import { Router } from 'express';
import { performance } from 'perf_hooks';
import { logPurple, logGreen } from '../src/funciones/logsCustom.js';
import { createEstadoticket } from '../controllers/estado_ticket/create_estado_ticket.js';
import { getAllEstadosticket } from '../controllers/estado_ticket/get_all_estados_tickets.js';
import { getEstadoticketById } from '../controllers/estado_ticket/get_estado_ticket_by_id.js';
import { updateEstadoticket } from '../controllers/estado_ticket/edit_estado_ticket.js';
import { deleteEstadoticket } from '../controllers/estado_ticket/delete_estado_ticket.js';
import { handleError } from '../src/funciones/handle_error.js';
import { verificarTodo } from '../src/funciones/verificarAll.js';
import { Status } from '../models/status.js';

const router = Router();
const requiredBodyFields = ['nombre', 'color'];

router.get('/', async (req, res) => {
    const start = performance.now();
    try {
        const list = await getAllEstadosticket();
        res.status(Status.ok).json({ body: list, message: 'Datos obtenidos correctamente' });
        logGreen('GET /api/estados-ticket: éxito al listar estados de ticket');
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`GET /api/estados-ticket ejecutado en ${performance.now() - start} ms`);
    }
});

// Obtener por ID
router.get('/:id', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, ['id'], [])) return;
    try {
        const item = await getEstadoticketById(req);
        res.status(Status.ok).json({ body: item, message: 'Registro obtenido' });
        logGreen(`GET /api/estados-ticket/${req.params.id}: éxito al obtener estado de ticket`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`GET /api/estados-ticket/:id ejecutado en ${performance.now() - start} ms`);
    }
});

// Crear (POST)
router.post('/', async (req, res) => {
    const start = performance.now();

    if (!verificarTodo(req, res, requiredBodyFields)) return;
    try {
        const newItem = await createEstadoticket(req);
        res.status(Status.created).json({ body: newItem, message: 'Creado correctamente' });
        logGreen(`POST /api/estados-ticket: éxito al crear estado de ticket con ID ${newItem.id}`
        );
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`POST /api/estados-ticket ejecutado en ${performance.now() - start} ms`);
    }
});

// Actualizar (PUT)
router.put('/:id', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, ['id'], req)) return;
    try {
        const updatedItem = await updateEstadoticket(req);
        res.status(Status.ok).json({ body: updatedItem, message: 'Actualizado correctamente' });
        logGreen(`PUT /api/estados-ticket/${req.params.id}: éxito al actualizar`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`PUT /api/estados-ticket/:id ejecutado en ${performance.now() - start} ms`);
    }
});

// Eliminar (DELETE)
router.delete('/:id', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, ['id'])) return;
    try {
        await deleteEstadoticket(req);
        res.status(Status.ok).json({ message: 'Eliminado correctamente' });
        logGreen(`DELETE /api/estados-ticket/${req.params.id}: éxito al eliminar`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(
            `DELETE /api/estados-ticket/:id ejecutado en ${performance.now() - start} ms`
        );
    }
});

export default router;