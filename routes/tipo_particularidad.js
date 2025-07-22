// routes/tipo_particularidad.js
import { Router } from 'express';
import { performance } from 'perf_hooks';
import { logGreen, logPurple } from '../src/funciones/logsCustom.js';
import { verificarTodo } from '../src/funciones/verificarAllt.js';
import { handleError } from '../src/funciones/handle_error.js'; // o ruta individual
import { Status } from '../models/status.js';
import { createTipoParticularidad } from '../controllers/tipo_particularidad/crear_tipo_particuaridad.js';
import { getAllTipoParticularidad } from '../controllers/tipo_particularidad/get_all_tipo_particularidad.js';
import { getTipoParticularidadById } from '../controllers/tipo_particularidad/get_tipo_particularidad_by_id.js';
import { editTipoParticularidad } from '../controllers/tipo_particularidad/edit_tipo_particularidad.js';
import { deleteTipoParticularidad } from '../controllers/tipo_particularidad/delete_tipo_particularidad.js';

const router = Router();

// Crear
router.post('/', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, [], ['nombre'])) return;
    try {
        const newItem = await createTipoParticularidad(req);
        res.status(Status.created).json({ body: newItem, message: 'Creado correctamente' });
        logGreen(`POST /api/tipo_particularidad: creado id ${newItem.id}`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`POST /api/tipo_particularidad ejecutado en ${performance.now() - start} ms`);
    }
}
);

// Listar todos
router.get('/', async (req, res) => {
    const start = performance.now();
    try {
        const list = await getAllTipoParticularidad();
        res.status(Status.ok).json({ body: list, message: 'Listado OK' });
        logGreen('GET /api/tipo_particularidad: listado completo');
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`GET /api/tipo_particularidad ejecutado en ${performance.now() - start} ms`);
    }
});

// Obtener por ID
router.get('/:id', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, ['id'], [])) return;
    try {
        const item = await getTipoParticularidadById(req);
        res.status(Status.ok).json({ body: item, message: 'Registro obtenido' });
        logGreen(`GET /api/tipo_particularidad/${req.params.id}: éxito`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`GET /api/tipo_particularidad/:id ejecutado en ${performance.now() - start} ms`);
    }
});

// Actualizar
router.put('/:id', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, ['id'], [])) return;
    try {
        const updated = await editTipoParticularidad(req);
        res.status(Status.ok).json({ body: updated, message: 'Actualizado correctamente' });
        logGreen(`PUT /api/tipo_particularidad/${req.params.id}: éxito`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`PUT /api/tipo_particularidad/:id ejecutado en ${performance.now() - start} ms`);
    }
});

// Eliminar (soft delete)
router.put('/:id', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, ['id'], [])) return;

    try {
        await deleteTipoParticularidad(req);
        res.status(Status.ok).json({ message: 'Eliminado correctamente' });
        logGreen(`DELETE /api/tipo_particularidad/${req.params.id}: eliminado`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`DELETE /api/tipo_particularidad/:id ejecutado en ${performance.now() - start} ms`);
    }
});

export default router;
