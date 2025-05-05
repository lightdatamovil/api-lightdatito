import { Router } from 'express';
import { performance } from 'perf_hooks';
import { logRed, logPurple, logGreen } from '../src/funciones/logsCustom.js';
import { verifyAll } from '../src/funciones/verifyParameters.js';
import CustomException from '../models/custom_exception.js';
import { createObservacionLogistica } from '../controllers/observacion_logistica/create_observacion_logistica.js';
import { getAllObservacionesLogisticas } from '../controllers/observacion_logistica/get_all_observaciones_logistica.js';
import { getObservacionLogisticaById } from '../controllers/observacion_logistica/get_observaciones_logistica_by_id.js';
import { updateObservacionLogistica } from '../controllers/observacion_logistica/edit_observacion_logistica.js';
import { deleteObservacionLogistica } from '../controllers/observacion_logistica/delete_observacion_logistica.js';

const router = Router();

// Crear observación de logística
router.post('/:logisticaId', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, ['logisticaId'], ['nombre']);
    if (missing.length) {
        const ex = new CustomException({
            title: 'Faltan campos',
            message: `Faltan campos: ${missing.join(', ')}`
        });
        logRed('Error 400 POST /api/observaciones-logistica:', ex.toJSON());
        return res.status(400).json(ex.toJSON());
    }

    try {
        const { logisticaId } = req.params;
        const { nombre } = req.body;
        const newItem = await createObservacionLogistica(logisticaId, nombre);
        res.status(201).json({ body: newItem, message: 'Creado correctamente' });
        logGreen(
            `POST /api/observaciones-logistica: éxito al crear observación con ID ${newItem.id}`
        );
    } catch (err) {
        if (err instanceof CustomException) {
            logRed('Error 400 POST /api/observaciones-logistica:', err.toJSON());
            return res.status(400).json(err.toJSON());
        }
        const fatal = new CustomException({
            title: 'Internal Server Error',
            message: err.message,
            stack: err.stack
        });
        logRed('Error 500 POST /api/observaciones-logistica:', fatal.toJSON());
        res.status(500).json(fatal.toJSON());
    } finally {
        logPurple(
            `POST /api/observaciones-logistica ejecutado en ${performance.now() - start} ms`
        );
    }
});

// Listar todas las observaciones de logística
router.get('/', async (req, res) => {
    const start = performance.now();
    try {
        const list = await getAllObservacionesLogisticas();
        res.status(200).json({ body: list, message: 'Datos obtenidos correctamente' });
        logGreen('GET /api/observaciones-logistica: éxito al listar observaciones');
    } catch (err) {
        if (err instanceof CustomException) {
            logRed('Error 400 GET /api/observaciones-logistica:', err.toJSON());
            return res.status(400).json(err.toJSON());
        }
        const fatal = new CustomException({
            title: 'Internal Server Error',
            message: err.message,
            stack: err.stack
        });
        logRed('Error 500 GET /api/observaciones-logistica:', fatal.toJSON());
        res.status(500).json(fatal.toJSON());
    } finally {
        logPurple(
            `GET /api/observaciones-logistica ejecutado en ${performance.now() - start} ms`
        );
    }
});

// Obtener una observación de logística por ID
router.get('/:id', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, ['id'], []);
    if (missing.length) {
        const ex = new CustomException({
            title: 'Faltan parámetros',
            message: `Faltan parámetros: ${missing.join(', ')}`
        });
        logRed(
            `Error 400 GET /api/observaciones-logistica/${req.params.id}:`,
            ex.toJSON()
        );
        return res.status(400).json(ex.toJSON());
    }

    try {
        const item = await getObservacionLogisticaById(req.params.id);
        res.status(200).json({ body: item, message: 'Registro obtenido' });
        logGreen(
            `GET /api/observaciones-logistica/${req.params.id}: éxito al obtener observación`
        );
    } catch (err) {
        if (err instanceof CustomException) {
            logRed(
                `Error 400 GET /api/observaciones-logistica/${req.params.id}:`,
                err.toJSON()
            );
            return res.status(400).json(err.toJSON());
        }
        const fatal = new CustomException({
            title: 'Internal Server Error',
            message: err.message,
            stack: err.stack
        });
        logRed(
            `Error 500 GET /api/observaciones-logistica/${req.params.id}:`,
            fatal.toJSON()
        );
        res.status(500).json(fatal.toJSON());
    } finally {
        logPurple(
            `GET /api/observaciones-logistica/:id ejecutado en ${performance.now() - start} ms`
        );
    }
});

// Actualizar una observación de logística
router.put('/:id', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, ['id'], ['nombre']);
    if (missing.length) {
        const ex = new CustomException({
            title: 'Faltan campos',
            message: `Faltan campos: ${missing.join(', ')}`
        });
        logRed(
            `Error 400 PUT /api/observaciones-logistica/${req.params.id}:`,
            ex.toJSON()
        );
        return res.status(400).json(ex.toJSON());
    }

    try {
        const updated = await updateObservacionLogistica(
            req.params.id,
            { nombre: req.body.nombre }
        );
        res.status(200).json({ body: updated, message: 'Actualizado correctamente' });
        logGreen(
            `PUT /api/observaciones-logistica/${req.params.id}: éxito al actualizar observación`
        );
    } catch (err) {
        if (err instanceof CustomException) {
            logRed(
                `Error 400 PUT /api/observaciones-logistica/${req.params.id}:`,
                err.toJSON()
            );
            return res.status(400).json(err.toJSON());
        }
        const fatal = new CustomException({
            title: 'Internal Server Error',
            message: err.message,
            stack: err.stack
        });
        logRed(
            `Error 500 PUT /api/observaciones-logistica/${req.params.id}:`,
            fatal.toJSON()
        );
        res.status(500).json(fatal.toJSON());
    } finally {
        logPurple(
            `PUT /api/observaciones-logistica/:id ejecutado en ${performance.now() - start} ms`
        );
    }
});

// Eliminar una observación de logística
router.delete('/:id', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, ['id'], []);
    if (missing.length) {
        const ex = new CustomException({
            title: 'Faltan parámetros',
            message: `Faltan parámetros: ${missing.join(', ')}`
        });
        logRed(
            `Error 400 DELETE /api/observaciones-logistica/${req.params.id}:`,
            ex.toJSON()
        );
        return res.status(400).json(ex.toJSON());
    }

    try {
        await deleteObservacionLogistica(req.params.id);
        res.status(200).json({ message: 'Eliminado correctamente' });
        logGreen(
            `DELETE /api/observaciones-logistica/${req.params.id}: éxito al eliminar observación`
        );
    } catch (err) {
        if (err instanceof CustomException) {
            logRed(
                `Error 400 DELETE /api/observaciones-logistica/${req.params.id}:`,
                err.toJSON()
            );
            return res.status(400).json(err.toJSON());
        }
        const fatal = new CustomException({
            title: 'Internal Server Error',
            message: err.message,
            stack: err.stack
        });
        logRed(
            `Error 500 DELETE /api/observaciones-logistica/${req.params.id}:`,
            fatal.toJSON()
        );
        res.status(500).json(fatal.toJSON());
    } finally {
        logPurple(
            `DELETE /api/observaciones-logistica/:id ejecutado en ${performance.now() - start} ms`
        );
    }
});

export default router;