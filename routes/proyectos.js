import { Router } from 'express';
import { performance } from 'perf_hooks';
import { logPurple, logGreen } from '../src/funciones/logsCustom.js';
import { createProyecto } from '../controllers/proyectos/create_proyecto.js';
import { getAllProyectos } from '../controllers/proyectos/get_all_proyectos.js';
import { getProyectoById } from '../controllers/proyectos/get_proyecto_by_id.js';
import { updateProyecto } from '../controllers/proyectos/edit_proyecto.js';
import { deleteProyecto } from '../controllers/proyectos/delete_proyecto.js';
import { handleError } from '../src/funciones/handle_error.js';
import { verificarTodo } from '../src/funciones/verificarAll.js';
import { Status } from '../models/status.js';


const router = Router();
const requiredBodyFields = ['nombre', 'fecha_inicio', 'fecha_finalizado', 'descripcion'];

// Crear un nuevo proyecto
router.post('/', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, [], requiredBodyFields)) return;
    try {
        const newItem = await createProyecto(req);
        res.status(Status.created).json({ body: newItem, message: 'Creado correctamente' });
        logGreen(`POST /api/proyectos: éxito al crear proyecto con ID ${newItem.id}`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`POST /api/proyectos ejecutado en ${performance.now() - start} ms`);
    }
});

// Listar todos los proyectos
router.get('/', async (req, res) => {
    const start = performance.now();
    try {
        const list = await getAllProyectos();
        res.status(Status.ok).json({ body: list, message: 'Datos obtenidos correctamente', success: true });
        logGreen('GET /api/proyectos: éxito al listar proyectos');
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`GET /api/proyectos ejecutado en ${performance.now() - start} ms`);
    }
});

// Obtener un proyecto por ID
router.get('/:id', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, ['id'])) return;
    try {
        const item = await getProyectoById(req);
        res.status(Status.ok).json({ body: item, message: 'Registro obtenido' });
        logGreen(`GET /api/proyectos/${req.params.id}: éxito al obtener proyecto`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`GET /api/proyectos/:id ejecutado en ${performance.now() - start} ms`);
    }
});

// Actualizar un proyecto
router.put('/:id', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, ['id'], requiredBodyFields)) return;
    try {
        const updated = await updateProyecto(req);
        res.status(Status.ok).json({ body: updated, message: 'Actualizado correctamente' });
        logGreen(`PUT /api/proyectos/${req.params.id}: éxito al actualizar proyecto`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`PUT /api/proyectos/:id ejecutado en ${performance.now() - start} ms`);
    }
});

// Eliminar un proyecto
router.delete('/:id', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, ['id'], [])) return;

    try {
        await deleteProyecto(req);
        res.status(Status.ok).json({ message: 'Eliminado correctamente' });
        logGreen(`DELETE /api/proyectos/${req.params.id}: éxito al eliminar proyecto`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`DELETE /api/proyectos/:id ejecutado en ${performance.now() - start} ms`);
    }
});





export default router;