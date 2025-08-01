import { Router } from 'express';
import { performance } from 'perf_hooks';
import { logPurple, logGreen } from '../src/funciones/logsCustom.js';
import { verificarTodo } from '../src/funciones/verificarAll.js';
import { Status } from '../models/status.js';
import { createAviso } from '../controllers/avisos/create_aviso.js';
import { handleError } from '../src/funciones/handle_error.js';
import { getAllAvisos } from '../controllers/avisos/get_all_aviso.js';
import { getAvisoById } from '../controllers/avisos/get_aviso_by_id.js';
import { updateAviso } from '../controllers/avisos/edit_aviso.js';
import { deleteAviso } from '../controllers/avisos/delete_aviso.js';

const router = Router();
const requiredBodyFields = ['titulo', 'descripcion', 'fecha', 'usuarioId'];

// Crear nuevo aviso
router.post('/', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, [], requiredBodyFields)) return;
    try {
        const newItem = await createAviso(req);
        res.status(Status.created).json({ body: newItem, message: 'Creado correctamente', success: true });
        logGreen(`POST /api/avisos: éxito al crear aviso con ID ${newItem.id}`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`POST /api/avisos ejecutado en ${performance.now() - start} ms`);
    }
});

// Listar todas las avisos
router.get('/', async (req, res) => {
    const start = performance.now();
    try {
        const list = await getAllAvisos();
        res.status(Status.ok).json({ body: list, message: 'Datos obtenidos correctamente', success: true });
        logGreen('GET /api/avisos: éxito al listar avisos');
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`GET /api/avisos ejecutado en ${performance.now() - start} ms`);
    }
});

// Obtener un aviso por ID
router.get('/:id', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, ['id'], [])) return;
    try {
        const item = await getAvisoById(req);
        res.status(Status.ok).json({ body: item, message: 'Registro obtenido', success: true });
        logGreen(`GET /api/avisos/${req.params.id}: éxito al obtener aviso`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`GET /api/avisos/:id ejecutado en ${performance.now() - start} ms`);
    }
});

// Actualizar una aviso
router.put('/:id', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, ['id'], requiredBodyFields)) return;
    try {
        const updated = await updateAviso(req);
        res.status(Status.ok).json({ body: updated, message: 'Actualizado correctamente', success: true });
        logGreen(`PUT /api/avisos/${req.params.id}: éxito al actualizar aviso`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`PUT /api/avisos/:id ejecutado en ${performance.now() - start} ms`);
    }
});

// Eliminar un aviso
router.delete('/:id', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, ['id'])) return;
    try {
        await deleteAviso(req);
        res.status(Status.ok).json({ message: 'Eliminado correctamente', success: true });
        logGreen(`DELETE /api/avisos/${req.params.id}: éxito al eliminar aviso`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`DELETE /api/avisos/:id ejecutado en ${performance.now() - start} ms`);
    }
});

export default router;