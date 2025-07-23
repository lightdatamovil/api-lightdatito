import { Router } from 'express';
import { performance } from 'perf_hooks';
import { logPurple, logGreen } from '../src/funciones/logsCustom.js';
import { createPuesto } from '../controllers/puestos/create_puesto.js';
import { getAllPuestos } from '../controllers/puestos/get_all_puestos.js';
import { getPuestoById } from '../controllers/puestos/get_puesto_by_id.js';
import { updatePuesto } from '../controllers/puestos/edit_puesto.js';
import { deletePuesto } from '../controllers/puestos/delete_puesto.js';
import { handleError } from '../src/funciones/handle_error.js';
import { verificarTodo } from '../src/funciones/verificarAll.js';
import { Status } from '../models/status.js';

const router = Router();
const requiredBodyFields = ['nombre'];

// Crear un nuevo puesto
router.post('/', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, [], requiredBodyFields)) return;
    try {
        const newItem = await createPuesto(req);
        res.status(Status.created).json({ body: newItem, message: 'Creado correctamente' });
        logGreen(`POST /api/puestos: éxito al crear puesto con ID ${newItem.id}`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`POST /api/puestos ejecutado en ${performance.now() - start} ms`);
    }
});

// Listar todos los puestos
router.get('/', async (req, res) => {
    const start = performance.now();
    try {
        const list = await getAllPuestos();
        res.status(Status.ok).json({ body: list, message: 'Datos obtenidos correctamente', success: true });
        logGreen('GET /api/puestos: éxito al listar puestos');
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`GET /api/puestos ejecutado en ${performance.now() - start} ms`);
    }
});

// Obtener un puesto por ID
router.get('/:id', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, ['id'], [])) return;
    try {
        const item = await getPuestoById(req);
        res.status(Status.ok).json({ body: item, message: 'Registro obtenido' });
        logGreen(`GET /api/puestos/${req.params.id}: éxito al obtener puesto`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`GET /api/puestos/:id ejecutado en ${performance.now() - start} ms`);
    }
});


// Actualizar un puesto
router.put('/:id', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, ['id'], requiredBodyFields)) return;
    try {
        const updated = await updatePuesto(req);
        res.status(Status.ok).json({ body: updated, message: 'Actualizado correctamente' });
        logGreen(`PUT /api/puestos/${req.params.id}: éxito al actualizar puesto`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`PUT /api/puestos/:id ejecutado en ${performance.now() - start} ms`);
    }
});

// Eliminar un puesto
router.delete('/:id', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, ['id'], [])) return;
    try {
        await deletePuesto(req);
        res.status(Status.ok).json({ message: 'Eliminado correctamente' });
        logGreen(`DELETE /api/puestos/${req.params.id}: éxito al eliminar puesto`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`DELETE /api/puestos/:id ejecutado en ${performance.now() - start} ms`);
    }
});

export default router;