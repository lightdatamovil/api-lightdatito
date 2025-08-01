import { Router } from 'express';
import { performance } from 'perf_hooks';
import { logPurple, logGreen } from '../src/funciones/logsCustom.js';
import { createLogistica } from '../controllers/logisticas/create_logistica.js';
import { getAllLogisticas } from '../controllers/logisticas/get_all_logisticas.js';
import { getLogisticaById } from '../controllers/logisticas/get_logistica_by_id.js';
import { updateLogistica } from '../controllers/logisticas/edit_logistica.js';
import { deleteLogistica } from '../controllers/logisticas/delete_logistica.js';
import { handleError } from '../src/funciones/handle_error.js';
import { verificarTodo } from '../src/funciones/verificarAll.js';
import { cambiarPlan } from '../controllers/logisticas/logistica_plan/cambiar_plan.js';
import { Status } from '../models/status.js';

const router = Router();
const requiredBodyFields = [
    'did',
    'nombre',
    'url_imagen',
    'plan_id',
    'estado_logistica_id',
    'codigo',
    'password_soporte',
    'cuit',
    'email',
    'url_sistema',
    'pais_id',
];

router.post('/', async (req, res) => {
    const start = performance.now();

    if (!verificarTodo(req, res, [], requiredBodyFields)) return;

    try {
        const newId = await createLogistica(req);
        res.status(Status.created).json({ body: newId, message: 'Creado correctamente' });
        logGreen(`${req.method} ${req.originalUrl}: éxito al crear logística con ID ${newId.id}`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`${req.method} ${req.originalUrl} ejecutado en ${performance.now() - start} ms`);
    }
});

router.get('/', async (req, res) => {
    const start = performance.now();

    try {
        const list = await getAllLogisticas();
        res.status(Status.ok).json({ body: list, message: 'Datos obtenidos correctamente', success: true });
        logGreen(`${req.method} ${req.originalUrl}: éxito al listar logísticas`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`${req.method} ${req.originalUrl} ejecutado en ${performance.now() - start} ms`);
    }
});

router.get('/:id', async (req, res) => {
    const start = performance.now();

    if (!verificarTodo(req, res, ['id'])) return;

    try {
        const item = await getLogisticaById(req);
        res.status(Status.ok).json({ body: item, message: 'Registro obtenido' });
        logGreen(`${req.method} ${req.originalUrl}: éxito al obtener logística`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`${req.method} ${req.originalUrl} ejecutado en ${performance.now() - start} ms`);
    }
});

router.put('/:id', async (req, res) => {
    const start = performance.now();

    if (!verificarTodo(req, res, ['id'], requiredBodyFields)) return;

    try {
        await updateLogistica(req);
        res.status(Status.ok).json({ message: 'Actualizado correctamente' });
        logGreen(`${req.method} ${req.originalUrl}: éxito al actualizar logística`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`${req.method} ${req.originalUrl} ejecutado en ${performance.now() - start} ms`);
    }
});

router.delete('/:id', async (req, res) => {
    const start = performance.now();

    if (!verificarTodo(req, res, ['id'])) return;

    try {
        await deleteLogistica(req.params);
        res.status(Status.ok).json({ message: 'Eliminado correctamente' });
        logGreen(`${req.method} ${req.originalUrl}: éxito al eliminar logística`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`${req.method} ${req.originalUrl} ejecutado en ${performance.now() - start} ms`);
    }
});

router.put('/:logisticaId/planes', async (req, res) => {
    const start = performance.now();

    if (!verificarTodo(req, res, ['logisticaId'], ['planId'])) return;

    try {
        await cambiarPlan(req);
        res.status(Status.created).json({ message: 'Plan cambiado correctamente' });
        logGreen(`${req.method} ${req.originalUrl}: éxito al cambiar plan de logística`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`${req.method} ${req.originalUrl} ejecutado en ${performance.now() - start} ms`);
    }
});

export default router;
