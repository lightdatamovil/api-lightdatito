// routes/tipoReporte.js
import { Router } from 'express';
import { performance } from 'perf_hooks';
import { logPurple, logGreen } from '../src/funciones/logsCustom.js';
import { createTipoReporte } from '../controllers/tipo_reporte/create_tipo_reporte.js';
import { getTipoReporteById } from '../controllers/tipo_reporte/get_tipo_reporte_by_id.js';
import { getAllTipoReporte } from '../controllers/tipo_reporte/get_all_tipos_reportes.js';
import { updateTipoReporte } from '../controllers/tipo_reporte/edit_tipo_reporte.js';
import { deleteTipoReporte } from '../controllers/tipo_reporte/delete_tipo_reporte.js';
import { handleError } from '../src/funciones/handle_error.js';
import { verificarTodo } from '../src/funciones/verificarAllt.js';

const router = Router();

router.get('/', async (req, res) => {
    const start = performance.now();
    try {
        const list = await getAllTipoReporte();
        res.status(200).json({ body: list, message: 'Datos obtenidos correctamente' });
        logGreen('GET /api/tipo-reporte: éxito al listar tipos de reporte');
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`GET /api/tipo-reporte ejecutado en ${performance.now() - start} ms`);
    }
});

// Obtener un tipo de reporte por ID
router.get('/:id', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, ['id'], [])) return;

    try {
        const item = await getTipoReporteById(req.params.id);
        res.status(200).json({ body: item, message: 'Registro obtenido' });
        logGreen(`GET /api/tipo-reporte/${req.params.id}: éxito al obtener tipo de reporte`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`GET /api/tipo-reporte/:id ejecutado en ${performance.now() - start} ms`);
    }
});

// Crear un nuevo tipo de reporte
router.post('/', async (req, res) => {
    const start = performance.now();
    const requiredBodyFields = ['nombre', 'color'];
    if (!verificarTodo(req, res, [], requiredBodyFields)) return;
    try {
        const { nombre, color } = req.body;
        const newItem = await createTipoReporte(nombre, color);
        res.status(201).json({ body: newItem, message: 'Creado correctamente' });
        logGreen(`POST /api/tipo-reporte: éxito al crear tipo de reporte con ID ${newItem.id}`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`POST /api/tipo-reporte ejecutado en ${performance.now() - start} ms`);
    }
});

// Actualizar un tipo de reporte
router.put('/:id', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, ['id'])) return;

    try {
        const updated = await updateTipoReporte(req.params.id, req.body);
        res.status(200).json({ body: updated, message: 'Actualizado correctamente' });
        logGreen(`PUT /api/tipo-reporte/${req.params.id}: éxito al actualizar tipo de reporte`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`PUT /api/tipo-reporte/:id ejecutado en ${performance.now() - start} ms`);
    }
});

// Eliminar un tipo de reporte
router.delete('/:id', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, ['id'], [])) return;
    try {
        await deleteTipoReporte(req.params.id);
        res.status(200).json({ message: 'Eliminado correctamente' });
        logGreen(`DELETE /api/tipo-reporte/${req.params.id}: éxito al eliminar tipo de reporte`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`DELETE /api/tipo-reporte/:id ejecutado en ${performance.now() - start} ms`);
    }
});

export default router;