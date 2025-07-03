import { Router } from 'express';
import { performance } from 'perf_hooks';
import { logPurple, logGreen } from '../src/funciones/logsCustom.js';
import { createEstadoReporte } from '../controllers/estado_reporte/create_estado_reporte.js';
import { getAllEstadosReporte } from '../controllers/estado_reporte/get_all_estados_reportes.js';
import { getEstadoReporteById } from '../controllers/estado_reporte/get_estado_reporte_by_id.js';
import { updateEstadoReporte } from '../controllers/estado_reporte/edit_estado_reporte.js';
import { deleteEstadoReporte } from '../controllers/estado_reporte/delete_estado_reporte.js';
import { handleError } from '../src/funciones/handle_error.js';
import { verificarTodo } from '../src/funciones/verificarAllt.js';

const router = Router();

router.get('/', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res)) return;
    try {
        const list = await getAllEstadosReporte();
        res.status(200).json({ body: list, message: 'Datos obtenidos correctamente' });
        logGreen('GET /api/estados-reporte: éxito al listar estados de reporte');
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`GET /api/estados-reporte ejecutado en ${performance.now() - start} ms`);
    }
});

// Obtener por ID
router.get('/:id', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, ['id'])) return;

    try {
        const item = await getEstadoReporteById(req.params.id);
        res.status(200).json({ body: item, message: 'Registro obtenido' });
        logGreen(`GET /api/estados-reporte/${req.params.id}: éxito al obtener estado de reporte`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(
            `GET /api/estados-reporte/:id ejecutado en ${performance.now() - start} ms`
        );
    }
});

// Crear (POST)
router.post('/', async (req, res) => {
    const start = performance.now();
    const requiredBodyFields = ['nombre', 'color'];
    if (!verificarTodo(req, res, requiredBodyFields)) return;

    try {
        const { nombre, color } = req.body;
        const newItem = await createEstadoReporte(nombre, color);
        res.status(201).json({ body: newItem, message: 'Creado correctamente' });
        logGreen(
            `POST /api/estados-reporte: éxito al crear estado de reporte con ID ${newItem.id}`
        );
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`POST /api/estados-reporte ejecutado en ${performance.now() - start} ms`);
    }
});

// Actualizar (PUT)
router.put('/:id', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, ['id'])) return;

    try {
        const { nombre, color } = req.body;
        const updatedItem = await updateEstadoReporte(req.params.id, nombre, color);
        res.status(200).json({ body: updatedItem, message: 'Actualizado correctamente' });
        logGreen(`PUT /api/estados-reporte/${req.params.id}: éxito al actualizar`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`PUT /api/estados-reporte/:id ejecutado en ${performance.now() - start} ms`);
    }
});

// Eliminar (DELETE)
router.delete('/:id', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, ['id'])) return;
    try {
        await deleteEstadoReporte(req.params.id);
        res.status(200).json({ message: 'Eliminado correctamente' });
        logGreen(`DELETE /api/estados-reporte/${req.params.id}: éxito al eliminar`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(
            `DELETE /api/estados-reporte/:id ejecutado en ${performance.now() - start} ms`
        );
    }
});

export default router;