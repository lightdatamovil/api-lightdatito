// routes/tickets.js
import { Router } from 'express';
import { performance } from 'perf_hooks';
import { logPurple, logGreen } from '../src/funciones/logsCustom.js';
import { handleError } from '../src/funciones/handle_error.js';
import { verificarTodo } from '../src/funciones/verificarAll.js';
import { createticket } from '../controllers/ticket.js/create_ticket.js';
import { getAlltickets } from '../controllers/ticket.js/get_all_tickets.js';
import { getticketById } from '../controllers/ticket.js/get_ticket_by_id.js';
import { updateticket } from '../controllers/ticket.js/edit_ticket.js';
import { deleteTicket } from '../controllers/ticket.js/delete_ticket.js';
import { Status } from '../models/status.js';


const router = Router();
const requiredBodyFields = [
    'titulo',
    'descripcion',
    'tipo_ticket_id',
    'observador',
    'proyecto_id',
    'logistica_id',];

// Crear un nuevo ticket
router.post('/', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, [], requiredBodyFields)) return;
    try {
        const newItem = await createticket(req);
        res.status(201).json({ body: newItem, message: 'Creado correctamente' });
        logGreen(`POST /api/tickets: éxito al crear ticket ID ${newItem.id}`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`POST /api/tickets ejecutado en ${performance.now() - start} ms`);
    }
});

// Listar todos los tickets
router.get('/', async (req, res) => {
    const start = performance.now();
    try {
        const list = await getAlltickets();
        res.status(Status.ok).json({ body: list, message: 'Datos obtenidos correctamente', success: true });
        logGreen('GET /api/tickets: éxito al listar tickets');
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`GET /api/tickets ejecutado en ${performance.now() - start} ms`);
    }
});

// Obtener un ticket por ID
router.get('/:id', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, ['id'])) return;
    try {
        const item = await getticketById(req);
        res.status(Status.ok).json({ body: item, message: 'Registro obtenido' });
        logGreen(`GET /api/tickets/${req.params.id}: éxito al obtener ticket`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`GET /api/tickets/:id ejecutado en ${performance.now() - start} ms`);
    }
});

// Actualizar un ticket
router.put('/:id', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, ['id'], requiredBodyFields)) return;
    try {
        const updated = await updateticket(req);
        res.status(Status.ok).json({ body: updated, message: 'Actualizado correctamente' });
        logGreen(`PUT /api/tickets/${req.params.id}: éxito al actualizar ticket`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`PUT /api/tickets/:id ejecutado en ${performance.now() - start} ms`);
    }
});

// Eliminar un ticket
router.delete('/:id', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, ['id'])) return;
    try {
        await deleteTicket(req);
        res.status(Status.ok).json({ message: 'Eliminado correctamente' });
        logGreen(`DELETE /api/tickets/${req.params.id}: éxito al eliminar ticket`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`DELETE /api/tickets/:id ejecutado en ${performance.now() - start} ms`);
    }
});


export default router;
