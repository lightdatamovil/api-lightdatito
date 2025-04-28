import { Router } from 'express';
import { performance } from 'perf_hooks';
import { logRed, logPurple, logGreen } from '../src/funciones/logsCustom.js';
import { verifyAll } from '../src/funciones/verifyParameters.js';


const tipoReporteRouter = Router();

tipoReporteRouter.get('/', async (req, res) => {
    const start = performance.now();
    try {
        const list = await getAllTipoReporte();
        res.status(200).json({ body: list, message: 'Datos obtenidos correctamente' });
        logGreen('GET /api/tipo-reporte: éxito al listar tipos de reporte');
    } catch (error) {
        logRed(`Error GET /api/tipo-reporte: ${error.stack}`);
        res.status(500).json({ message: 'Error interno' });
    } finally {
        logPurple(`GET /api/tipo-reporte ejecutado en ${performance.now() - start} ms`);
    }
});

tipoReporteRouter.get('/:id', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, ['id'], []);
    if (missing.length) return res.status(400).json({ message: `Faltan parámetros: ${missing.join(', ')}` });
    try {
        const item = await getTipoReporteById(req.params.id);
        res.status(200).json({ body: item, message: 'Registro obtenido' });
        logGreen(`GET /api/tipo-reporte/${req.params.id}: éxito al obtener tipo de reporte`);
    } catch (error) {
        logRed(`Error GET /api/tipo-reporte/:id: ${error.stack}`);
        res.status(500).json({ message: 'Error interno' });
    } finally {
        logPurple(`GET /api/tipo-reporte/:id ejecutado en ${performance.now() - start} ms`);
    }
});

tipoReporteRouter.post('/', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, [], ['nombre', 'color']);
    if (missing.length) return res.status(400).json({ message: `Faltan parámetros: ${missing.join(', ')}` });
    try {
        const newItem = await createTipoReporte(req.body);
        res.status(201).json({ body: newItem, message: 'Creado correctamente' });
        logGreen(`POST /api/tipo-reporte: éxito al crear tipo de reporte con ID ${newItem.id}`);
    } catch (error) {
        logRed(`Error POST /api/tipo-reporte: ${error.stack}`);
        res.status(500).json({ message: 'Error interno' });
    } finally {
        logPurple(`POST /api/tipo-reporte ejecutado en ${performance.now() - start} ms`);
    }
});

tipoReporteRouter.put('/:id', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, ['id'], []);
    if (missing.length) return res.status(400).json({ message: `Faltan parámetros: ${missing.join(', ')}` });
    try {
        const updated = await updateTipoReporte(req.params.id, req.body);
        res.status(200).json({ body: updated, message: 'Actualizado correctamente' });
        logGreen(`PUT /api/tipo-reporte/${req.params.id}: éxito al actualizar tipo de reporte`);
    } catch (error) {
        logRed(`Error PUT /api/tipo-reporte/:id: ${error.stack}`);
        res.status(500).json({ message: 'Error interno' });
    } finally {
        logPurple(`PUT /api/tipo-reporte/:id ejecutado en ${performance.now() - start} ms`);
    }
});

tipoReporteRouter.delete('/:id', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, ['id'], []);
    if (missing.length) return res.status(400).json({ message: `Faltan parámetros: ${missing.join(', ')}` });
    try {
        await deleteTipoReporte(req.params.id);
        res.status(200).json({ message: 'Eliminado correctamente' });
        logGreen(`DELETE /api/tipo-reporte/${req.params.id}: éxito al eliminar tipo de reporte`);
    } catch (error) {
        logRed(`Error DELETE /api/tipo-reporte/:id: ${error.stack}`);
        res.status(500).json({ message: 'Error interno' });
    } finally {
        logPurple(`DELETE /api/tipo-reporte/:id ejecutado en ${performance.now() - start} ms`);
    }
});

export default tipoReporteRouter;
