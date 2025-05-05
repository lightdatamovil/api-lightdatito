import { Router } from 'express';
import { performance } from 'perf_hooks';
import { logRed, logPurple, logGreen } from '../src/funciones/logsCustom.js';
import { verifyAll } from '../src/funciones/verifyParameters.js';
import CustomException from '../models/custom_exception.js';
import { createLogistica } from '../controllers/logisticas/create_logistica.js';
import { getAllLogisticas } from '../controllers/logisticas/get_all_logisticas.js';
import { getLogisticaById } from '../controllers/logisticas/get_logistica_by_id.js';
import { updateLogistica } from '../controllers/logisticas/edit_logistica.js';
import { deleteLogistica } from '../controllers/logisticas/delete_logistica.js';

const router = Router();

// Crear logística
router.post('/', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, [], [
        'did',
        'nombre',
        'url_imagen',
        'plan_id',
        'estado_logistica_id',
        'codigo',
        'contrasena_soporte',
        'cuit',
        'email',
        'url_sistema',
        'pais_id']);
    if (missing.length) {
        const ex = new CustomException({
            title: 'Faltan campos',
            message: `Faltan campos: ${missing.join(', ')}`
        });
        logRed('Error 400 POST /api/logisticas:', ex.toJSON());
        return res.status(400).json(ex.toJSON());
    }

    try {
        // createLogistica debe aceptar un objeto con todas las propiedades del body
        const { did, nombre, url_imagen, plan_id, estado_logistica_id, codigo, contrasena_soporte, cuit, email, url_sistema, pais_id } = req.body;
        const newItem = await createLogistica(did, nombre, url_imagen, plan_id, estado_logistica_id, codigo, contrasena_soporte, cuit, email, url_sistema, pais_id);
        res.status(201).json({ body: newItem, message: 'Creado correctamente' });
        logGreen(`POST /api/logisticas: éxito al crear logística con ID ${newItem.id}`);
    } catch (err) {
        if (err instanceof CustomException) {
            logRed('Error 400 POST /api/logisticas:', err.toJSON());
            return res.status(400).json(err.toJSON());
        }
        const fatal = new CustomException({
            title: 'Internal Server Error',
            message: err.message,
            stack: err.stack
        });
        logRed('Error 500 POST /api/logisticas:', fatal.toJSON());
        res.status(500).json(fatal.toJSON());
    } finally {
        logPurple(`POST /api/logisticas ejecutado en ${performance.now() - start} ms`);
    }
});

// Listar todas las logísticas
router.get('/', async (req, res) => {
    const start = performance.now();
    try {
        const list = await getAllLogisticas();
        res.status(200).json({ body: list, message: 'Datos obtenidos correctamente' });
        logGreen('GET /api/logisticas: éxito al listar logísticas');
    } catch (err) {
        if (err instanceof CustomException) {
            logRed('Error 400 GET /api/logisticas:', err.toJSON());
            return res.status(400).json(err.toJSON());
        }
        const fatal = new CustomException({
            title: 'Internal Server Error',
            message: err.message,
            stack: err.stack
        });
        logRed('Error 500 GET /api/logisticas:', fatal.toJSON());
        res.status(500).json(fatal.toJSON());
    } finally {
        logPurple(`GET /api/logisticas ejecutado en ${performance.now() - start} ms`);
    }
});

// Obtener logística por ID
router.get('/:id', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, ['id'], []);
    if (missing.length) {
        const ex = new CustomException({
            title: 'Faltan parámetros',
            message: `Faltan parámetros: ${missing.join(', ')}`
        });
        logRed(`Error 400 GET /api/logisticas/${req.params.id}:`, ex.toJSON());
        return res.status(400).json(ex.toJSON());
    }

    try {
        const item = await getLogisticaById(req.params.id);
        res.status(200).json({ body: item, message: 'Registro obtenido' });
        logGreen(`GET /api/logisticas/${req.params.id}: éxito al obtener logística`);
    } catch (err) {
        if (err instanceof CustomException) {
            logRed(`Error 400 GET /api/logisticas/${req.params.id}:`, err.toJSON());
            return res.status(400).json(err.toJSON());
        }
        const fatal = new CustomException({
            title: 'Internal Server Error',
            message: err.message,
            stack: err.stack
        });
        logRed(`Error 500 GET /api/logisticas/${req.params.id}:`, fatal.toJSON());
        res.status(500).json(fatal.toJSON());
    } finally {
        logPurple(
            `GET /api/logisticas/:id ejecutado en ${performance.now() - start} ms`
        );
    }
});

// Actualizar logística
router.put('/:id', async (req, res) => {
    const start = performance.now();
    const missingParams = verifyAll(req, ['id'], REQUIRED_FIELDS);
    if (missingParams.length) {
        const ex = new CustomException({
            title: 'Faltan campos',
            message: `Faltan campos: ${missingParams.join(', ')}`
        });
        logRed(`Error 400 PUT /api/logisticas/${req.params.id}:`, ex.toJSON());
        return res.status(400).json(ex.toJSON());
    }

    try {
        const updated = await updateLogistica(req.params.id, req.body);
        res.status(200).json({ body: updated, message: 'Actualizado correctamente' });
        logGreen(`PUT /api/logisticas/${req.params.id}: éxito al actualizar logística`);
    } catch (err) {
        if (err instanceof CustomException) {
            logRed(`Error 400 PUT /api/logisticas/${req.params.id}:`, err.toJSON());
            return res.status(400).json(err.toJSON());
        }
        const fatal = new CustomException({
            title: 'Internal Server Error',
            message: err.message,
            stack: err.stack
        });
        logRed(`Error 500 PUT /api/logisticas/${req.params.id}:`, fatal.toJSON());
        res.status(500).json(fatal.toJSON());
    } finally {
        logPurple(
            `PUT /api/logisticas/:id ejecutado en ${performance.now() - start} ms`
        );
    }
});

// Eliminar logística
router.delete('/:id', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, ['id'], []);
    if (missing.length) {
        const ex = new CustomException({
            title: 'Faltan parámetros',
            message: `Faltan parámetros: ${missing.join(', ')}`
        });
        logRed(`Error 400 DELETE /api/logisticas/${req.params.id}:`, ex.toJSON());
        return res.status(400).json(ex.toJSON());
    }

    try {
        await deleteLogistica(req.params.id);
        res.status(200).json({ message: 'Eliminado correctamente' });
        logGreen(`DELETE /api/logisticas/${req.params.id}: éxito al eliminar logística`);
    } catch (err) {
        if (err instanceof CustomException) {
            logRed(`Error 400 DELETE /api/logisticas/${req.params.id}:`, err.toJSON());
            return res.status(400).json(err.toJSON());
        }
        const fatal = new CustomException({
            title: 'Internal Server Error',
            message: err.message,
            stack: err.stack
        });
        logRed(`Error 500 DELETE /api/logisticas/${req.params.id}:`, fatal.toJSON());
        res.status(500).json(fatal.toJSON());
    } finally {
        logPurple(
            `DELETE /api/logisticas/:id ejecutado en ${performance.now() - start} ms`
        );
    }
});

export default router;