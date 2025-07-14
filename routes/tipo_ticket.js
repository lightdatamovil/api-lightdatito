// routes/tipoticket.js
import { Router } from 'express';
import { performance } from 'perf_hooks';
import { logPurple, logGreen } from '../src/funciones/logsCustom.js';
import { createTipoticket } from '../controllers/tipo_ticket/create_tipo_ticket.js';
import { getTipoticketById } from '../controllers/tipo_ticket/get_tipo_ticket_by_id.js';
import { getAllTipoticket } from '../controllers/tipo_ticket/get_all_tipos_tickets.js';
import { updateTipoticket } from '../controllers/tipo_ticket/edit_tipo_ticket.js';
import { deleteTipoticket } from '../controllers/tipo_ticket/delete_tipo_ticket.js';
import { handleError } from '../src/funciones/handle_error.js';
import { verificarTodo } from '../src/funciones/verificarAllt.js';

const router = Router();

router.get('/', async (req, res) => {
    const start = performance.now();
    try {
        const list = await getAllTipoticket();
        res.status(200).json({ body: list, message: 'Datos obtenidos correctamente' });
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
        const item = await getTipoticketById(req.params.id);
        res.status(200).json({ body: item, message: 'Registro obtenido' });
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
    const requiredBodyFields = ['nombre', 'color'];
    if (!verificarTodo(req, res, [], requiredBodyFields)) return;
    try {
        const { nombre, color } = req.body;
        const newItem = await createTipoticket(nombre, color);
        res.status(201).json({ body: newItem, message: 'Creado correctamente' });
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
    if (!verificarTodo(req, res, ['id'])) return;

    try {
        const updated = await updateTipoticket(req.params.id, req.body);
        res.status(200).json({ body: updated, message: 'Actualizado correctamente' });
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
        await deleteTipoticket(req.params.id);
        res.status(200).json({ message: 'Eliminado correctamente' });
        logGreen(`DELETE /api/tipo-ticket/${req.params.id}: éxito al eliminar tipo de ticket`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`DELETE /api/tipo-ticket/:id ejecutado en ${performance.now() - start} ms`);
    }
});

export default router;