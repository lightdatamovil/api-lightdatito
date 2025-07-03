import { Router } from 'express';
import { performance } from 'perf_hooks';
import { logRed, logPurple, logGreen } from '../src/funciones/logsCustom.js';
import { verifyAll } from '../src/funciones/verifyParameters.js';
import CustomException from '../models/custom_exception.js';
import { createEstadoReporte } from '../controllers/estado_reporte/create_estado_reporte.js';
import { getAllEstadosReporte } from '../controllers/estado_reporte/get_all_estados_reportes.js';
import { getEstadoReporteById } from '../controllers/estado_reporte/get_estado_reporte_by_id.js';
import { updateEstadoReporte } from '../controllers/estado_reporte/edit_estado_reporte.js';
import { deleteEstadoReporte } from '../controllers/estado_reporte/delete_estado_reporte.js';

const router = Router();

router.get('/', async (req, res) => {
    const start = performance.now();
    try {
        const list = await getAllEstadosReporte();
        res.status(200).json({ body: list, message: 'Datos obtenidos correctamente' });
        logGreen('GET /api/estados-reporte: éxito al listar estados de reporte');
    } catch (err) {
        if (err instanceof CustomException) {
            logRed(`Error 400 GET estados-reporte:`, err.toJSON());
            return res.status(400).json(err.toJSON());
        }
        const fatal = new CustomException({
            title: 'Internal Server Error',
            message: err.message,
            stack: err.stack
        });
        logRed('Error 500 GET estados-reporte:', fatal.toJSON());
        res.status(500).json(fatal.toJSON());
    } finally {
        logPurple(`GET /api/estados-reporte ejecutado en ${performance.now() - start} ms`);
    }
});

// Obtener por ID
router.get('/:id', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, ['id'], []);
    if (missing.length) {
        const ex = new CustomException({
            title: 'Faltan parámetros',
            message: `Faltan parámetros: ${missing.join(',')}`,
        });
        logRed(`Error 400 GET estados-reporte/:id:`, ex.toJSON());
        return res.status(400).json(ex.toJSON());
    }

    try {
        const item = await getEstadoReporteById(req.params.id);
        res.status(200).json({ body: item, message: 'Registro obtenido' });
        logGreen(`GET /api/estados-reporte/${req.params.id}: éxito al obtener estado de reporte`);
    } catch (err) {
        if (err instanceof CustomException) {
            logRed(`Error ${400} GET estados-reporte/:id:`, err.toJSON());
            return res.status(400).json(err.toJSON());
        }
        const fatal = new CustomException({
            title: 'Internal Server Error',
            message: err.message,
            stack: err.stack
        });
        logRed('Error 500 GET estados-reporte/:id:', fatal.toJSON());
        res.status(500).json(fatal.toJSON());
    } finally {
        logPurple(
            `GET /api/estados-reporte/:id ejecutado en ${performance.now() - start} ms`
        );
    }
});

// Crear (POST)
router.post('/', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, [], ['nombre', 'color']);
    if (missing.length) {
        const ex = new CustomException({
            title: 'Error en create-estado-reporte',
            message: `Faltan campos: ${missing.join(',')}`,
        });
        logRed(`Error 400 POST estados-reporte:`, ex.toJSON());
        return res.status(400).json(ex.toJSON());
    }

    try {
        const { nombre, color } = req.body;
        const newItem = await createEstadoReporte( nombre, color );
        res.status(201).json({ body: newItem, message: 'Creado correctamente' });
        logGreen(
            `POST /api/estados-reporte: éxito al crear estado de reporte con ID ${newItem.id}`
        );
    } catch (err) {
        if (err instanceof CustomException) {
            logRed(`Error ${400} POST estados-reporte:`, err.toJSON());
            return res.status(400).json(err.toJSON());
        }
        const fatal = new CustomException({
            title: 'Internal Server Error',
            message: err.message,
            stack: err.stack
        });
        logRed('Error 500 POST estados-reporte:', fatal.toJSON());
        res.status(500).json(fatal.toJSON());
    } finally {
        logPurple(`POST /api/estados-reporte ejecutado en ${performance.now() - start} ms`);
    }
});

// Actualizar (PUT)
router.put('/:id', async (req, res) => {
    const start = performance.now();
    const missingParams = verifyAll(req, ['id'], []);
    if (missingParams.length) {
        const ex = new CustomException({
            title: 'Faltan parámetros',
            message: `Faltan parámetros: ${missingParams.join(',')}`,
        });
        logRed(`Error 400 PUT estados-reporte/:id:`, ex.toJSON());
        return res.status(400).json(ex.toJSON());
    }
    const idEstadoReporte =req.params.id;
    const {nombre, color} = req.body;
    try {
        
        const updatedItem = await updateEstadoReporte(idEstadoReporte, nombre, color);
        res.status(200).json({ body: updatedItem, message: 'Actualizado correctamente' });
        logGreen(`PUT /api/estados-reporte/${req.params.id}: éxito al actualizar`);
    } catch (err) {
        if (err instanceof CustomException) {
            logRed(`Error ${400} PUT estados-reporte/:id:${err.toJsonString()}`);
            return res.status(400).json(err.toJsonString());
        }
        const fatal = new CustomException({
            title: 'Internal Server Error',
            message: err.message,
            stack: err.stack
        });
        logRed(`Error 500 PUT estados-reporte/:id: ${fatal.toJsonString()}` );
        res.status(500).json(fatal.toJSON());
    } finally {
        logPurple(`PUT /api/estados-reporte/:id ejecutado en ${performance.now() - start} ms`);
    }
});

// Eliminar (DELETE)
router.delete('/:id', async (req, res) => {
    const start = performance.now();
    const missingParams = verifyAll(req, ['id'], []);
    if (missingParams.length) {
        const ex = new CustomException({
            title: 'Faltan parámetros',
            message: `Faltan parámetros: ${missingParams.join(',')}`,
        });
        logRed(`Error 400 DELETE estados-reporte/:id:`, ex.toJSON());
        return res.status(400).json(ex.toJSON());
    }

    try {
        await deleteEstadoReporte(req.params.id);
        res.status(200).json({ message: 'Eliminado correctamente' });
        logGreen(`DELETE /api/estados-reporte/${req.params.id}: éxito al eliminar`);
    } catch (err) {
        if (err instanceof CustomException) {
            logRed(`Error ${400} DELETE estados-reporte/:id:`, err.toJSON());
            return res.status(400).json(err.toJSON());
        }
        const fatal = new CustomException({
            title: 'Internal Server Error',
            message: err.message,
            stack: err.stack
        });
        logRed('Error 500 DELETE estados-reporte/:id:', fatal.toJSON());
        res.status(500).json(fatal.toJSON());
    } finally {
        logPurple(
            `DELETE /api/estados-reporte/:id ejecutado en ${performance.now() - start} ms`
        );
    }
});

export default router;