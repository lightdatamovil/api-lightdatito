import { Router } from 'express';
import { performance } from 'perf_hooks';
import { logPurple, logGreen } from '../src/funciones/logsCustom.js';
import { verificarTodo } from '../src/funciones/verificarAllt.js';
import { createHerramienta } from '../controllers/herramientas/create_herramienta.js';
import { getAllHerramientas } from '../controllers/herramientas/get_all_herramientas.js';
import { getHerramientaById } from '../controllers/herramientas/get_herramienta_by_id.js';
import { updateHerramienta } from '../controllers/herramientas/edit_herramienta.js';
import { deleteHerramienta } from '../controllers/herramientas/delete_herramienta.js';
import { handleError } from '../src/funciones/handle_error.js';
import { Status } from '../models/status.js';

const router = Router();

// Crear nueva herramienta
router.post('/', async (req, res) => {
    const start = performance.now();
    const requiredBodyFields = ['nombre'];
    if (!verificarTodo(req, res, requiredBodyFields)) return;

    try {
        const { nombre } = req.body;
        const newItem = await createHerramienta(nombre);
        res.status(Status.created).json({ body: newItem, message: 'Creado correctamente' });
        logGreen(`POST /api/herramientas: éxito al crear herramienta con ID ${newItem.id}`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`POST /api/herramientas ejecutado en ${performance.now() - start} ms`);
    }
});

// Listar todas las herramientas
router.get('/', async (req, res) => {
    const start = performance.now();
    try {
        const list = await getAllHerramientas();
        res.status(Status.ok).json({ body: list, message: 'Datos obtenidos correctamente' });
        logGreen('GET /api/herramientas: éxito al listar herramientas');
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`GET /api/herramientas ejecutado en ${performance.now() - start} ms`);
    }
});

// Obtener un herramienta por ID
router.get('/:id', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, ['id'])) return;
    try {
        const item = await getHerramientaById(req.params.id);
        res.status(Status.ok).json({ body: item, message: 'Registro obtenido' });
        logGreen(`GET /api/herramientas/${req.params.id}: éxito al obtener herramienta`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`GET /api/herramientas/:id ejecutado en ${performance.now() - start} ms`);
    }
});

// Actualizar una herramienta
router.put('/:id', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, ['id'])) return;
    try {
        const updated = await updateHerramienta(req.params.id, req.body);
        res.status(Status.ok).json({ body: updated, message: 'Actualizado correctamente' });
        logGreen(`PUT /api/herramientas/${req.params.id}: éxito al actualizar herramienta`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`PUT /api/herramientas/:id ejecutado en ${performance.now() - start} ms`);
    }
});

// Eliminar un herramienta
router.delete('/:id', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, ['id'])) return;
    try {
        await deleteHerramienta(req.params.id);
        res.status(Status.ok).json({ message: 'Eliminado correctamente' });
        logGreen(`DELETE /api/herramientas/${req.params.id}: éxito al eliminar herramienta`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`DELETE /api/herramientas/:id ejecutado en ${performance.now() - start} ms`);
    }
});

export default router;