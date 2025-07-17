import { Router } from 'express';
import { performance } from 'perf_hooks';
import { logPurple, logGreen } from '../src/funciones/logsCustom.js';
import { createParticularidadLogistica } from '../controllers/particularidad_logistica/create_particularidad_logistica.js';
import { getAllParticularidadesLogisticas } from '../controllers/particularidad_logistica/get_all_particularidad_logistica.js';
import { getParticularidadLogisticaById } from '../controllers/particularidad_logistica/get_particularidad_logistica_by_id.js';
import { updateParticularidadLogistica } from '../controllers/particularidad_logistica/edit_particularidad_logistica.js';
import { deleteParticularidadLogistica } from '../controllers/particularidad_logistica/delete_particularidad_logistica.js';
import { handleError } from '../src/funciones/handle_error.js';
import { verificarTodo } from '../src/funciones/verificarAll.js';
import { getAllParticularidadesForLogistica } from '../controllers/particularidad_logistica/get_all_particularidades_for_logistica.js';
import { Status } from '../models/status.js';

const router = Router();
const requiredBodyFields = ['particularidad', 'es_pago', 'tipo_particularidad_id'];

// Crear particularidad a logística
router.post('/:logisticaId', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, requiredBodyFields)) return;

    try {
        const newItem = await createParticularidadLogistica(req);
        res.status(Status.created).json({ body: newItem, message: 'Creado correctamente' });
        logGreen(
            `POST /api/particularidades-logistica: éxito al crear particularidad con ID ${newItem.id}`
        );
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(
            `POST /api/particularidades-logistica ejecutado en ${performance.now() - start} ms`
        );
    }
});

// Listar todas las particularidades 
router.get('/', async (req, res) => {
    const start = performance.now();
    try {
        const list = await getAllParticularidadesLogisticas();
        res.status(Status.ok).json({ body: list, message: 'Datos obtenidos correctamente' });
        logGreen('GET /api/particularidades-logistica: éxito al listar particularidades');
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(
            `GET /api/particularidades-logistica ejecutado en ${performance.now() - start} ms`
        );
    }
});

// Obtener una particularidad de logística por ID
router.get('/:id', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, ['id'])) return;

    try {
        const item = await getParticularidadLogisticaById(req);
        res.status(Status.ok).json({ body: item, message: 'Registro obtenido' });
        logGreen(
            `GET /api/particularidad-logistica/${req.params.id}: éxito al obtener particularidad`
        );
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(
            `GET /api/particularidad-logistica/:id ejecutado en ${performance.now() - start} ms`
        );
    }
});

// Actualizar una observación de logística u otros  campos ver como
router.put('/:id', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, ['id'], requiredBodyFields)) return;
    try {
        const updated = await updateParticularidadLogistica(req);
        res.status(Status.ok).json({ body: updated, message: 'Actualizado correctamente' });
        logGreen(
            `PUT /api/particularidades-logistica/${req.params.id}: éxito al actualizar particularidad`
        );
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(
            `PUT /api/particularidades-logistica/:id ejecutado en ${performance.now() - start} ms`
        );
    }
});

// Eliminar una observación de logística
router.delete('/:id', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, ['id'])) return;

    try {
        await deleteParticularidadLogistica(req);
        res.status(Status.ok).json({ message: 'Eliminado correctamente' });
        logGreen(`DELETE /api/particularidad-logistica/${req.params.id}: éxito al eliminar observación`
        );
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(
            `DELETE /api/particularidad-logistica/:id ejecutado en ${performance.now() - start} ms`
        );
    }
});

//  Listar todas las particularidades de una logistica
router.get("/logistica_id/:id", async (req, res) => {
    const start = performance.now();
    try {
        const list = await getAllParticularidadesForLogistica(req);
        if (list.length === 0) {
            res.status(Status.ok).json({ message: "No se encontraron particularidades" });
            logGreen(`GET /api/particularidades-logistica/logistica_id/${req.params.id}: sin particularidades`);
            return;
        }
        res.status(Status.ok).json({ body: list, message: "Particularidades obtenidas" });
        logGreen("GET /api/particularidades-logistica: éxito al listar particularidades");
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(
            `GET /api/particularidades-logistica ejecutado en ${performance.now() - start} ms`
        );
    }
});

export default router;