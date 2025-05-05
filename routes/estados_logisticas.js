import { Router } from 'express';
import { performance } from 'perf_hooks';
import { logRed, logPurple, logGreen } from '../src/funciones/logsCustom.js';
import { verifyAll } from '../src/funciones/verifyParameters.js';
import CustomException from '../models/custom_exception.js';
import { createEstadoLogistica } from '../controllers/estado_logistica/create_estado_logistica.js';
import { getAllEstadosLogisticas } from '../controllers/estado_logistica/get_all_estados_logistica.js';
import { getEstadoLogisticaById } from '../controllers/estado_logistica/get_estado_logistica_by_id.js';
import { updateEstadoLogistica } from '../controllers/estado_logistica/edit_estado_logistica.js';
import { deleteEstadoLogistica } from '../controllers/estado_logistica/delete_estado_logistica.js';

const router = Router();

// Crear estado de logística
router.post('/', async (req, res) => {
    const start = performance.now();
    // validación de body
    const missing = verifyAll(req, [], ['nombre', 'color']);
    if (missing.length) {
        const ex = new CustomException({
            title: 'Error en create-estado-logistica',
            message: `Faltan campos: ${missing.join(', ')}`
        });
        logRed('Error 400 POST /api/estados-logistica:', ex.toJSON());
        return res.status(400).json(ex.toJSON());
    }

    try {
        const { nombre, color } = req.body;
        // suponiendo firma: createEstadoLogistica({ nombre, color })
        const newItem = await createEstadoLogistica(nombre, color);
        res.status(201).json({ body: newItem, message: 'Creado correctamente' });
        logGreen(
            `POST /api/estados-logistica: éxito al crear estado con ID ${newItem.id}`
        );
    } catch (err) {
        if (err instanceof CustomException) {
            logRed('Error 400 POST /api/estados-logistica:', err.toJSON());
            return res.status(400).json(err.toJSON());
        }
        const fatal = new CustomException({
            title: 'Internal Server Error',
            message: err.message,
            stack: err.stack
        });
        logRed('Error 500 POST /api/estados-logistica:', fatal.toJSON());
        res.status(500).json(fatal.toJSON());
    } finally {
        logPurple(
            `POST /api/estados-logistica ejecutado en ${performance.now() - start} ms`
        );
    }
});

// Listar todos los estados de logística
router.get('/', async (req, res) => {
    const start = performance.now();
    try {
        const list = await getAllEstadosLogisticas();
        res.status(200).json({ body: list, message: 'Datos obtenidos correctamente' });
        logGreen('GET /api/estados-logistica: éxito al listar estados');
    } catch (err) {
        if (err instanceof CustomException) {
            logRed('Error 400 GET /api/estados-logistica:', err.toJSON());
            return res.status(400).json(err.toJSON());
        }
        const fatal = new CustomException({
            title: 'Internal Server Error',
            message: err.message,
            stack: err.stack
        });
        logRed('Error 500 GET /api/estados-logistica:', fatal.toJSON());
        res.status(500).json(fatal.toJSON());
    } finally {
        logPurple(
            `GET /api/estados-logistica ejecutado en ${performance.now() - start} ms`
        );
    }
});

// Obtener un estado de logística por ID
router.get('/:id', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, ['id'], []);
    if (missing.length) {
        const ex = new CustomException({
            title: 'Faltan parámetros',
            message: `Faltan parámetros: ${missing.join(', ')}`
        });
        logRed(`Error 400 GET /api/estados-logistica/${req.params.id}:`, ex.toJSON());
        return res.status(400).json(ex.toJSON());
    }

    try {
        const item = await getEstadoLogisticaById(req.params.id);
        res.status(200).json({ body: item, message: 'Registro obtenido' });
        logGreen(`GET /api/estados-logistica/${req.params.id}: éxito al obtener estado`);
    } catch (err) {
        if (err instanceof CustomException) {
            logRed(`Error 400 GET /api/estados-logistica/${req.params.id}:`, err.toJSON());
            return res.status(400).json(err.toJSON());
        }
        const fatal = new CustomException({
            title: 'Internal Server Error',
            message: err.message,
            stack: err.stack
        });
        logRed(`Error 500 GET /api/estados-logistica/${req.params.id}:`, fatal.toJSON());
        res.status(500).json(fatal.toJSON());
    } finally {
        logPurple(
            `GET /api/estados-logistica/:id ejecutado en ${performance.now() - start} ms`
        );
    }
});

// Actualizar estado de logística
router.put('/:id', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, ['id'], []);
    if (missing.length) {
        const ex = new CustomException({
            title: 'Faltan parámetros',
            message: `Faltan parámetros: ${missing.join(', ')}`
        });
        logRed(`Error 400 PUT /api/estados-logistica/${req.params.id}:`, ex.toJSON());
        return res.status(400).json(ex.toJSON());
    }

    try {
        const updated = await updateEstadoLogistica(req.params.id, req.body);
        res.status(200).json({ body: updated, message: 'Actualizado correctamente' });
        logGreen(`PUT /api/estados-logistica/${req.params.id}: éxito al actualizar estado`);
    } catch (err) {
        if (err instanceof CustomException) {
            logRed(`Error 400 PUT /api/estados-logistica/${req.params.id}:`, err.toJSON());
            return res.status(400).json(err.toJSON());
        }
        const fatal = new CustomException({
            title: 'Internal Server Error',
            message: err.message,
            stack: err.stack
        });
        logRed(`Error 500 PUT /api/estados-logistica/${req.params.id}:`, fatal.toJSON());
        res.status(500).json(fatal.toJSON());
    } finally {
        logPurple(
            `PUT /api/estados-logistica/:id ejecutado en ${performance.now() - start} ms`
        );
    }
});

// Eliminar estado de logística
router.delete('/:id', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, ['id'], []);
    if (missing.length) {
        const ex = new CustomException({
            title: 'Faltan parámetros',
            message: `Faltan parámetros: ${missing.join(', ')}`
        });
        logRed(`Error 400 DELETE /api/estados-logistica/${req.params.id}:`, ex.toJSON());
        return res.status(400).json(ex.toJSON());
    }

    try {
        await deleteEstadoLogistica(req.params.id);
        res.status(200).json({ message: 'Eliminado correctamente' });
        logGreen(`DELETE /api/estados-logistica/${req.params.id}: éxito al eliminar estado`);
    } catch (err) {
        if (err instanceof CustomException) {
            logRed(`Error 400 DELETE /api/estados-logistica/${req.params.id}:`, err.toJSON());
            return res.status(400).json(err.toJSON());
        }
        const fatal = new CustomException({
            title: 'Internal Server Error',
            message: err.message,
            stack: err.stack
        });
        logRed(`Error 500 DELETE /api/estados-logistica/${req.params.id}:`, fatal.toJSON());
        res.status(500).json(fatal.toJSON());
    } finally {
        logPurple(
            `DELETE /api/estados-logistica/:id ejecutado en ${performance.now() - start} ms`
        );
    }
});

export default router;
