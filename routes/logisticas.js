import { Router } from 'express';
import { performance } from 'perf_hooks';
import { logPurple, logGreen } from '../src/funciones/logsCustom.js';
import { createLogistica } from '../controllers/logisticas/create_logistica.js';
import { getAllLogisticas } from '../controllers/logisticas/get_all_logisticas.js';
import { getLogisticaById } from '../controllers/logisticas/get_logistica_by_id.js';
import { updateLogistica } from '../controllers/logisticas/edit_logistica.js';
import { deleteLogistica } from '../controllers/logisticas/delete_logistica.js';
import { handleError } from '../src/funciones/handle_error.js';
import { verificarTodo } from '../src/funciones/verificarAllt.js';

const router = Router();

// Crear logística
router.post('/', async (req, res) => {
    const start = performance.now();
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

    if (!verificarTodo(req, res, requiredBodyFields)) return;
    try {
        const newItem = await createLogistica(req.body);
        res.status(201).json({ body: newItem, message: 'Creado correctamente' });
        logGreen(`POST /api/logisticas: éxito al crear logística con ID ${newItem.id}`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`POST /api/logisticas ejecutado en ${performance.now() - start} ms`);
    }
});

// Listar todas las logísticas
router.get('/', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res)) return;

    try {
        const list = await getAllLogisticas();
        res.status(200).json({ body: list, message: 'Datos obtenidos correctamente', success: true });
        logGreen('GET /api/logisticas: éxito al listar logísticas');
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`GET /api/logisticas ejecutado en ${performance.now() - start} ms`);
    }
});

// Obtener logística por ID
router.get('/:id', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, ['id'])) return;
    try {
        const item = await getLogisticaById(req.params.id);
        res.status(200).json({ body: item, message: 'Registro obtenido' });
        logGreen(`GET /api/logisticas/${req.params.id}: éxito al obtener logística`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(
            `GET /api/logisticas/:id ejecutado en ${performance.now() - start} ms`
        );
    }
});

// Actualizar logística
router.put('/:id', async (req, res) => {
    const start = performance.now();

    if (!verificarTodo(req, res, ['id'])) return;

    try {
        const idLogistica = req.params.id;
        const updated = await updateLogistica(idLogistica, req.body);
        res.status(200).json({ body: updated, message: 'Actualizado correctamente' });
        logGreen(`PUT /api/logisticas/${idLogistica}: éxito al actualizar logística`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(
            `PUT /api/logisticas/:id ejecutado en ${performance.now() - start} ms`
        );
    }
});

// Eliminar logística
router.delete('/:id', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, ['id'])) return;


    try {
        await deleteLogistica(req.params.id);
        res.status(200).json({ message: 'Eliminado correctamente' });
        logGreen(`DELETE /api/logisticas/${req.params.id}: éxito al eliminar logística`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(
            `DELETE /api/logisticas/:id ejecutado en ${performance.now() - start} ms`
        );
    }
});

export default router;
